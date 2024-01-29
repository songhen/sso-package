export declare class CognitoService {
    private static instance;
    private constructor();
    static getInstance(): CognitoService;
    loginWithHostedUI(): void;
    logoutWithHostedUI(): void;
    exchangeTokenByAuthorizationCode(code: string): Promise<any>;
    getCurrentUser(accessToken: string): Promise<any>;
    login(username: string, password: string): Promise<any>;
    logout(): Promise<void>;
    verifyToken(token: string): Promise<boolean | void>;
}
