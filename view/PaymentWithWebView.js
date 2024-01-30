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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentWithWebView = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const react_native_webview_1 = __importDefault(require("react-native-webview"));
const MaterialIcons_1 = __importDefault(require("react-native-vector-icons/MaterialIcons"));
const react_native_navigation_1 = require("react-native-navigation");
const ui_1 = require("wing-b2c-core-mobile-sdk/src/ui");
const helpers_1 = require("wing-b2c-core-mobile-sdk/src/utils/helpers");
const config_1 = __importDefault(require("../config"));
const PaymentProcessing_1 = require("./PaymentProcessing");
const ERROR_PAGE = 'errorpage';
const PAYMENT_PAGE = 'paymentCard';
const STATUS_AND_BACK = '?status=0&back=true';
function PaymentWithWebView({ componentId, txnId, url, resolve }) {
    const [closeButtonVisible, setCloseButtonVisible] = (0, react_1.useState)(false);
    const [finishedPayment, setFinishedPayment] = (0, react_1.useState)(false);
    const onNavigationStateChange = (nextState) => {
        const shouldShowCloseButton = (nextState.url.includes(ERROR_PAGE) || nextState.canGoBack) && !nextState.url.includes(PAYMENT_PAGE);
        setCloseButtonVisible(shouldShowCloseButton);
        if (!nextState.url) {
            return;
        }
        if (nextState.url.includes(config_1.default.paymentSuccessDomain) || nextState.url.includes(STATUS_AND_BACK)) {
            setFinishedPayment(true);
        }
    };
    const dismissOverlay = (0, react_1.useCallback)(() => {
        resolve('failed');
        react_native_navigation_1.Navigation.dismissOverlay(componentId);
    }, [componentId, resolve]);
    if (finishedPayment) {
        return <PaymentProcessing_1.PaymentProcessing componentId={componentId} txnId={txnId} resolve={resolve}/>;
    }
    return (<react_native_1.View style={styles.container}>
      {closeButtonVisible && <TopBar onPress={dismissOverlay}/>}
      <react_native_webview_1.default source={{
            uri: url,
        }} bounces={false} startInLoadingState sharedCookiesEnabled javaScriptEnabled domStorageEnabled style={styles.webView} onNavigationStateChange={onNavigationStateChange} renderLoading={() => <ui_1.AbsoluteIndicator loading={true} indicatorColor="secondary"/>}/>
    </react_native_1.View>);
}
exports.PaymentWithWebView = PaymentWithWebView;
const TopBar = ({ onPress }) => {
    return (<react_native_1.View style={styles.topBarWrapper}>
      <react_native_1.TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <react_native_1.View style={styles.closeButton}>
          <MaterialIcons_1.default name="close" color="white" size={25}/>
        </react_native_1.View>
      </react_native_1.TouchableOpacity>
    </react_native_1.View>);
};
const STATUS_BAR_HEIGHT = (0, helpers_1.getStatusBarHeight)();
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b3250',
        paddingTop: STATUS_BAR_HEIGHT,
    },
    topBarWrapper: {
        width: '100%',
        alignItems: 'flex-end',
    },
    closeButton: {
        width: 50,
        height: 50,
    },
    webView: {
        flex: 1,
        paddingTop: 10,
        paddingBottom: 20,
    },
});
