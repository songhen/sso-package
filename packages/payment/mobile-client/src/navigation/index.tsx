import { Navigation, OptionsModalPresentationStyle } from 'react-native-navigation'
import { PaymentStatus } from 'wing-b2c-payment-sdk/model'

import { PaymentProcessingOverlay } from '../view/PaymentProcessingOverlay'

export const registerScreens = () => {
  const ScreenProvider = (Component: any, props: any) => <Component {...props} />

  Navigation.registerComponent(
    'PaymentProcessingOverlay',
    () => props => ScreenProvider(PaymentProcessingOverlay, props),
    () => PaymentProcessingOverlay
  )
}

export const showPaymentProcessing = (passProps: {
  txnId: string
  with: 'app' | 'web'
  url?: string
  checkPaymentStatus?: () => Promise<PaymentStatus | null>
}) =>
  new Promise((resolve: (value: PaymentStatus) => void) =>
    Navigation.showOverlay({
      component: {
        name: 'PaymentProcessingOverlay',
        passProps: { ...passProps, resolve },
        options: {
          layout: {
            backgroundColor: 'transparent',
            componentBackgroundColor: 'transparent',
          },
          modalPresentationStyle: OptionsModalPresentationStyle.overCurrentContext,
          animations: {
            showModal: {
              enabled: false,
            },
          },
        },
      },
    })
  )
