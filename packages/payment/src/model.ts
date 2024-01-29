import { AxiosRequestConfig } from 'axios'

export type PaymentProviderID = string

export type ServiceType = 'food' | 'groceries' | 'shopping' | 'express' | 'gift-card' | 'pick-up'

export interface RawPaymentProviderModelV1 {
  id: PaymentProviderID
  name: string
  logo: string
  info: string
  default: boolean
  active: boolean
  regions: string[]
  services: string[]
  save_card?: unknown
  metadata?: unknown
}

export interface TransformedPaymentProviderModelV1 {
  id: PaymentProviderID
  name: string
  logo: string
  info: string
  default: boolean
  active: boolean
  regions: string[]
  services: string[]
  saveCard?: unknown
  metadata?: unknown
}

export interface GetPaymentProviderRequestParamV1 {
  userId?: string
  region?: string
  service?: ServiceType
  config?: AxiosRequestConfig
}

export interface GetAvailablePaymentProviderRequestParamV1 {
  region: string
  service: ServiceType
  config?: AxiosRequestConfig
}
