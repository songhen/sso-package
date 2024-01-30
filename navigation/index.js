"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showPaymentProcessing = exports.registerScreens = void 0;
const react_native_navigation_1 = require("react-native-navigation");
const PaymentProcessingOverlay_1 = require("../view/PaymentProcessingOverlay");
const registerScreens = () => {
    const ScreenProvider = (Component, props) => <Component {...props}/>;
    react_native_navigation_1.Navigation.registerComponent('PaymentProcessingOverlay', () => props => ScreenProvider(PaymentProcessingOverlay_1.PaymentProcessingOverlay, props), () => PaymentProcessingOverlay_1.PaymentProcessingOverlay);
};
exports.registerScreens = registerScreens;
const showPaymentProcessing = (passProps) => new Promise((resolve) => react_native_navigation_1.Navigation.showOverlay({
    component: {
        name: 'PaymentProcessingOverlay',
        passProps: Object.assign(Object.assign({}, passProps), { resolve }),
        options: {
            layout: {
                backgroundColor: 'transparent',
                componentBackgroundColor: 'transparent',
            },
            modalPresentationStyle: react_native_navigation_1.OptionsModalPresentationStyle.overCurrentContext,
            animations: {
                showModal: {
                    enabled: false,
                },
            },
        },
    },
}));
exports.showPaymentProcessing = showPaymentProcessing;
