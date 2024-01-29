import ApiService from 'wing-b2c-core-sdk/api'
import { AxiosInstance } from 'axios'
import path from 'path'
import fs from 'fs'

export class PaymentSDK extends ApiService {
  private static instance: PaymentSDK

  private constructor() {
    const filePath = path.resolve(__dirname, 'config.json')
    const options = JSON.parse(fs.readFileSync(filePath, 'utf8'))

    super({
      baseURL: options.baseURL,
      timeout: options.timeout,
    })
  }

  private static getInstance(): AxiosInstance {
    if (!PaymentSDK.instance) {
      PaymentSDK.instance = new PaymentSDK()
    }

    return PaymentSDK.instance.apiInstance
  }

  static getPaymentProviders() {}

  static updatePaymentProvider() {}

  static saveDefaultPaymentProvider() {}

  static createPayment() {}

  static createRepayment() {}

  static checkPaymentStatus() {}

  static saveCardToken() {}

  static pay() {}

  private payWithProvider() {}

  static canPayWithProvider() {}
}
