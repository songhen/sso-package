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
exports.Input = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const themes_1 = require("../themes");
const images_1 = __importDefault(require("../assets/images"));
const typography_1 = require("../themes/typography");
const Text_1 = __importDefault(require("./Text"));
const CircularIcon_1 = require("./CircularIcon");
const Image_1 = __importDefault(require("./Image"));
const Input = (0, react_1.memo)(({ value, onChange, placeholder, type = 'text', autoCapitalize, textAlign, autoCorrect, onSelectPress, disabled, loading, onPressIn, }) => {
    return (react_1.default.createElement(react_native_1.View, { style: styles.inputWrapper },
        type !== 'select' ? (react_1.default.createElement(react_native_1.TextInput, { value: value, multiline: type === 'textarea', editable: !disabled, placeholder: placeholder, onChangeText: onChange, onPressIn: onPressIn, allowFontScaling: false, autoCorrect: autoCorrect, textAlign: textAlign, placeholderTextColor: themes_1.Colors.DARK_20, textAlignVertical: type === 'textarea' ? 'top' : 'center', autoCapitalize: autoCapitalize, keyboardType: type === 'phone' ? 'phone-pad' : 'default', style: [
                type === 'textarea'
                    ? styles.textArea
                    : type === 'phone'
                        ? styles.phoneInput
                        : styles.formControl,
            ] })) : (react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.6, onPress: () => onSelectPress === null || onSelectPress === void 0 ? void 0 : onSelectPress(), disabled: disabled || loading, style: [styles.formControl, styles.flexCenter, styles.flexRow] },
            react_1.default.createElement(react_native_1.View, { style: [styles.flex1, styles.selectContentWrapper] },
                react_1.default.createElement(Text_1.default, { variant: "body", colorScaling: value ? '100' : '20', numberOfLines: 1, weight: "normal" }, value || placeholder)),
            react_1.default.createElement(react_native_1.View, { style: styles.contentCenter },
                react_1.default.createElement(CircularIcon_1.CircularIcon, { size: themes_1.Mixins.Spacing.SCALE_24, iconSize: themes_1.Mixins.Spacing.SCALE_12, iconColor: themes_1.Colors.DARK_40, disabled: true, name: "chevron-down", onPress: () => { }, loading: loading, containerStyle: styles.selectIconWrapper })))),
        type === 'phone' ? (react_1.default.createElement(react_native_1.View, { style: [styles.flagWrapper, styles.flexRow, styles.contentCenter] },
            react_1.default.createElement(Image_1.default, { imageSrc: images_1.default.flag, style: styles.flagImage, resizeMode: "contain" }),
            react_1.default.createElement(Text_1.default, { weight: "normal", colorScaling: "60" }, "+855"))) : null));
});
exports.Input = Input;
const styles = (0, themes_1.createStyles)({
    formControl: Object.assign({ color: themes_1.Colors.DARK_1, fontSize: typography_1.FontSize.body, backgroundColor: themes_1.Colors.WHITE_3, height: themes_1.Mixins.ButtonSize.SCALE_40, borderRadius: themes_1.Mixins.Spacing.SCALE_8, paddingHorizontal: themes_1.Mixins.Spacing.SCALE_14 }, (0, typography_1.fontFamilyAndWeightByPlatform)(typography_1.FontWeightVariant.regular, typography_1.SupportedLocales.EN)),
    textArea: Object.assign({ color: themes_1.Colors.DARK_1, fontSize: typography_1.FontSize.body, backgroundColor: themes_1.Colors.WHITE_3, borderRadius: themes_1.Mixins.Spacing.SCALE_8, paddingHorizontal: themes_1.Mixins.Spacing.SCALE_14, minHeight: 70, textAlignVertical: 'top', paddingTop: themes_1.Mixins.Spacing.SCALE_8 }, (0, typography_1.fontFamilyAndWeightByPlatform)(typography_1.FontWeightVariant.regular, typography_1.SupportedLocales.EN)),
    phoneInput: Object.assign({ paddingLeft: 100, color: themes_1.Colors.DARK_1, fontSize: typography_1.FontSize.body, backgroundColor: themes_1.Colors.WHITE_3, height: themes_1.Mixins.ButtonSize.SCALE_40, borderRadius: themes_1.Mixins.Spacing.SCALE_8, paddingHorizontal: themes_1.Mixins.Spacing.SCALE_14 }, (0, typography_1.fontFamilyAndWeightByPlatform)(typography_1.FontWeightVariant.regular, typography_1.SupportedLocales.EN)),
    leftInput: {
        paddingLeft: themes_1.Mixins.Spacing.SCALE_16,
        paddingRight: themes_1.Mixins.Spacing.SCALE_8,
    },
    rightInput: {
        paddingLeft: themes_1.Mixins.Spacing.SCALE_8,
        paddingRight: themes_1.Mixins.Spacing.SCALE_16,
    },
    inputWrapper: {
        backgroundColor: themes_1.Colors.WHITE_3,
        borderRadius: themes_1.Mixins.Spacing.SCALE_8,
    },
    flagWrapper: {
        left: 0,
        top: 0,
        bottom: 0,
        width: 100,
        position: 'absolute',
    },
    flagImage: {
        width: 30,
        height: 20,
        marginRight: themes_1.Mixins.Spacing.SCALE_8,
    },
    selectIconWrapper: {
        backgroundColor: themes_1.Colors.WHITE_2,
    },
    selectContentWrapper: {
        marginRight: themes_1.Mixins.Spacing.SCALE_12,
    },
});
