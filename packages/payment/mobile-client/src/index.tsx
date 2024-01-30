import { NativeModules, Platform, Linking } from 'react-native'
import { PaymentSDK } from 'wing-b2c-payment-sdk'
import * as PaymentSDKModel from 'wing-b2c-payment-sdk/model'
import {
  GetAvailablePaymentProviderRequestParamV1,
  TransformedPaymentProviderModelV1,
  PaymentStatus,
} from 'wing-b2c-payment-sdk/model'
import { PROVIDERS } from './constants'

import * as PaymentMobileSDKModel from './model'
import {
  CanMakePaymentWithProviderRequestParamV1,
  MakePaymentRequestParamV1,
  PayWithProviderRequestParamV1,
} from './model'

import { getPaymentState } from './repo'

const { WingB2cPaymentMobileSdk } = NativeModules

class PaymentMobileSDK {
  private constructor() {}

  static async getAvailablePaymentProviders(
    param: GetAvailablePaymentProviderRequestParamV1
  ): Promise<TransformedPaymentProviderModelV1[]> {
    const userId = 'abacaadre' // TODO: get from auth sdk
    const paymentProviders = await PaymentSDK.getPaymentProviders({ ...param, userId })
    getPaymentState().setProviders(paymentProviders)

    return paymentProviders
  }

  static getAvailablePaymentOptions(
    param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>
  ): TransformedPaymentProviderModelV1[] {
    return getPaymentState().getPaymentOptions(param)
  }

  static getAvailableWallets(
    param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>
  ): TransformedPaymentProviderModelV1[] {
    return getPaymentState().getAvailableWallets(param)
  }

  static async canPayWithProvider(param: CanMakePaymentWithProviderRequestParamV1): Promise<boolean> {
    const provider = getPaymentState().getProvider(param.providerId)
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
      case PROVIDERS.WING_PAY:
        paymentStatus = await this.payWithWingPay({
          txnId: param.txnId,
          paymentUrl: param.paymentUrl,
          showPaymentProcessing: param.showPaymentProcessing,
        })
        break

      case PROVIDERS.ACLEDA_PAYMENT:
        paymentStatus = await this.payWithDebitCredit({
          txnId: param.txnId,
          paymentUrl: param.paymentUrl,
          showPaymentProcessing: param.showPaymentProcessing,
        })
        break

      case (PROVIDERS.MANUAL, PROVIDERS.WINGCOIN):
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

  static async createPayment(txnId: string) {
    return PaymentSDK.createPayment(txnId)
  }

  static async createRePayment(txnId: string) {
    return PaymentSDK.createRepayment(txnId)
  }
}

export { PaymentMobileSDK, PROVIDERS, PaymentSDKModel, PaymentMobileSDKModel, getPaymentState }
