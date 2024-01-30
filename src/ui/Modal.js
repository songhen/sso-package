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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modal = exports.EasingPreset = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const useBackHandler_1 = require("../hooks/useBackHandler");
const themes_1 = require("../themes");
const helpers_1 = require("../utils/helpers");
const Text_1 = __importDefault(require("./Text"));
const FontAwesome5_1 = __importDefault(require("react-native-vector-icons/FontAwesome5"));
exports.EasingPreset = {
    EASE_IN_CUBIC: react_native_1.Easing.bezier(0.32, 0, 0.67, 0),
    EASE_OUT_CUBIC: react_native_1.Easing.bezier(0.33, 1, 0.68, 1),
    EASE_IN_OUT_CUBIC: react_native_1.Easing.bezier(0.65, 0, 0.35, 1),
};
const AnimatedTouchable = react_native_1.Animated.createAnimatedComponent(react_native_1.TouchableWithoutFeedback);
const Visibility = {
    SHOW: 1,
    HIDE: 0,
};
const ALLOW_HARDWARE_BACK_BUTTON_PRESS = false;
const DISALLOW_HARDWARE_BACK_BUTTON_PRESS = true;
const backHandler = (enabled, callback) => {
    if (enabled) {
        callback === null || callback === void 0 ? void 0 : callback();
        return ALLOW_HARDWARE_BACK_BUTTON_PRESS;
    }
    return DISALLOW_HARDWARE_BACK_BUTTON_PRESS;
};
exports.Modal = react_1.default.forwardRef(({ children, title, cancellable, hideCloseButton, contentHeight = (0, helpers_1.getDefaultModalHeight)(), onHardwareBackButtonPress, onPressCloseButton, onPressBackdrop, }, ref) => {
    const [visible, setVisible] = (0, react_1.useState)(false);
    const fadeAnimation = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    const fadeInUpAnimation = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, useBackHandler_1.useBackHandler)(() => backHandler(Boolean(cancellable), onHardwareBackButtonPress));
    (0, react_1.useImperativeHandle)(ref, () => ({
        onShow: _onShow,
        onHide: _onHide,
    }));
    const _onShow = react_1.default.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        setVisible(true);
        yield onToggle(Visibility.SHOW);
    }), []);
    const _onHide = react_1.default.useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        yield onToggle(Visibility.HIDE);
        setVisible(false);
    }), []);
    const onToggle = (toValue) => {
        return new Promise(resolve => {
            react_native_1.Animated.parallel([
                react_native_1.Animated.timing(fadeInUpAnimation, {
                    toValue,
                    duration: 300,
                    easing: exports.EasingPreset.EASE_OUT_CUBIC,
                    useNativeDriver: true,
                }),
                react_native_1.Animated.timing(fadeAnimation, {
                    toValue,
                    duration: 100,
                    useNativeDriver: true,
                    easing: exports.EasingPreset.EASE_IN_CUBIC,
                }),
            ]).start(result => {
                if (result.finished) {
                    resolve('done');
                }
            });
        });
    };
    const cardOpacity = fadeInUpAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp',
    });
    const translateY = fadeInUpAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [200, 0],
        extrapolate: 'clamp',
    });
    if (!visible) {
        return null;
    }
    return (react_1.default.createElement(react_native_1.View, { style: styles.container },
        react_1.default.createElement(AnimatedTouchable, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                if (!onPressBackdrop) {
                    return;
                }
                yield _onHide();
                onPressBackdrop === null || onPressBackdrop === void 0 ? void 0 : onPressBackdrop();
            }), style: [{ opacity: fadeAnimation }] },
            react_1.default.createElement(react_native_1.View, { style: [styles.backdrop] })),
        react_1.default.createElement(react_native_1.Animated.View, { style: [
                styles.card,
                { height: contentHeight },
                { opacity: cardOpacity, transform: [{ translateY }] },
            ] },
            react_1.default.createElement(BottomSheetDragIndicator, null),
            react_1.default.createElement(react_native_1.View, { style: styles.titleWrapper },
                title ? (react_1.default.createElement(react_native_1.View, { style: [styles.flex1, styles.title] },
                    react_1.default.createElement(Text_1.default, { color: "dark", colorScaling: "100", variant: "title" }, title))) : null,
                hideCloseButton ? null : (react_1.default.createElement(ButtonClose, { onPress: () => __awaiter(void 0, void 0, void 0, function* () {
                        if (!onPressCloseButton) {
                            return;
                        }
                        yield _onHide();
                        onPressCloseButton === null || onPressCloseButton === void 0 ? void 0 : onPressCloseButton();
                    }) }))),
            children)));
});
const BottomSheetDragIndicator = () => {
    return react_1.default.createElement(react_native_1.View, { style: styles.bottomSheetDragIndicator });
};
const ButtonClose = ({ onPress }) => {
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { style: styles.buttonContainer, onPress: onPress, hitSlop: { right: 10, left: 10, top: 10, bottom: 10 } },
        react_1.default.createElement(FontAwesome5_1.default, { size: 12, name: "times", color: themes_1.Colors.DARK_4 })));
};
const styles = (0, themes_1.createStyles)({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
    },
    backdrop: Object.assign({ backgroundColor: themes_1.Colors.MODAL_BACKDROP_50 }, react_native_1.StyleSheet.absoluteFillObject),
    titleWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: themes_1.Mixins.Spacing.SCALE_12,
    },
    title: {
        marginHorizontal: themes_1.Mixins.Spacing.SCALE_16,
    },
    card: {
        width: '100%',
        maxHeight: '90%',
        backgroundColor: themes_1.Colors.WHITE_1,
        borderTopStartRadius: themes_1.Mixins.Spacing.SCALE_12,
        borderTopEndRadius: themes_1.Mixins.Spacing.SCALE_12,
    },
    bottomSheetDragIndicator: {
        marginTop: 8,
        height: 4,
        alignSelf: 'center',
        width: '10%',
        backgroundColor: themes_1.Colors.DARK_4,
        borderRadius: 12,
    },
    buttonContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        backgroundColor: themes_1.Colors.WHITE_5,
        alignSelf: 'flex-start',
        alignItems: 'center',
        marginRight: 16,
        marginLeft: 'auto',
    },
});
