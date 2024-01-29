import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { TransformedPaymentProviderModelV1, PaymentProviderID } from 'wing-b2c-payment-sdk/model'

type PaymentState = {
  providers: TransformedPaymentProviderModelV1[]
  byId: Record<PaymentProviderID, TransformedPaymentProviderModelV1>
}

type PaymentActions = {
  getProviders: () => TransformedPaymentProviderModelV1[]
  setProviders: (providers: TransformedPaymentProviderModelV1[]) => void
  getProvider: (id: PaymentProviderID) => TransformedPaymentProviderModelV1
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
  }))
)

export const { getState } = usePaymentStore
