import ApiService from 'wing-b2c-core-sdk/api';
import { GetAvailablePaymentProviderRequestParamV1, GetPaymentProviderRequestParamV1, PaymentProviderID, PaymentStatus, TransformedPaymentProviderModelV1, TransformedPaymentResponseModelV1, UpdatePaymentProviderRequestBodyV1 } from './model';
export declare class PaymentSDK extends ApiService {
    private static instance;
    private constructor();
    private static getInstance;
    static getPaymentProviders(param?: GetPaymentProviderRequestParamV1): Promise<TransformedPaymentProviderModelV1[]>;
    static getAvailablePaymentProviders(param: GetAvailablePaymentProviderRequestParamV1): Promise<TransformedPaymentProviderModelV1[]>;
    static updatePaymentProvider(body: UpdatePaymentProviderRequestBodyV1): Promise<TransformedPaymentProviderModelV1 | null>;
    static saveDefaultPaymentProvider(id: PaymentProviderID): Promise<TransformedPaymentProviderModelV1 | null>;
    static checkPaymentStatus(txnId: string): Promise<PaymentStatus | null>;
    static createPayment(txnId: string): Promise<TransformedPaymentResponseModelV1 | null>;
    static createRepayment(txnId: string): Promise<TransformedPaymentResponseModelV1 | null>;
    static saveCardToken(): void;
}
