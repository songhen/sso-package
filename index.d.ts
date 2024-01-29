import { GetAvailablePaymentProviderRequestParamV1, TransformedPaymentProviderModelV1 } from 'wing-b2c-payment-sdk/model';
import { CanMakePaymentWithProviderRequestParamV1, MakePaymentRequestParamV1 } from './model';
export declare class PaymentMobileSDK {
    private constructor();
    static PROVIDERS: Readonly<{
        MANUAL: "manual";
        WING_PAY: "wing_pay";
        ACLEDA_PAYMENT: "acleda_payment";
        WINGCOIN: "wingcoin";
    }>;
    static getAvailablePaymentProviders(param: GetAvailablePaymentProviderRequestParamV1): Promise<TransformedPaymentProviderModelV1[]>;
    static canPayWithProvider(param: CanMakePaymentWithProviderRequestParamV1): Promise<boolean>;
    static pay(param: MakePaymentRequestParamV1): Promise<void>;
    private static payWithWingPay;
    private static payWithDebitCredit;
    private static openURL;
}
