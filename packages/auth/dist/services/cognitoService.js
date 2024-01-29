"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CognitoService = void 0;
const auth_1 = require("aws-amplify/auth");
const awsConfig_1 = require("../aws-config/awsConfig");
const jsrsasign_1 = require("jsrsasign");
const config_json_1 = __importDefault(require("../config.json"));
class CognitoService {
    constructor() {
        (0, awsConfig_1.configureAuth)();
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CognitoService();
        }
        return this.instance;
    }
    loginWithHostedUI() {
        const clientId = config_json_1.default.USER_POOL_APP_CLIENT_ID;
        const redirectUri = encodeURIComponent(config_json_1.default.REDIRECT_SIGN_IN['0']);
        const responseType = encodeURIComponent(config_json_1.default.RESPONSE_TYPE);
        const scope = config_json_1.default.SCOPES.join('+');
        const domain = config_json_1.default.DOMAIN;
        const url = `${domain}/login?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
        console.log(url);
        window.location.assign(url);
    }
    logoutWithHostedUI() {
        const clientId = config_json_1.default.USER_POOL_APP_CLIENT_ID;
        const redirectUri = encodeURIComponent(config_json_1.default.REDIRECT_SIGN_IN['0']);
        const responseType = encodeURIComponent(config_json_1.default.RESPONSE_TYPE);
        const scope = encodeURIComponent(config_json_1.default.SCOPES.join(' '));
        const domain = config_json_1.default.DOMAIN;
        const url = `${domain}/logout?response_type=${responseType}&client_id=${clientId}&scope=${scope}&redirect_uri=${redirectUri}`;
        window.location.assign(url);
    }
    exchangeTokenByAuthorizationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const params = new URLSearchParams();
                params.append('grant_type', 'authorization_code');
                params.append('client_id', config_json_1.default.USER_POOL_APP_CLIENT_ID);
                params.append('code', code);
                params.append('redirect_uri', config_json_1.default.REDIRECT_SIGN_IN['0']);
                const response = yield fetch(`${config_json_1.default.DOMAIN}/oauth2/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        Authorization: 'Basic ' + btoa(`${config_json_1.default.USER_POOL_APP_CLIENT_ID}:${config_json_1.default.CLIENT_SECRET}`),
                    },
                    body: params.toString(),
                });
                if (!response.ok) {
                    throw new Error('Failed to exchange authorization code for token');
                }
                const data = yield response.json();
                const { id_token, access_token, refresh_token } = data;
                // Return the tokens
                return { id_token, access_token, refresh_token };
            }
            catch (error) {
                throw error;
            }
        });
    }
    getCurrentUser(accessToken) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`${config_json_1.default.DOMAIN}/oauth2/userInfo`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            if (!response.ok) {
                throw new Error('Error getting current user');
            }
            const data = yield response.json();
            return data;
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (0, auth_1.signIn)({
                    username,
                    password,
                });
                return user;
            }
            catch (error) {
                console.error('Error signing in', error);
                throw error;
            }
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, auth_1.signOut)();
            }
            catch (error) {
                throw error;
            }
        });
    }
    verifyToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            // Fetch the JSON Web Key Set (JWKS) from AWS Cognito
            const response = yield fetch(`https://cognito-idp.${config_json_1.default.REGION}.amazonaws.com/${config_json_1.default.USER_POOL_ID}/.well-known/jwks.json`);
            const { keys } = yield response.json();
            // Decode the JWT without verifying it to get its header
            const decodedHeader = jsrsasign_1.KJUR.jws.JWS.readSafeJSONString((0, jsrsasign_1.hextoutf8)((0, jsrsasign_1.b64utohex)(token.split('.')[0])));
            // Find the key from the JWKS that matches the key ID of the JWT
            const key = keys.find((key) => key.kid === decodedHeader.kid);
            if (!key) {
                throw new Error('Key not found in JWKS');
            }
            // Convert the key to a RSAKey object
            const rsaKey = jsrsasign_1.KEYUTIL.getKey(key);
            // Verify the JWT
            const isValid = jsrsasign_1.KJUR.jws.JWS.verifyJWT(token, rsaKey, { alg: ['RS256'] });
            return isValid;
        });
    }
}
exports.CognitoService = CognitoService;
