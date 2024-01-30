"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Text = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const react_i18next_1 = require("react-i18next");
const typography_1 = require("../themes/typography");
const themes_1 = require("../themes");
const MyText = (_a) => {
    var { children, animated, variant = typography_1.FontVariant.body, weight = typography_1.FontWeightVariant.medium, color = 'dark', colorScaling = '100', transform = 'none', decorationLine = 'none', align = 'left', i18n } = _a, props = __rest(_a, ["children", "animated", "variant", "weight", "color", "colorScaling", "transform", "decorationLine", "align", "i18n"]);
    const locale = (props.overrideLocale || i18n.language);
    const TextComponent = animated ? react_native_1.Animated.Text : react_native_1.Text;
    const colorKey = `${color.toUpperCase()}_${colorScaling}`;
    const textColor = { color: themes_1.Colors[colorKey] };
    const textTransform = { textTransform: transform };
    const textDecorationLine = { textDecorationLine: decorationLine };
    const textAlign = { textAlign: align };
    return (react_1.default.createElement(TextComponent, Object.assign({}, props, { allowFontScaling: false, maxFontSizeMultiplier: 1, minimumFontScale: 1, style: [
            styles[variant],
            textColor,
            textAlign,
            textTransform,
            textDecorationLine,
            (0, typography_1.fontFamilyAndWeightByPlatform)(weight, locale), // this includes fontWeight and fontFamily
            props.style,
        ] }), children));
};
const WithTranslationText = (0, react_i18next_1.withTranslation)()(MyText);
exports.Text = WithTranslationText;
const styles = (0, themes_1.createStyles)({
    // font size variants
    [typography_1.FontVariant.caption]: {
        fontSize: typography_1.FontSize.caption,
    },
    [typography_1.FontVariant.caption2]: {
        fontSize: typography_1.FontSize.caption2,
    },
    [typography_1.FontVariant.body]: {
        fontSize: typography_1.FontSize.body,
    },
    [typography_1.FontVariant.subtitle]: {
        fontSize: typography_1.FontSize.subtitle,
    },
    [typography_1.FontVariant.title]: {
        fontSize: typography_1.FontSize.title,
    },
    [typography_1.FontVariant.title2]: {
        fontSize: typography_1.FontSize.title2,
    },
    [typography_1.FontVariant.headline]: {
        fontSize: typography_1.FontSize.headline,
    },
    [typography_1.FontVariant.headline2]: {
        fontSize: typography_1.FontSize.headline2,
    },
    [typography_1.FontVariant.display]: {
        fontSize: typography_1.FontSize.display,
    },
});
exports.default = WithTranslationText;
