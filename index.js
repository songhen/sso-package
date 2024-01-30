"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.registerPaymentMobileSDKScreens = exports.getPaymentState = exports.PaymentMobileSDKModel = exports.PaymentSDKModel = exports.PROVIDERS = exports.PaymentMobileSDK = void 0;
const react_native_1 = require("react-native");
const wing_b2c_payment_sdk_1 = require("wing-b2c-payment-sdk");
const PaymentSDKModel = __importStar(require("wing-b2c-payment-sdk/model"));
exports.PaymentSDKModel = PaymentSDKModel;
const constants_1 = require("./constants");
Object.defineProperty(exports, "PROVIDERS", { enumerable: true, get: function () { return constants_1.PROVIDERS; } });
const PaymentMobileSDKModel = __importStar(require("./model"));
exports.PaymentMobileSDKModel = PaymentMobileSDKModel;
const navigation_1 = require("./navigation");
Object.defineProperty(exports, "registerPaymentMobileSDKScreens", { enumerable: true, get: function () { return navigation_1.registerScreens; } });
const repo_1 = require("./repo");
Object.defineProperty(exports, "getPaymentState", { enumerable: true, get: function () { return repo_1.getPaymentState; } });
const { WingB2cPaymentMobileSdk } = react_native_1.NativeModules;
class PaymentMobileSDK {
    constructor() { }
    static getAvailablePaymentProviders(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = 'abacaadre'; // TODO: get from auth sdk
            const paymentProviders = yield wing_b2c_payment_sdk_1.PaymentSDK.getPaymentProviders(Object.assign(Object.assign({}, param), { userId }));
            (0, repo_1.getPaymentState)().setProviders(paymentProviders);
            return paymentProviders;
        });
    }
    static getAvailablePaymentOptions(param) {
        return (0, repo_1.getPaymentState)().getPaymentOptions(param);
    }
    static getAvailableWallets(param) {
        return (0, repo_1.getPaymentState)().getAvailableWallets(param);
    }
    static getDefaultPaymentProvider(param) {
        return (0, repo_1.getPaymentState)().getDefaultPaymentProvider(param);
    }
    static canPayWithProvider(param) {
        return __awaiter(this, void 0, void 0, function* () {
            const provider = (0, repo_1.getPaymentState)().getProvider(param.providerId);
            const metadata = provider.metadata;
            const url = react_native_1.Platform.OS === 'ios' ? metadata === null || metadata === void 0 ? void 0 : metadata.ios_store_link : metadata === null || metadata === void 0 ? void 0 : metadata.android_store_link;
            try {
                if (!provider.active)
                    return false;
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
                case constants_1.PROVIDERS.WING_PAY:
                    paymentStatus = yield this.payWithWingPay({
                        txnId: param.txnId,
                        paymentUrl: param.paymentUrl,
                    });
                    break;
                case constants_1.PROVIDERS.ACLEDA_PAYMENT:
                    paymentStatus = yield this.payWithDebitCredit({
                        txnId: param.txnId,
                        paymentUrl: param.paymentUrl,
                    });
                    break;
                case (constants_1.PROVIDERS.MANUAL, constants_1.PROVIDERS.WINGCOIN):
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
            return (0, navigation_1.showPaymentProcessing)({
                txnId: param.txnId,
                with: 'app',
                url: param.paymentUrl,
                checkPaymentStatus: () => wing_b2c_payment_sdk_1.PaymentSDK.checkPaymentStatus(param.txnId),
            });
        });
    }
    static payWithDebitCredit(param) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, navigation_1.showPaymentProcessing)({
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
    static createPayment(txnId) {
        return __awaiter(this, void 0, void 0, function* () {
            return wing_b2c_payment_sdk_1.PaymentSDK.createPayment(txnId);
        });
    }
    static createRePayment(txnId) {
        return __awaiter(this, void 0, void 0, function* () {
            return wing_b2c_payment_sdk_1.PaymentSDK.createRepayment(txnId);
        });
    }
}
exports.PaymentMobileSDK = PaymentMobileSDK;
