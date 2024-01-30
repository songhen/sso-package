import { PaymentStatus } from 'wing-b2c-payment-sdk/model';
export declare const registerScreens: () => void;
export declare const showPaymentProcessing: (passProps: {
    txnId: string;
    with: 'app' | 'web';
    url?: string;
    checkPaymentStatus?: () => Promise<PaymentStatus | null>;
}) => Promise<"pending" | "success" | "failed">;
