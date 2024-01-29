import { signIn, signOut } from 'aws-amplify/auth';
import { configureAuth } from '../aws-config/awsConfig';
import { KEYUTIL, KJUR, hextoutf8, b64utohex } from 'jsrsasign';
import config from '../config.json';
import { TokenResponse } from '../types';

export class CognitoService {
  private static instance: CognitoService;

  private constructor() {
    configureAuth(config);
  }

  public static getInstance(): CognitoService {
    if (!this.instance) {
      this.instance = new CognitoService();
    }
    return this.instance;
  }

  loginWithHostedUI(): void {
    const { USER_POOL_APP_CLIENT_ID: clientId, REDIRECT_SIGN_IN, RESPONSE_TYPE, SCOPES, DOMAIN: domain } = config;
    const url = `${domain}/login?response_type=${encodeURIComponent(RESPONSE_TYPE)}&client_id=${clientId}&scope=${SCOPES.join('+')}&redirect_uri=${encodeURIComponent(REDIRECT_SIGN_IN['0'])}`;
    window.location.assign(url);
  }

  logoutWithHostedUI(): void {
    const { USER_POOL_APP_CLIENT_ID: clientId, REDIRECT_SIGN_IN, RESPONSE_TYPE, SCOPES, DOMAIN: domain } = config;
    const url = `${domain}/logout?response_type=${encodeURIComponent(RESPONSE_TYPE)}&client_id=${clientId}&scope=${encodeURIComponent(SCOPES.join(' '))}&redirect_uri=${encodeURIComponent(REDIRECT_SIGN_IN['0'])}`;
    window.location.assign(url);
  }

  async exchangeTokenByAuthorizationCode(code: string): Promise<TokenResponse> {
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('client_id', config.USER_POOL_APP_CLIENT_ID);
    params.append('code', code);
    params.append('redirect_uri', config.REDIRECT_SIGN_IN['0']);

    const response = await fetch(`${config.DOMAIN}/oauth2/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: 'Basic ' + btoa(`${config.USER_POOL_APP_CLIENT_ID}:${config.CLIENT_SECRET}`),
      },
      body: params.toString(),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange authorization code for token');
    }

    return await response.json();
  }

  async getCurrentUser(accessToken: string): Promise<any> {
    const response = await fetch(`${config.DOMAIN}/oauth2/userInfo`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error getting current user');
    }

    return await response.json();
  }

  async login(username: string, password: string): Promise<any> {
    try {
      return await signIn({ username, password });
    } catch (error) {
      console.error('Error signing in', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut();
    } catch (error) {
      throw error;
    }
  }

  async verifyToken(token: string): Promise<boolean> {
    const response = await fetch(`https://cognito-idp.${config.REGION}.amazonaws.com/${config.USER_POOL_ID}/.well-known/jwks.json`);
    const { keys } = await response.json();
    const decodedHeader = KJUR.jws.JWS.readSafeJSONString(hextoutf8(b64utohex(token.split('.')[0])));
    const key = keys.find((key: any) => key.kid === decodedHeader.kid);

    if (!key) {
      throw new Error('Key not found in JWKS');
    }

    const rsaKey = KEYUTIL.getKey(key);
    return KJUR.jws.JWS.verifyJWT(token, rsaKey, { alg: ['RS256'] });
  }
}