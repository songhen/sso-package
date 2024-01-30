"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuth = void 0;
const aws_amplify_1 = require("aws-amplify");
function configureAuth(config) {
    aws_amplify_1.Amplify.configure({
        Auth: {
            Cognito: {
                userPoolClientId: config.USER_POOL_APP_CLIENT_ID,
                userPoolId: config.USER_POOL_ID,
                loginWith: {
                    oauth: {
                        domain: config.DOMAIN,
                        redirectSignIn: config.REDIRECT_SIGN_IN,
                        redirectSignOut: config.REDIRECT_SIGN_OUT,
                        scopes: config.SCOPES,
                        responseType: 'code',
                    },
                    username: true,
                    email: false, // Optional
                    phone: false, // Optional
                },
            },
        },
    });
}
exports.configureAuth = configureAuth;
