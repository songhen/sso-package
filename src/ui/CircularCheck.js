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
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const FontAwesome5_1 = __importDefault(require("react-native-vector-icons/FontAwesome5"));
const themes_1 = require("../themes");
function CircularCheck({ size = themes_1.Mixins.Spacing.SCALE_16, active = false, activeBackgroundColor = themes_1.Colors.SECONDARY_1, onPress, iconSize = 10, disabled = false, style, }) {
    const iconColor = active ? themes_1.Colors.WHITE_1 : themes_1.Colors.WHITE_1;
    let backgroundColor = active ? activeBackgroundColor : themes_1.Colors.DARK_5;
    if (disabled) {
        backgroundColor = themes_1.Colors.DARK_6 + '70';
    }
    const wrapperStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor,
    };
    const whiteCircle = {
        width: size - 4,
        height: size - 4,
        borderRadius: (size - 4) / 2,
    };
    const inner = {
        width: size - 2,
        height: size - 2,
        borderRadius: (size - 2) / 2,
        backgroundColor,
    };
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, onPress: onPress, disabled: disabled || !onPress, style: [styles.checkButton, styles.contentCenter, wrapperStyle, style], hitSlop: { top: 10, bottom: 10, left: 10, right: 40 } },
        react_1.default.createElement(react_native_1.View, { style: [styles.whiteCircle, whiteCircle, styles.contentCenter] }, active && (react_1.default.createElement(react_native_1.View, { style: [styles.inner, inner, styles.contentCenter] },
            react_1.default.createElement(FontAwesome5_1.default, { name: "check", color: iconColor, size: iconSize }))))));
}
const styles = (0, themes_1.createStyles)({
    checkButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    whiteCircle: {
        backgroundColor: themes_1.Colors.WHITE_1,
    },
    inner: {
        position: 'absolute',
    },
});
exports.default = (0, react_1.memo)(CircularCheck, (prev, next) => prev.active === next.active &&
    prev.disabled === next.disabled &&
    prev.size === next.size &&
    prev.iconSize === next.iconSize &&
    prev.onPress === next.onPress &&
    prev.style === next.style);
