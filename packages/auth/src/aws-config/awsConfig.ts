import { Amplify } from 'aws-amplify'

export function configureAuth(config: any) {
  Amplify.configure({
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
  })
}
