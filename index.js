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
exports.PaymentSDK = void 0;
const api_1 = __importDefault(require("wing-b2c-core-sdk/api"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const transformer_1 = require("./transformer");
const mock_data_1 = require("./mock.data");
const endpoints = {
    getPaymentProviders: '/v1/payment/get-payment-providers',
    updatePaymentProviders: (id) => `/v1/payment/get-payment-providers/${id}`,
};
class PaymentSDK extends api_1.default {
    constructor() {
        const filePath = path_1.default.resolve(__dirname, 'config.json');
        const options = JSON.parse(fs_1.default.readFileSync(filePath, 'utf8'));
        super({
            baseURL: options.baseURL,
            timeout: options.timeout,
        });
    }
    static getInstance() {
        if (!PaymentSDK.instance) {
            PaymentSDK.instance = new PaymentSDK();
        }
        return PaymentSDK.instance;
    }
    static getPaymentProviders(param) {
        return __awaiter(this, void 0, void 0, function* () {
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
                    data: mock_data_1.MOCK_PAYMENT_PROVIDERS,
                },
            };
            return response.result.data.map(transformer_1.transformPaymentProvider);
        });
    }
    static getAvailablePaymentProviders(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = 'abacaadre'; // TODO: get from auth sdk
            return PaymentSDK.getPaymentProviders(Object.assign(Object.assign({}, param), { userId }));
        });
    }
    static updatePaymentProvider(body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
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
                    data: Object.assign(Object.assign({}, mock_data_1.MOCK_PAYMENT_PROVIDERS.find(provider => provider.id === body.id)), body),
                },
            };
            return ((_a = response.result) === null || _a === void 0 ? void 0 : _a.data) ? (0, transformer_1.transformPaymentProvider)(response.result.data) : null;
        });
    }
    static saveDefaultPaymentProvider(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return PaymentSDK.updatePaymentProvider({ id, default: true });
        });
    }
    static createPayment() { }
    static createRepayment() { }
    static checkPaymentStatus() { }
    static saveCardToken() { }
}
exports.PaymentSDK = PaymentSDK;
