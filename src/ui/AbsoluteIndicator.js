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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const Indicator_1 = require("./Indicator");
const Text_1 = require("./Text");
const AbsoluteIndicator = ({ loading = false, indicatorColor = 'primary', label = '', bgOpacity = 0.3, }) => {
    const fadeAnim = (0, react_1.useRef)(new react_native_1.Animated.Value(0)).current;
    (0, react_1.useEffect)(() => {
        if (loading) {
            react_native_1.Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 150,
                useNativeDriver: true,
            }).start();
        }
        else {
            fadeAnim.setValue(0);
        }
    }, [loading]);
    return loading ? (react_1.default.createElement(react_native_1.Animated.View, { style: [
            styles.wrapper,
            {
                backgroundColor: `rgba(0, 0, 0, ${fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, bgOpacity],
                })})`,
            },
        ] },
        react_1.default.createElement(react_native_1.View, null,
            react_1.default.createElement(Indicator_1.Indicator, { size: 60, color: indicatorColor })),
        label ? (react_1.default.createElement(Text_1.Text, { color: indicatorColor, variant: "caption2" }, label)) : null)) : null;
};
const styles = react_native_1.StyleSheet.create({
    wrapper: {
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
exports.default = react_1.default.memo(AbsoluteIndicator);
