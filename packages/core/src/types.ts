import { AxiosRequestConfig } from 'axios'

export type PaginationResponse = {
  pagination: {
    offset: number
    limit: number
    count: number
  }
}

export type FilteringRequestParams = Record<string, (string | number)[]>
export type SortingRequestParams = Record<string, 'asc' | 'desc'>
export type PaginationRequestParams = {
  offset?: number
  limit?: number
}

export type GetDataListResponse<T> = {
  data: T[]
} & PaginationResponse

//==============================================================

export type RequestConfigParams<T> = {
  config?: AxiosRequestConfig
} & T

export type RawTimestamps = {
  created_at: string
  updated_at: string
  deleted_at: string | null
  canceled_at: string
}