import ApiService from 'wing-b2c-core-sdk/api'
import {
  GetAvailablePaymentProviderRequestParamV1,
  GetPaymentProviderRequestParamV1,
  PaymentProviderID,
  PaymentStatus,
  RawPaymentProviderModelV1,
  RawPaymentResponseModelV1,
  TransformedPaymentProviderModelV1,
  TransformedPaymentResponseModelV1,
  UpdatePaymentProviderRequestBodyV1,
} from './model'
import { transformPaymentProvider } from './transformer'
import { MOCK_PAYMENT_PROVIDERS } from './mock.data'
import config from './config'

const endpoints = {
  getPaymentProviders: '/v1/payment/get-payment-providers',
  updatePaymentProviders: (id: PaymentProviderID) => `/v1/payment/get-payment-providers/${id}`,
  checkPaymentStatus: (txnId: string) => `/v1/payment/check-payment-status/${txnId}`,
  createPayment: (txnId: string) => `/v1/payment/create-payment/${txnId}`,
}

export class PaymentSDK extends ApiService {
  private static instance: PaymentSDK

  private constructor() {
    super({
      baseURL: config.baseURL,
      timeout: config.timeout,
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

  static async checkPaymentStatus(txnId: string): Promise<PaymentStatus | null> {
    // TODO: to be request to api when ready
    // const instance = PaymentSDK.getInstance()
    // const response = await instance.get<{ data: PaymentStatus }>(endpoints.checkPaymentStatus(txnId), {
    //   signal: instance.getAbortController().signal,
    // })

    // if (!response.ok) {
    //   throw new Error(response.errorMessage)
    // }

    // TODO: to be removed when api ready
    const response = {
      result: {
        data: 'success' as PaymentStatus,
      },
    }

    return response.result?.data || null
  }

  static async createPayment(txnId: string): Promise<TransformedPaymentResponseModelV1 | null> {
    try {
      // TODO: to be request to api when ready
      // const instance = PaymentSDK.getInstance()
      // const response = await instance.post<{ data: RawPaymentResponseModelV1 } | null>(
      //   endpoints.createPayment(txnId)
      // )

      // if (!response.ok) {
      //   throw new Error(response.errorMessage)
      // }

      // TODO: to be removed when api ready
      const response = {
        result: {
          data: {
            txn_id: txnId,
            payment_url: '',
          },
        },
      }

      return {
        txnId: response.result?.data?.txn_id || '',
        paymentUrl: response.result?.data?.payment_url || '',
      }
    } catch (e) {
      return null
    }
  }

  static async createRepayment(txnId: string): Promise<TransformedPaymentResponseModelV1 | null> {
    return PaymentSDK.createPayment(txnId)
  }

  static saveCardToken() {}
}
