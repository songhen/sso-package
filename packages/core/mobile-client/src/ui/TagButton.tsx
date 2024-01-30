import React from 'react'
import { View, Image, ImageStyle, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from 'react-native'
import assets from '../assets'
import { createStyles, Colors, Mixins } from '../themes'

import { Text } from './Text'

type TagButtonProps = {
  active?: boolean
  label: string
  disabled?: boolean
  activeBackgroundColor?: (typeof Colors)[keyof typeof Colors]
  inActiveBackgroundColor?: (typeof Colors)[keyof typeof Colors]
  activeLabelColor?: (typeof Colors)[keyof typeof Colors]
  inActiveLabelColor?: (typeof Colors)[keyof typeof Colors]
  closeButtonStyle?: StyleProp<ViewStyle>
  closeIconStyle?: StyleProp<ImageStyle>
  helperLabel?: string
  helperLabelStyle?: StyleProp<TextStyle>
  onPress?: () => void
  onPressClose?: () => void
}

export const TagButton: React.FC<TagButtonProps> = ({
  active = false,
  disabled,
  activeBackgroundColor = Colors.PRIMARY_5,
  inActiveBackgroundColor = Colors.WHITE_3,
  activeLabelColor = Colors.DARK_1,
  inActiveLabelColor = Colors.DARK_2,
  label = '256 GB',
  helperLabel,
  helperLabelStyle,
  closeButtonStyle,
  closeIconStyle,
  onPress,
  onPressClose,
}) => {
  let backgroundContainer = active
    ? { backgroundColor: activeBackgroundColor }
    : { backgroundColor: inActiveBackgroundColor }
  backgroundContainer = disabled ? { backgroundColor: Colors.WHITE_3 } : backgroundContainer

  let labelColor = active ? { color: activeLabelColor } : { color: inActiveLabelColor }
  labelColor = disabled ? { color: Colors.DARK_5 } : labelColor

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        style={[styles.buttonContainer, backgroundContainer]}
      >
        <Text color="dark" variant="body" style={labelColor}>
          {label}
        </Text>

        {onPressClose ? (
          <TouchableOpacity style={[styles.closeButton, closeButtonStyle]} onPress={onPressClose}>
            <Image source={assets.icons.closeIcon} style={[styles.iconClose as ImageStyle, closeIconStyle]} />
          </TouchableOpacity>
        ) : null}
      </TouchableOpacity>
      {helperLabel ? (
        <Text variant="caption" style={[styles.helperLabel, helperLabelStyle]}>
          {helperLabel}
        </Text>
      ) : null}
    </View>
  )
}

const styles = createStyles({
  container: {
    paddingHorizontal: Mixins.Spacing.SCALE_4,
    paddingVertical: Mixins.Spacing.SCALE_4,
    alignSelf: 'flex-start',
  },

  buttonContainer: {
    borderRadius: 64,
    backgroundColor: Colors.PRIMARY_5,
    paddingVertical: Mixins.Spacing.SCALE_8,
    paddingHorizontal: Mixins.Spacing.SCALE_16,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButton: {
    width: 16,
    height: 16,
    borderRadius: 8,
    padding: Mixins.Spacing.SCALE_4,
    backgroundColor: Colors.PRIMARY_1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: Mixins.Spacing.SCALE_4,
  },

  iconClose: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    tintColor: Colors.SECONDARY_1,
  },

  helperLabel: {
    color: Colors.DARK_RED,
    alignSelf: 'center',
    marginTop: Mixins.Spacing.SCALE_2,
  },
})
