import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import {
  FilteringRequestParams,
  PaginationRequestParams,
  PaginationResponse,
  SortingRequestParams,
} from './types'

type ApiConfig = {
  baseURL?: string
  timeout?: number
  headers?: InternalAxiosRequestConfig['headers']
}

const defaultConfigs: ApiConfig = {
  baseURL: '',
  timeout: 10000,
}

export interface ErrorResponseResult {
  errorCode?: number
  errorMessage?: string
  isTimeout?: boolean
  isCancelled?: boolean
}

export interface ResponseResult<ResultType = any> extends ErrorResponseResult {
  ok: boolean
  data: ResultType | null
  result: ResultType | null
  headers?: AxiosResponse['headers']
}

export default class ApiService {
  apiInstance: AxiosInstance

  /**
   * @param {ApiConfig} configs
   * @param {string} configs.baseUrl - specify if you want to use a different base url, default is utils.Constants.BASE_URL
   * @param {number} configs.timeout - specify if you want longer or shorter timeout, default is 10000
   * @description create an instance of ApiService
   */
  constructor({ baseURL = '', timeout = 30000, headers }: ApiConfig = defaultConfigs) {
    const api = axios.create({
      baseURL: baseURL,
      timeout: timeout,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
    })

    this.apiInstance = api

    this.apiInstance.interceptors.request.use(this.defaultRequestInterceptor)

    this.apiInstance.interceptors.response.use(this.defaultResponseInterceptor)
  }

  private defaultRequestInterceptor(config: InternalAxiosRequestConfig) {
    return config
  }

  private async defaultResponseInterceptor(response: AxiosResponse) {
    if (!response.config.baseURL?.includes('prd')) {
      console.log('response', response?.status, response?.config?.baseURL, response?.config?.url)
    }

    return response
  }

  getAbortController() {
    // eslint-disable-next-line no-undef,
    const controller = new AbortController()

    return controller
  }

  private handleResponse<T>(response: AxiosResponse): ResponseResult<T> {
    return {
      ok: true,
      data: response.data,
      result: response.data,
      headers: response.headers ?? {},
    }
  }

  private handleError(error: any): ResponseResult<null> {
    const isTimeout = ApiService.isTimeout(error)
    const isCancelled = ApiService.isCancel(error)
    const isKnownError = axios.isAxiosError(error)
    const isHasResponse = error.response

    let errorMessage = ''

    if (isCancelled) {
      errorMessage = 'Request Cancelled'
    } else if (isTimeout) {
      errorMessage = 'Request Timeout'
    } else if (isKnownError && isHasResponse) {
      // TODO: handle error from server
      errorMessage = error?.message ?? 'Unknown Error'
    }

    // if (__DEV__) {
    //   console.log('error', error?.message, error?.response?.data);
    //   console.log(error?.response?.status, error?.config?.baseURL + error?.config?.url);
    // }

    return {
      ok: false,
      result: null,
      data: null,
      isTimeout,
      isCancelled,
      errorMessage,
      headers: error?.response?.headers ?? {},
      errorCode: error?.response?.status ?? 0,
    }
  }

  get<T = any, D = unknown>(url: string, config?: AxiosRequestConfig<D>) {
    return this.apiInstance
      .get<T>(url, config)
      .then(this.handleResponse<T>)
      .catch(this.handleError)
  }

  post<T = any, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.apiInstance
      .post<T>(url, data, config)
      .then(this.handleResponse<T>)
      .catch(this.handleError)
  }

  put<T = any, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.apiInstance
      .put<T>(url, data, {
        ...config,
        method: 'put',
      })
      .then(this.handleResponse<T>)
      .catch(this.handleError)
  }

  delete<T = any, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig) {
    return this.apiInstance
      .delete<T>(url, {
        ...config,
        data,
      })
      .then(this.handleResponse<T>)
      .catch(this.handleError)
  }

  static isCancel(error: any) {
    const isCancelled = axios.isCancel(error)

    return isCancelled
  }

  static isTimeout(error: any) {
    return error.code === 'ECONNABORTED'
  }

  /**
   *
   * @returns e.g. offset=0&limit=10
   */
  getPaginationParams = (pagination: PaginationRequestParams) => {
    const paginationParams = Object.entries(pagination).map(([key, value]) => `${key}=${value}`)
    return paginationParams.join('&')
  }

  /**
   *
   * @returns e.g. order=-created_at,name without dashed(-) is `asc`
   */
  getSortingParams = (sortings: SortingRequestParams) => {
    if (!sortings) {
      return ''
    }

    const sortingParams = Object.entries(sortings)
      .filter(Boolean)
      .map(([key, value]) => {
        const prefix = value === 'asc' ? '' : '-'

        return `${prefix}${key}`
      })

    return `order=${sortingParams.join(',')}`
  }

  /**
   *
   * @returns e.g. filter1=value1&filter2=value2&filter3=value3,value4
   */
  getFilterParams = (filters: FilteringRequestParams) => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => {
        return `${key}=${value.join(',')}`
      })

    return filterParams.filter(Boolean).join('&')
  }

  getFilterResultParams = (filters: FilteringRequestParams) => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => {
        return `filter[${key}]=${value.join(',')}`
      })

    return filterParams.filter(Boolean).join('&')
  }

  getNumberRangeFilterParams = (filters: FilteringRequestParams) => {
    const filterParams = Object.entries(filters)
      .filter(([_, value]) => value.length > 0)
      .map(([key, value]) => {
        return `filter[${key}]=${value.join('-')}`
      })

    return filterParams.filter(Boolean).join('&')
  }

  /**
   *
   * @returns e.g. offset=0&limit=10&order=-created_at,name&filter1=value1&filter2=value2&filter3=value3,value4
   */
  getQueryParams = ({
    pagination,
    sortings,
    filters,
    product_filter,
  }: {
    pagination?: PaginationRequestParams
    sortings?: SortingRequestParams
    filters?: FilteringRequestParams
    product_filter?: boolean
  }) => {
    const queryParams: string[] = []

    if (pagination) {
      queryParams.push(this.getPaginationParams(pagination))
    }

    if (sortings) {
      queryParams.push(this.getSortingParams(sortings))
    }

    if (filters) {
      product_filter
        ? queryParams.push(this.getFilterResultParams(filters))
        : queryParams.push(this.getFilterParams(filters))
    }

    return queryParams.filter(Boolean).join('&')
  }

  getNextPageParam<T = any>(
    lastResponse: (T & PaginationResponse) | null,
    perPageLimit: number
  ): PaginationRequestParams | undefined {
    const { offset = 0, limit = perPageLimit, count = 0 } = lastResponse?.pagination || {}

    if (offset + limit < count) {
      return {
        limit,
        offset: offset + limit,
      }
    }

    return undefined
  }
}