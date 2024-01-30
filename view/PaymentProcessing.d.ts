import React from 'react';
import { PaymentStatus } from 'wing-b2c-payment-sdk/model';
export declare function PaymentProcessing({ componentId, txnId, with: payWith, resolve, checkPaymentStatus, }: {
    componentId: string;
    txnId: string;
    with?: 'web' | 'app';
    resolve: (status: PaymentStatus) => void;
    checkPaymentStatus?: () => Promise<PaymentStatus | null>;
}): React.JSX.Element;
