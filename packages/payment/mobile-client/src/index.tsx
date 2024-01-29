import { NativeModules, Platform, Linking } from 'react-native'
import { PaymentSDK } from 'wing-b2c-payment-sdk'
import {
  GetAvailablePaymentProviderRequestParamV1,
  TransformedPaymentProviderModelV1,
  PaymentStatus,
} from 'wing-b2c-payment-sdk/model'

import {
  CanMakePaymentWithProviderRequestParamV1,
  MakePaymentRequestParamV1,
  PayWithProviderRequestParamV1,
} from './model'

import { getState } from './repo'

const { WingB2cPaymentMobileSdk } = NativeModules

export class PaymentMobileSDK {
  private constructor() {}

  static PROVIDERS = Object.freeze({
    MANUAL: 'manual', // COD
    WING_PAY: 'wing_pay',
    ACLEDA_PAYMENT: 'acleda_payment',
    WINGCOIN: 'wingcoin',
  })

  static async getAvailablePaymentProviders(
    param: GetAvailablePaymentProviderRequestParamV1
  ): Promise<TransformedPaymentProviderModelV1[]> {
    const userId = 'abacaadre' // TODO: get from auth sdk
    const paymentProviders = await PaymentSDK.getPaymentProviders({ ...param, userId })
    getState().setProviders(paymentProviders)

    return paymentProviders
  }

  static async canPayWithProvider(param: CanMakePaymentWithProviderRequestParamV1): Promise<boolean> {
    const provider = getState().getProvider(param.providerId)
    const metadata = provider.metadata as any
    const url = Platform.OS === 'ios' ? metadata?.ios_store_link : metadata?.android_store_link
    try {
      if (!url) return true

      const canOpen =
        Platform.OS === 'ios'
          ? await Linking.canOpenURL(url)
          : await WingB2cPaymentMobileSdk.isPackageInstalled(url)
      if (!canOpen) {
        throw new Error()
      }

      return true
    } catch (error) {
      param.alertAppNotInstalled(provider.name, url)
      return false
    }
  }

  static async pay(param: MakePaymentRequestParamV1): Promise<void> {
    let paymentStatus: PaymentStatus = 'pending'

    switch (param.providerId) {
      case PaymentMobileSDK.PROVIDERS.WING_PAY:
        paymentStatus = await this.payWithWingPay({
          txnId: param.txnId,
          paymentUrl: param.paymentUrl,
          showPaymentProcessing: param.showPaymentProcessing,
        })
        break

      case PaymentMobileSDK.PROVIDERS.ACLEDA_PAYMENT:
        paymentStatus = await this.payWithDebitCredit({
          txnId: param.txnId,
          paymentUrl: param.paymentUrl,
          showPaymentProcessing: param.showPaymentProcessing,
        })
        break

      case (PaymentMobileSDK.PROVIDERS.MANUAL, PaymentMobileSDK.PROVIDERS.WINGCOIN):
      default:
        paymentStatus = 'success'
        break
    }

    switch (paymentStatus) {
      case 'success':
        param.onSuccess()
        return
      case 'failed':
        param.onFailed()
        return
      default:
        const trxStatus = await PaymentSDK.checkPaymentStatus(param.txnId)

        if (trxStatus === 'success') {
          param.onSuccess()
          return
        }
        param.onFailed()
    }
  }

  private static async payWithWingPay(param: PayWithProviderRequestParamV1): Promise<PaymentStatus> {
    const opened = await this.openURL(param.paymentUrl)

    if (!opened) {
      return 'failed'
    }

    return param.showPaymentProcessing({
      txnId: param.txnId,
      with: 'app',
      url: param.paymentUrl!,
      checkPaymentStatus: () => PaymentSDK.checkPaymentStatus(param.txnId),
    })
  }

  private static async payWithDebitCredit(param: PayWithProviderRequestParamV1): Promise<PaymentStatus> {
    return param.showPaymentProcessing({
      txnId: param.txnId,
      with: 'web',
      url: param.paymentUrl!,
      checkPaymentStatus: () => PaymentSDK.checkPaymentStatus(param.txnId),
    })
  }

  private static async openURL(url?: string) {
    try {
      if (!url) {
        throw new Error("URL can't be empty")
      }

      const opened = await Linking.openURL(url!)

      return opened
    } catch (e) {
      return false
    }
  }
}
