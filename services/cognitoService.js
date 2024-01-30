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
        (0, awsConfig_1.configureAuth)(config_json_1.default);
    }
    static getInstance() {
        if (!this.instance) {
            this.instance = new CognitoService();
        }
        return this.instance;
    }
    loginWithHostedUI() {
        const { USER_POOL_APP_CLIENT_ID: clientId, REDIRECT_SIGN_IN, RESPONSE_TYPE, SCOPES, DOMAIN: domain } = config_json_1.default;
        const url = `${domain}/login?response_type=${encodeURIComponent(RESPONSE_TYPE)}&client_id=${clientId}&scope=${SCOPES.join('+')}&redirect_uri=${encodeURIComponent(REDIRECT_SIGN_IN['0'])}`;
        window.location.assign(url);
    }
    logoutWithHostedUI() {
        const { USER_POOL_APP_CLIENT_ID: clientId, REDIRECT_SIGN_IN, RESPONSE_TYPE, SCOPES, DOMAIN: domain } = config_json_1.default;
        const url = `${domain}/logout?response_type=${encodeURIComponent(RESPONSE_TYPE)}&client_id=${clientId}&scope=${encodeURIComponent(SCOPES.join(' '))}&redirect_uri=${encodeURIComponent(REDIRECT_SIGN_IN['0'])}`;
        window.location.assign(url);
    }
    exchangeTokenByAuthorizationCode(code) {
        return __awaiter(this, void 0, void 0, function* () {
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
            return yield response.json();
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
            return yield response.json();
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield (0, auth_1.signIn)({ username, password });
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
            const response = yield fetch(`https://cognito-idp.${config_json_1.default.REGION}.amazonaws.com/${config_json_1.default.USER_POOL_ID}/.well-known/jwks.json`);
            const { keys } = yield response.json();
            const decodedHeader = jsrsasign_1.KJUR.jws.JWS.readSafeJSONString((0, jsrsasign_1.hextoutf8)((0, jsrsasign_1.b64utohex)(token.split('.')[0])));
            const key = keys.find((key) => key.kid === decodedHeader.kid);
            if (!key) {
                throw new Error('Key not found in JWKS');
            }
            const rsaKey = jsrsasign_1.KEYUTIL.getKey(key);
            return jsrsasign_1.KJUR.jws.JWS.verifyJWT(token, rsaKey, { alg: ['RS256'] });
        });
    }
}
exports.CognitoService = CognitoService;
