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
exports.PaymentProcessing = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_navigation_1 = require("react-native-navigation");
const useBackHandler_1 = require("wing-b2c-core-mobile-sdk/src/hooks/useBackHandler");
const ui_1 = require("wing-b2c-core-mobile-sdk/src/ui");
const useAppStateChange_1 = require("./hooks/useAppStateChange");
const useSubscribeTransaction_1 = require("./hooks/useSubscribeTransaction");
const PAYMENT_TIMEOUT = 5000;
const PAYMENT_WITH_WEB_TIMEOUT = 8000;
function PaymentProcessing({ componentId, txnId, with: payWith, resolve, checkPaymentStatus, }) {
    const timerRef = (0, react_1.useRef)(null);
    const txnStatus = (0, useSubscribeTransaction_1.useSubscribeTransaction)(txnId);
    (0, useBackHandler_1.useBackHandler)(() => true);
    const onAppStateChange = (0, react_1.useCallback)((nextAppState) => __awaiter(this, void 0, void 0, function* () {
        if (appState.match(/active|inactive|background/) && nextAppState === 'active') {
            // Info: check payment status before transaction status
            if (checkPaymentStatus) {
                const paymentStatus = yield checkPaymentStatus();
                if (paymentStatus !== 'success') {
                    resolve('failed');
                    react_native_navigation_1.Navigation.dismissOverlay(componentId);
                    return;
                }
            }
            const timeoutByPlatform = payWith === 'web' ? PAYMENT_WITH_WEB_TIMEOUT : PAYMENT_TIMEOUT;
            const timeout = txnStatus === 'success' || txnStatus === 'failed' ? 0 : timeoutByPlatform;
            timerRef.current = setTimeout(() => {
                resolve(txnStatus);
                react_native_navigation_1.Navigation.dismissOverlay(componentId);
            }, timeout);
        }
    }), [componentId, resolve, txnStatus, payWith, checkPaymentStatus]);
    const appState = (0, useAppStateChange_1.useAppStateChange)(onAppStateChange);
    (0, react_1.useEffect)(() => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }
        onAppStateChange(appState);
    }, [txnStatus, appState, onAppStateChange]);
    (0, react_1.useEffect)(() => {
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, []);
    return (<react_native_1.View style={styles.container}>
      <ui_1.AbsoluteIndicator bgOpacity={0.5} loading indicatorColor="primary" label="Processing Payment..."/>
    </react_native_1.View>);
}
exports.PaymentProcessing = PaymentProcessing;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
    },
});
