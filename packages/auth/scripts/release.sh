#!/bin/bash

# Function to display "done" emoji
function done_emoji {
  echo "👍 Done!"
}

# Function to display emoji based on test result
function result_emoji {
  if [ $1 -eq 0 ]; then
    done_emoji
  else
    echo "❌ Tests failed. Aborting the release."
  fi
}

# Function to reset
function reset {
  git checkout $current_branch
  git branch -D $branch_name
  git stash apply && done_emoji
}

# Prefix for branch and tag names
branch_prefix="auth-sdk-release-v"
tag_prefix="AuthSDK-v"

# Get release version from package.json
release_version=$(node -pe "require('./package.json').version")

# Construct branch & tag name with prefix and version
branch_name="${branch_prefix}${release_version}"
tag_name="${tag_prefix}${release_version}"
echo "Branch Name: $branch_name"
echo "Tag Name: $tag_name"
done_emoji

# Store the current branch
echo "STEP 0: Store the current branch..."
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Stash changes to all files except CHANGELOG.md
echo "STEP 1: Stashing changes to all files except CHANGELOG.md..."
git stash save -- $(git ls-files -- ':!CHANGELOG.md') && done_emoji

# Create and switch to a new branch
echo "STEP 2: Creating and switching to a new branch: $branch_name..."
git checkout -b $branch_name && done_emoji

# Remove previous build
echo "STEP 3: Removing previous build..."
rm -rf dist && done_emoji

# Run yarn script for building
echo "STEP 4: Running build script..."
yarn install
tsc && done_emoji

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "Build successful!" && done_emoji
else
  echo "Build failed. Check the error messages."
  reset
  exit 1
fi

# # Run Jest tests
# echo "STEP 5: Running Jest tests..."
# yarn test

# # Check if tests passed
# result=$?
# result_emoji $result

# # Exit if tests failed
# if [ $result -ne 0 ]; then
#   reset
#   exit 1
# fi

# Move the files to the root
echo "STEP 6: Moving files to the root..."
# Navigate up to the root directory
cd ../..

# Create a temporary folder for the changes
temp_folder="temp_folder_for_build"
mkdir -p $temp_folder

# Copy the necessary files to the temporary folder
cp -R packages/auth/dist/* $temp_folder/
cp packages/auth/package.json $temp_folder/
cp packages/auth/CHANGELOG.md $temp_folder/
done_emoji

echo "STEP 7: Removing unnecessary files from the new branch, except .git directory..."
# Exclude specific files and directories from deletion
find . -mindepth 1 -type f -not -path "./.git/*" -not -path "./$temp_folder/*" -exec rm -f {} +
find . -mindepth 1 -type d -not -path "./.git*" -not -path "./$temp_folder*" -exec rm -rf {} +

# Remove .git/hooks/pre-commit if it exists
pre_commit_hook=".git/hooks/pre-commit"
if [ -f "$pre_commit_hook" ]; then
  echo "Removing $pre_commit_hook..."
  rm "$pre_commit_hook"
fi

# Move everything from the temporary folder back to the root
mv $temp_folder/* ./

# Commit the changes
git add .
git commit -m "Create tag with build files..." --no-verify && done_emoji


# Create a tag
echo "STEP 8: Creating a tag: $tag_name..."

# Extract release notes from CHANGELOG.md
changelog_path="CHANGELOG.md"
release_section="## [${release_version}]"
release_notes=$(awk -v RS='' -v tag="${release_section}" '$0 ~ tag {print $0}' "$changelog_path" | sed 's/##/\n##/g' | sed '/^$/d' | sed 's/^## //')

# Output the release notes
echo "Release Notes for version ${release_version}:"
echo "$release_notes"

git tag -a $tag_name -m "$release_notes"
done_emoji

# Push the branch and tag to GitHub
echo "STEP 9: Pushing the branch and tag to GitHub..."
git reset --hard HEAD^
git push origin $branch_name --tags
done_emoji

# Switch back to the original branch
echo "STEP 10: Switching back to the original branch: $current_branch..."
git checkout $current_branch
done_emoji

# Apply stashed changes to restore the working directory
echo "STEP 11: Applying stashed changes..."
if git stash apply --index; then
  done_emoji
else
  echo "❌ Failed to apply stashed changes. Resolve any conflicts manually."
  exit 1
fi

echo "Tag $tag_name created and pushed to GitHub. Temporary changes have been restored. 👍"