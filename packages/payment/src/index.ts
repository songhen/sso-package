import ApiService from 'wing-b2c-core-sdk/api'
import path from 'path'
import fs from 'fs'
import {
  GetAvailablePaymentProviderRequestParamV1,
  GetPaymentProviderRequestParamV1,
  PaymentProviderID,
  RawPaymentProviderModelV1,
  TransformedPaymentProviderModelV1,
  UpdatePaymentProviderRequestBodyV1,
} from './model'
import { transformPaymentProvider } from './transformer'
import { MOCK_PAYMENT_PROVIDERS } from './mock.data'

const endpoints = {
  getPaymentProviders: '/v1/payment/get-payment-providers',
  updatePaymentProviders: (id: PaymentProviderID) => `/v1/payment/get-payment-providers/${id}`,
}

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

  private static getInstance(): PaymentSDK {
    if (!PaymentSDK.instance) {
      PaymentSDK.instance = new PaymentSDK()
    }

    return PaymentSDK.instance
  }

  static async getPaymentProviders(
    param?: GetPaymentProviderRequestParamV1
  ): Promise<TransformedPaymentProviderModelV1[]> {
    // TODO: to be request to api when ready
    // const instance = PaymentSDK.getInstance()
    // const response = await instance.get<{ data: RawPaymentProviderModelV1[] }>(endpoints.getPaymentProviders, {
    //     data: {
    //         user_id: param?.userId,
    //         origin: param?.region,
    //         service: param?.service,
    //     },
    //     signal: param?.config?.signal
    // })

    // if (!response.ok) {
    //   throw new Error(response.errorMessage)
    // }

    // if (!response.result?.data?.length) return []

    // TODO: to be removed when api ready
    const response = {
      result: {
        data: MOCK_PAYMENT_PROVIDERS,
      },
    }

    return response.result.data.map(transformPaymentProvider)
  }

  static async getAvailablePaymentProviders(
    param: GetAvailablePaymentProviderRequestParamV1
  ): Promise<TransformedPaymentProviderModelV1[]> {
    const userId = 'abacaadre' // TODO: get from auth sdk
    return PaymentSDK.getPaymentProviders({ ...param, userId })
  }

  static async updatePaymentProvider(
    body: UpdatePaymentProviderRequestBodyV1
  ): Promise<TransformedPaymentProviderModelV1 | null> {
    // TODO: to be request to api when ready
    // const instance = PaymentSDK.getInstance()
    // const response = await instance.post<{ data: RawPaymentProviderModelV1 }>(
    //   endpoints.updatePaymentProviders(body.id),
    //   {
    //     name: body.name,
    //     logo: body.logo,
    //     default: body.default,
    //     active: body.active,
    //     services: body.services,
    //     regions: body.regions,
    //   },
    //   {
    //     signal: instance.getAbortController().signal,
    //   }
    // )

    // if (!response.ok) {
    //   throw new Error(response.errorMessage)
    // }

    // TODO: to be removed when api ready
    const response = {
      result: {
        data: {
          ...MOCK_PAYMENT_PROVIDERS.find(provider => provider.id === body.id),
          ...body,
        } as RawPaymentProviderModelV1,
      },
    }

    return response.result?.data ? transformPaymentProvider(response.result.data) : null
  }

  static async saveDefaultPaymentProvider(id: PaymentProviderID) {
    return PaymentSDK.updatePaymentProvider({ id, default: true })
  }

  static createPayment() {}

  static createRepayment() {}

  static checkPaymentStatus() {}

  static saveCardToken() {}

  static pay() {}

  private payWithProvider() {}

  static canPayWithProvider() {}
}
