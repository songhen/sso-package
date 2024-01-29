"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureAuth = void 0;
const aws_amplify_1 = require("aws-amplify");
const config_json_1 = __importDefault(require("../config.json"));
function configureAuth() {
    aws_amplify_1.Amplify.configure({
        Auth: {
            Cognito: {
                userPoolClientId: config_json_1.default.USER_POOL_APP_CLIENT_ID,
                userPoolId: config_json_1.default.USER_POOL_ID,
                loginWith: {
                    oauth: {
                        domain: config_json_1.default.DOMAIN,
                        redirectSignIn: config_json_1.default.REDIRECT_SIGN_IN,
                        redirectSignOut: config_json_1.default.REDIRECT_SIGN_OUT,
                        scopes: config_json_1.default.SCOPES,
                        responseType: "code",
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
