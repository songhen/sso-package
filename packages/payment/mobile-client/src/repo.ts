import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import {
  TransformedPaymentProviderModelV1,
  PaymentProviderID,
  GetAvailablePaymentProviderRequestParamV1,
} from 'wing-b2c-payment-sdk/model'
import { PROVIDERS } from './constants'

type PaymentState = {
  providers: TransformedPaymentProviderModelV1[]
  byId: Record<PaymentProviderID, TransformedPaymentProviderModelV1>
}

type PaymentActions = {
  getProviders: () => TransformedPaymentProviderModelV1[]
  setProviders: (providers: TransformedPaymentProviderModelV1[]) => void
  getProvider: (id: PaymentProviderID) => TransformedPaymentProviderModelV1
  getPaymentOptions: (
    param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>
  ) => TransformedPaymentProviderModelV1[]

  getAvailableWallets: (
    param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>
  ) => TransformedPaymentProviderModelV1[]
}

const initialState: PaymentState = {
  providers: [],
  byId: {},
}

export const usePaymentStore = create<PaymentState & PaymentActions>()(
  immer((set, get) => ({
    ...initialState,

    getProviders: () => get().providers,

    setProviders: providers => {
      set(state => {
        const byId = providers.reduce((accumulator: PaymentState['byId'], provider) => {
          accumulator[provider.id] = provider
          return accumulator
        }, {})
        state.providers = providers
        state.byId = byId
      })
    },

    getProvider: id => get().byId[id],

    getPaymentOptions: param => {
      const { providers } = get() as PaymentState
      return (
        providers.filter(
          provider =>
            provider.regions.includes(param.region) &&
            provider.services.includes(param.service) &&
            provider.id !== PROVIDERS.WINGCOIN
        ) || []
      )
    },

    // INFO: currently our platform only has wingcoin as wallet
    getAvailableWallets: param => {
      const { providers } = get() as PaymentState
      const wingcoinProvider = providers.find(
        provider =>
          provider.regions.includes(param.region) &&
          provider.services.includes(param.service) &&
          provider.id === PROVIDERS.WINGCOIN
      )
      return wingcoinProvider ? [wingcoinProvider] : []
    },
  }))
)

export const { getState: getPaymentState } = usePaymentStore
