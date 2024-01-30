import { PaymentProviderID } from 'wing-b2c-payment-sdk/model';
export interface CanMakePaymentWithProviderRequestParamV1 {
    providerId: PaymentProviderID;
    alertAppNotInstalled: (appName: string, storeUrl: string) => Promise<void>;
}
export interface PayCallback {
    onSuccess: () => Promise<void>;
    onFailed: () => Promise<void>;
}
export interface MakePaymentRequestParamV1 extends PayCallback {
    providerId: PaymentProviderID;
    txnId: string;
    paymentUrl: string;
}
export interface PayWithProviderRequestParamV1 {
    txnId: string;
    paymentUrl?: string;
}
