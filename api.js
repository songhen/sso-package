"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const defaultConfigs = {
    baseURL: '',
    timeout: 10000,
};
class ApiService {
    /**
     * @param {ApiConfig} configs
     * @param {string} configs.baseUrl - specify if you want to use a different base url, default is utils.Constants.BASE_URL
     * @param {number} configs.timeout - specify if you want longer or shorter timeout, default is 10000
     * @description create an instance of ApiService
     */
    constructor({ baseURL = '', timeout = 30000, headers } = defaultConfigs) {
        /**
         *
         * @returns e.g. offset=0&limit=10
         */
        this.getPaginationParams = (pagination) => {
            const paginationParams = Object.entries(pagination).map(([key, value]) => `${key}=${value}`);
            return paginationParams.join('&');
        };
        /**
         *
         * @returns e.g. order=-created_at,name without dashed(-) is `asc`
         */
        this.getSortingParams = (sortings) => {
            if (!sortings) {
                return '';
            }
            const sortingParams = Object.entries(sortings)
                .filter(Boolean)
                .map(([key, value]) => {
                const prefix = value === 'asc' ? '' : '-';
                return `${prefix}${key}`;
            });
            return `order=${sortingParams.join(',')}`;
        };
        /**
         *
         * @returns e.g. filter1=value1&filter2=value2&filter3=value3,value4
         */
        this.getFilterParams = (filters) => {
            const filterParams = Object.entries(filters)
                .filter(([_, value]) => value.length > 0)
                .map(([key, value]) => {
                return `${key}=${value.join(',')}`;
            });
            return filterParams.filter(Boolean).join('&');
        };
        this.getFilterResultParams = (filters) => {
            const filterParams = Object.entries(filters)
                .filter(([_, value]) => value.length > 0)
                .map(([key, value]) => {
                return `filter[${key}]=${value.join(',')}`;
            });
            return filterParams.filter(Boolean).join('&');
        };
        this.getNumberRangeFilterParams = (filters) => {
            const filterParams = Object.entries(filters)
                .filter(([_, value]) => value.length > 0)
                .map(([key, value]) => {
                return `filter[${key}]=${value.join('-')}`;
            });
            return filterParams.filter(Boolean).join('&');
        };
        /**
         *
         * @returns e.g. offset=0&limit=10&order=-created_at,name&filter1=value1&filter2=value2&filter3=value3,value4
         */
        this.getQueryParams = ({ pagination, sortings, filters, product_filter, }) => {
            const queryParams = [];
            if (pagination) {
                queryParams.push(this.getPaginationParams(pagination));
            }
            if (sortings) {
                queryParams.push(this.getSortingParams(sortings));
            }
            if (filters) {
                product_filter
                    ? queryParams.push(this.getFilterResultParams(filters))
                    : queryParams.push(this.getFilterParams(filters));
            }
            return queryParams.filter(Boolean).join('&');
        };
        const api = axios_1.default.create({
            baseURL: baseURL,
            timeout: timeout,
            headers: Object.assign({ 'Content-Type': 'application/json' }, headers),
        });
        this.apiInstance = api;
        this.apiInstance.interceptors.request.use(this.defaultRequestInterceptor);
        this.apiInstance.interceptors.response.use(this.defaultResponseInterceptor);
    }
    defaultRequestInterceptor(config) {
        return config;
    }
    defaultResponseInterceptor(response) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            if (!((_a = response.config.baseURL) === null || _a === void 0 ? void 0 : _a.includes('prd'))) {
                console.log('response', response === null || response === void 0 ? void 0 : response.status, (_b = response === null || response === void 0 ? void 0 : response.config) === null || _b === void 0 ? void 0 : _b.baseURL, (_c = response === null || response === void 0 ? void 0 : response.config) === null || _c === void 0 ? void 0 : _c.url);
            }
            return response;
        });
    }
    getAbortController() {
        // eslint-disable-next-line no-undef,
        const controller = new AbortController();
        return controller;
    }
    handleResponse(response) {
        var _a;
        return {
            ok: true,
            data: response.data,
            result: response.data,
            headers: (_a = response.headers) !== null && _a !== void 0 ? _a : {},
        };
    }
    handleError(error) {
        var _a, _b, _c, _d, _e;
        const isTimeout = ApiService.isTimeout(error);
        const isCancelled = ApiService.isCancel(error);
        const isKnownError = axios_1.default.isAxiosError(error);
        const isHasResponse = error.response;
        let errorMessage = '';
        if (isCancelled) {
            errorMessage = 'Request Cancelled';
        }
        else if (isTimeout) {
            errorMessage = 'Request Timeout';
        }
        else if (isKnownError && isHasResponse) {
            // TODO: handle error from server
            errorMessage = (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown Error';
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
            headers: (_c = (_b = error === null || error === void 0 ? void 0 : error.response) === null || _b === void 0 ? void 0 : _b.headers) !== null && _c !== void 0 ? _c : {},
            errorCode: (_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.status) !== null && _e !== void 0 ? _e : 0,
        };
    }
    get(url, config) {
        return this.apiInstance
            .get(url, config)
            .then((this.handleResponse))
            .catch(this.handleError);
    }
    post(url, data, config) {
        return this.apiInstance
            .post(url, data, config)
            .then((this.handleResponse))
            .catch(this.handleError);
    }
    put(url, data, config) {
        return this.apiInstance
            .put(url, data, Object.assign(Object.assign({}, config), { method: 'put' }))
            .then((this.handleResponse))
            .catch(this.handleError);
    }
    delete(url, data, config) {
        return this.apiInstance
            .delete(url, Object.assign(Object.assign({}, config), { data }))
            .then((this.handleResponse))
            .catch(this.handleError);
    }
    static isCancel(error) {
        const isCancelled = axios_1.default.isCancel(error);
        return isCancelled;
    }
    static isTimeout(error) {
        return error.code === 'ECONNABORTED';
    }
    getNextPageParam(lastResponse, perPageLimit) {
        const { offset = 0, limit = perPageLimit, count = 0 } = (lastResponse === null || lastResponse === void 0 ? void 0 : lastResponse.pagination) || {};
        if (offset + limit < count) {
            return {
                limit,
                offset: offset + limit,
            };
        }
        return undefined;
    }
}
exports.default = ApiService;
