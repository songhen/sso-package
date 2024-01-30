"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontFamilyAndWeightByPlatform = exports.FontWeightVariant = exports.FontVariant = exports.AndroidFontWeight = exports.FontWeight = exports.FontSize = exports.AndroidFontFamily = exports.FontFamily = exports.SupportedLocales = void 0;
const react_native_1 = require("react-native");
exports.SupportedLocales = {
    EN: 'en',
    KH: 'km',
    CN: 'cn',
};
// FONT FAMILY
exports.FontFamily = {
    [exports.SupportedLocales.EN]: 'Gotham',
    [exports.SupportedLocales.KH]: 'Kantumruy Pro',
    [exports.SupportedLocales.CN]: 'Gotham',
};
// ANDROID FONT FAMILY
exports.AndroidFontFamily = {
    [exports.SupportedLocales.EN]: {
        thin: 'Gotham-Thin',
        light: 'Gotham-Light',
        normal: 'Gotham-Book',
        regular: 'Gotham-Book',
        medium: 'Gotham-Medium',
        semiBold: 'Gotham-Medium',
        bold: 'Gotham-Bold',
        extraBold: 'Gotham-Black',
        black: 'Gotham-Black',
    },
    [exports.SupportedLocales.KH]: {
        thin: 'KantumruyPro-Thin',
        light: 'KantumruyPro-Light',
        normal: 'KantumruyPro',
        regular: 'KantumruyPro',
        medium: 'KantumruyPro-Medium',
        semiBold: 'KantumruyPro-SemiBold',
        bold: 'Gotham-Bold',
        extraBold: 'Gotham-Bold',
        black: 'Gotham-Bold',
    },
    [exports.SupportedLocales.CN]: {
        thin: 'Gotham-Thin',
        light: 'Gotham-Light',
        normal: 'Gotham-Book',
        regular: 'Gotham-Book',
        medium: 'Gotham-Medium',
        semiBold: 'Gotham-Medium',
        bold: 'Gotham-Bold',
        extraBold: 'Gotham-Black',
        black: 'Gotham-Black',
    },
};
// FONT SIZE
var FontSize;
(function (FontSize) {
    FontSize[FontSize["caption"] = 10] = "caption";
    FontSize[FontSize["caption2"] = 12] = "caption2";
    FontSize[FontSize["body"] = 14] = "body";
    FontSize[FontSize["subtitle"] = 16] = "subtitle";
    FontSize[FontSize["title"] = 18] = "title";
    FontSize[FontSize["title2"] = 20] = "title2";
    FontSize[FontSize["headline"] = 22] = "headline";
    FontSize[FontSize["headline2"] = 24] = "headline2";
    FontSize[FontSize["display"] = 28] = "display";
})(FontSize || (exports.FontSize = FontSize = {}));
// FONT WEIGHT
var FontWeight;
(function (FontWeight) {
    FontWeight["thin"] = "100";
    FontWeight["light"] = "200";
    FontWeight["normal"] = "normal";
    FontWeight["regular"] = "400";
    FontWeight["medium"] = "500";
    FontWeight["semiBold"] = "600";
    FontWeight["bold"] = "bold";
    FontWeight["extraBold"] = "800";
    FontWeight["black"] = "900";
})(FontWeight || (exports.FontWeight = FontWeight = {}));
// ANDROID FONT WEIGHT
var AndroidFontWeight;
(function (AndroidFontWeight) {
    AndroidFontWeight["thin"] = "Gotham-Thin";
    AndroidFontWeight["light"] = "Gotham-Light";
    AndroidFontWeight["normal"] = "Gotham-Book";
    AndroidFontWeight["regular"] = "Gotham-Book";
    AndroidFontWeight["medium"] = "Gotham-Medium";
    AndroidFontWeight["semiBold"] = "Gotham-Medium";
    AndroidFontWeight["bold"] = "Gotham-Bold";
    AndroidFontWeight["extraBold"] = "Gotham-Black";
    AndroidFontWeight["black"] = "Gotham-Black";
})(AndroidFontWeight || (exports.AndroidFontWeight = AndroidFontWeight = {}));
var FontVariant;
(function (FontVariant) {
    /**
     * 10px
     */
    FontVariant["caption"] = "caption";
    /**
     * 12px
     */
    FontVariant["caption2"] = "caption2";
    /**
     * 14px
     */
    FontVariant["body"] = "body";
    /**
     * 16px
     */
    FontVariant["subtitle"] = "subtitle";
    /**
     * 18px
     */
    FontVariant["title"] = "title";
    /**
     * 20px
     */
    FontVariant["title2"] = "title2";
    /**
     * 22px
     */
    FontVariant["headline"] = "headline";
    /**
     * 24px
     */
    FontVariant["headline2"] = "headline2";
    /**
     * 28px
     */
    FontVariant["display"] = "display";
})(FontVariant || (exports.FontVariant = FontVariant = {}));
var FontWeightVariant;
(function (FontWeightVariant) {
    FontWeightVariant["thin"] = "thin";
    FontWeightVariant["light"] = "light";
    FontWeightVariant["normal"] = "normal";
    FontWeightVariant["regular"] = "regular";
    FontWeightVariant["medium"] = "medium";
    FontWeightVariant["semiBold"] = "semiBold";
    FontWeightVariant["bold"] = "bold";
    FontWeightVariant["extraBold"] = "extraBold";
    FontWeightVariant["black"] = "black";
})(FontWeightVariant || (exports.FontWeightVariant = FontWeightVariant = {}));
const fontFamilyAndWeightByPlatform = (weight, language) => {
    /**
     *
     * is IOS return font weight and font family
     * is Android return font family
     */
    const fontWeightByPlatform = {
        ios: {
            fontWeight: FontWeight[weight],
            fontFamily: exports.FontFamily[language],
        },
        android: {
            fontFamily: exports.AndroidFontFamily[language][weight],
        },
        macos: {
            fontWeight: FontWeight[weight],
            fontFamily: exports.FontFamily[language],
        },
        windows: {
            fontWeight: FontWeight[weight],
            fontFamily: exports.FontFamily[language],
        },
        web: {
            fontWeight: FontWeight[weight],
            fontFamily: exports.FontFamily[language],
        },
    }[react_native_1.Platform.OS];
    return fontWeightByPlatform;
};
exports.fontFamilyAndWeightByPlatform = fontFamilyAndWeightByPlatform;
