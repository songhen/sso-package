import * as PaymentSDKModel from 'wing-b2c-payment-sdk/model';
import { GetAvailablePaymentProviderRequestParamV1, TransformedPaymentProviderModelV1 } from 'wing-b2c-payment-sdk/model';
import { PROVIDERS } from './constants';
import * as PaymentMobileSDKModel from './model';
import { CanMakePaymentWithProviderRequestParamV1, MakePaymentRequestParamV1 } from './model';
import { getPaymentState } from './repo';
declare class PaymentMobileSDK {
    private constructor();
    static getAvailablePaymentProviders(param: GetAvailablePaymentProviderRequestParamV1): Promise<TransformedPaymentProviderModelV1[]>;
    static getAvailablePaymentOptions(param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>): TransformedPaymentProviderModelV1[];
    static getAvailableWallets(param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>): TransformedPaymentProviderModelV1[];
    static getDefaultPaymentProvider(param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>): TransformedPaymentProviderModelV1;
    static canPayWithProvider(param: CanMakePaymentWithProviderRequestParamV1): Promise<boolean>;
    static pay(param: MakePaymentRequestParamV1): Promise<void>;
    private static payWithWingPay;
    private static payWithDebitCredit;
    private static openURL;
    static createPayment(txnId: string): Promise<PaymentSDKModel.TransformedPaymentResponseModelV1 | null>;
    static createRePayment(txnId: string): Promise<PaymentSDKModel.TransformedPaymentResponseModelV1 | null>;
}
export { PaymentMobileSDK, PROVIDERS, PaymentSDKModel, PaymentMobileSDKModel, getPaymentState };
