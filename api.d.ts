import { AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { FilteringRequestParams, PaginationRequestParams, PaginationResponse, SortingRequestParams } from './types';
type ApiConfig = {
    baseURL?: string;
    timeout?: number;
    headers?: InternalAxiosRequestConfig['headers'];
};
export interface ErrorResponseResult {
    errorCode?: number;
    errorMessage?: string;
    isTimeout?: boolean;
    isCancelled?: boolean;
}
export interface ResponseResult<ResultType = any> extends ErrorResponseResult {
    ok: boolean;
    data: ResultType | null;
    result: ResultType | null;
    headers?: AxiosResponse['headers'];
}
export default class ApiService {
    apiInstance: AxiosInstance;
    /**
     * @param {ApiConfig} configs
     * @param {string} configs.baseUrl - specify if you want to use a different base url, default is utils.Constants.BASE_URL
     * @param {number} configs.timeout - specify if you want longer or shorter timeout, default is 10000
     * @description create an instance of ApiService
     */
    constructor({ baseURL, timeout, headers }?: ApiConfig);
    private defaultRequestInterceptor;
    private defaultResponseInterceptor;
    getAbortController(): AbortController;
    private handleResponse;
    private handleError;
    get<T = any, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<ResponseResult<null> | ResponseResult<T>>;
    post<T = any, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ResponseResult<null> | ResponseResult<T>>;
    put<T = any, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ResponseResult<null> | ResponseResult<T>>;
    delete<T = any, D = unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ResponseResult<null> | ResponseResult<T>>;
    static isCancel(error: any): boolean;
    static isTimeout(error: any): boolean;
    /**
     *
     * @returns e.g. offset=0&limit=10
     */
    getPaginationParams: (pagination: PaginationRequestParams) => string;
    /**
     *
     * @returns e.g. order=-created_at,name without dashed(-) is `asc`
     */
    getSortingParams: (sortings: SortingRequestParams) => string;
    /**
     *
     * @returns e.g. filter1=value1&filter2=value2&filter3=value3,value4
     */
    getFilterParams: (filters: FilteringRequestParams) => string;
    getFilterResultParams: (filters: FilteringRequestParams) => string;
    getNumberRangeFilterParams: (filters: FilteringRequestParams) => string;
    /**
     *
     * @returns e.g. offset=0&limit=10&order=-created_at,name&filter1=value1&filter2=value2&filter3=value3,value4
     */
    getQueryParams: ({ pagination, sortings, filters, product_filter, }: {
        pagination?: PaginationRequestParams | undefined;
        sortings?: SortingRequestParams | undefined;
        filters?: FilteringRequestParams | undefined;
        product_filter?: boolean | undefined;
    }) => string;
    getNextPageParam<T = any>(lastResponse: (T & PaginationResponse) | null, perPageLimit: number): PaginationRequestParams | undefined;
}
export {};
