import { RawPaymentProviderModelV1, TransformedPaymentProviderModelV1 } from './model'

export function transformPaymentProvider(raw: RawPaymentProviderModelV1): TransformedPaymentProviderModelV1 {
  return {
    ...raw,
    saveCard: raw.save_card,
  }
}
