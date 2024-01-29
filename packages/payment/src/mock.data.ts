import { RawPaymentProviderModelV1 } from './model'

export const MOCK_PAYMENT_PROVIDERS: RawPaymentProviderModelV1[] = [
  {
    id: 'wing_pay',
    name: 'WingPay',
    logo: 'https://play-lh.googleusercontent.com/-deHHbwBUh2I4dzTjq9n4ggBGPqJwKzj9pwvPqyaR-hPxzKN9QVJOBsZP_ShlCDmX60',
    info: 'WingPay is a mobile payment app that allows you to pay for goods and services with your mobile phone.',
    default: true,
    active: true,
    services: ['food', 'groceries', 'shopping', 'express', 'gift-card', 'pick-up'],
    regions: ['pnh', 'kpc', 'sr', 'btb'],
    metadata: {
      ios_store_link: '',
      android_store_link: '',
    },
  },
  {
    id: 'acleda_payment',
    name: 'Credit/Debit',
    logo: 'https://play-lh.googleusercontent.com/-deHHbwBUh2I4dzTjq9n4ggBGPqJwKzj9pwvPqyaR-hPxzKN9QVJOBsZP_ShlCDmX60',
    info: 'Credit/Debit allows you to pay for goods and services with your mobile phone.',
    default: false,
    active: true,
    services: ['food', 'shopping', 'express', 'gift-card', 'pick-up'],
    regions: ['pnh', 'kpc'],
  },
  {
    id: 'manual',
    name: 'KHQR/Cash',
    logo: 'https://play-lh.googleusercontent.com/-deHHbwBUh2I4dzTjq9n4ggBGPqJwKzj9pwvPqyaR-hPxzKN9QVJOBsZP_ShlCDmX60',
    info: 'KHQR/Cash allows you to pay for goods and services with your mobile phone.',
    default: false,
    active: true,
    services: ['food', 'groceries', 'shopping', 'express'],
    regions: ['pnh', 'kpc', 'sr'],
  },
]
