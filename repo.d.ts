import { TransformedPaymentProviderModelV1, PaymentProviderID, GetAvailablePaymentProviderRequestParamV1 } from 'wing-b2c-payment-sdk/model';
type PaymentState = {
    providers: TransformedPaymentProviderModelV1[];
    byId: Record<PaymentProviderID, TransformedPaymentProviderModelV1>;
};
type PaymentActions = {
    getProviders: () => TransformedPaymentProviderModelV1[];
    setProviders: (providers: TransformedPaymentProviderModelV1[]) => void;
    getProvider: (id: PaymentProviderID) => TransformedPaymentProviderModelV1;
    getPaymentOptions: (param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>) => TransformedPaymentProviderModelV1[];
    getAvailableWallets: (param: Omit<GetAvailablePaymentProviderRequestParamV1, 'config'>) => TransformedPaymentProviderModelV1[];
};
export declare const usePaymentStore: import("zustand").UseBoundStore<Omit<import("zustand").StoreApi<PaymentState & PaymentActions>, "setState"> & {
    setState(nextStateOrUpdater: (PaymentState & PaymentActions) | Partial<PaymentState & PaymentActions> | ((state: Draft<T>) => void), shouldReplace?: boolean | undefined): void;
}>;
export declare const getPaymentState: () => PaymentState & PaymentActions;
export {};
