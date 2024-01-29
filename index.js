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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMobileSDK = void 0;
const react_native_1 = require("react-native");
const wing_b2c_payment_sdk_1 = require("wing-b2c-payment-sdk");
const repo_1 = require("./repo");
const { WingB2cPaymentMobileSdk } = react_native_1.NativeModules;
class PaymentMobileSDK {
    constructor() { }
    static getAvailablePaymentProviders(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = 'abacaadre'; // TODO: get from auth sdk
            const paymentProviders = yield wing_b2c_payment_sdk_1.PaymentSDK.getPaymentProviders(Object.assign(Object.assign({}, param), { userId }));
            (0, repo_1.getState)().setProviders(paymentProviders);
            return paymentProviders;
        });
    }
    static canPayWithProvider(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = (0, repo_1.getState)().getProvider(param.providerId);
            const metadata = provider.metadata;
            const url = react_native_1.Platform.OS === 'ios' ? metadata === null || metadata === void 0 ? void 0 : metadata.ios_store_link : metadata === null || metadata === void 0 ? void 0 : metadata.android_store_link;
            try {
                if (!url)
                    return true;
                const canOpen = react_native_1.Platform.OS === 'ios'
                    ? yield react_native_1.Linking.canOpenURL(url)
                    : yield WingB2cPaymentMobileSdk.isPackageInstalled(url);
                if (!canOpen) {
                    throw new Error();
                }
                return true;
            }
            catch (error) {
                param.alertAppNotInstalled(provider.name, url);
                return false;
            }
        });
    }
    static pay(param) {
        return __awaiter(this, void 0, void 0, function* () {
            let paymentStatus = 'pending';
            switch (param.providerId) {
                case PaymentMobileSDK.PROVIDERS.WING_PAY:
                    paymentStatus = yield this.payWithWingPay({
                        txnId: param.txnId,
                        paymentUrl: param.paymentUrl,
                        showPaymentProcessing: param.showPaymentProcessing,
                    });
                    break;
                case PaymentMobileSDK.PROVIDERS.ACLEDA_PAYMENT:
                    paymentStatus = yield this.payWithDebitCredit({
                        txnId: param.txnId,
                        paymentUrl: param.paymentUrl,
                        showPaymentProcessing: param.showPaymentProcessing,
                    });
                    break;
                case (PaymentMobileSDK.PROVIDERS.MANUAL, PaymentMobileSDK.PROVIDERS.WINGCOIN):
                default:
                    paymentStatus = 'success';
                    break;
            }
            switch (paymentStatus) {
                case 'success':
                    param.onSuccess();
                    return;
                case 'failed':
                    param.onFailed();
                    return;
                default:
                    const trxStatus = yield wing_b2c_payment_sdk_1.PaymentSDK.checkPaymentStatus(param.txnId);
                    if (trxStatus === 'success') {
                        param.onSuccess();
                        return;
                    }
                    param.onFailed();
            }
        });
    }
    static payWithWingPay(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const opened = yield this.openURL(param.paymentUrl);
            if (!opened) {
                return 'failed';
            }
            return param.showPaymentProcessing({
                txnId: param.txnId,
                with: 'app',
                url: param.paymentUrl,
                checkPaymentStatus: () => wing_b2c_payment_sdk_1.PaymentSDK.checkPaymentStatus(param.txnId),
            });
        });
    }
    static payWithDebitCredit(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return param.showPaymentProcessing({
                txnId: param.txnId,
                with: 'web',
                url: param.paymentUrl,
                checkPaymentStatus: () => wing_b2c_payment_sdk_1.PaymentSDK.checkPaymentStatus(param.txnId),
            });
        });
    }
    static openURL(url) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!url) {
                    throw new Error("URL can't be empty");
                }
                const opened = yield react_native_1.Linking.openURL(url);
                return opened;
            }
            catch (e) {
                return false;
            }
        });
    }
}
exports.PaymentMobileSDK = PaymentMobileSDK;
PaymentMobileSDK.PROVIDERS = Object.freeze({
    MANUAL: 'manual', // COD
    WING_PAY: 'wing_pay',
    ACLEDA_PAYMENT: 'acleda_payment',
    WINGCOIN: 'wingcoin',
});
