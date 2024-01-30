"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const Text_1 = require("./Text");
const Indicator_1 = require("./Indicator");
const themes_1 = require("../themes");
const Button = ({ icon, width, height = 40, rounded = themes_1.Mixins.Spacing.SCALE_8, backgroundColor = themes_1.Colors.WHITE_4, loading = false, indicatorColor, 
//
style, onPress, disabled, label, labelStyle, labelVariant = 'body', labelWeight = 'medium', labelColor = themes_1.Colors.DARK_1, numberOfLines, }) => {
    const opacity = disabled ? 0.4 : 1;
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { onPress: onPress, activeOpacity: 0.8, disabled: disabled || loading, hitSlop: { top: 10, bottom: 10, left: 10, right: 10 }, style: [
            styles.container,
            { backgroundColor },
            { borderRadius: rounded },
            { width, height },
            style,
            { opacity },
        ] },
        icon,
        loading ? (react_1.default.createElement(Indicator_1.Indicator, { size: "small", color: indicatorColor })) : (react_1.default.createElement(Text_1.Text, { color: "dark", variant: labelVariant, style: [styles.labelStyle, { color: labelColor }, icon ? styles.iconLabelStyle : {}, labelStyle], weight: labelWeight, numberOfLines: numberOfLines }, label))));
};
exports.Button = Button;
const styles = (0, themes_1.createStyles)({
    container: {
        paddingHorizontal: 16,
        alignSelf: 'flex-start',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    labelStyle: {
        textAlign: 'center',
    },
    iconLabelStyle: {
        marginLeft: themes_1.Mixins.Spacing.SCALE_6,
    },
    indicator: {
        marginLeft: themes_1.Mixins.Spacing.SCALE_8,
    },
});
