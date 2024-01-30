import React from 'react';
import { NavigationComponentProps } from 'react-native-navigation';
import { PaymentStatus } from 'wing-b2c-payment-sdk/model';
type PaymentWithWebViewProps = {
    txnId: string;
    url: string;
    resolve: (value: PaymentStatus) => void;
} & NavigationComponentProps;
export declare function PaymentWithWebView({ componentId, txnId, url, resolve }: PaymentWithWebViewProps): React.JSX.Element;
export {};
