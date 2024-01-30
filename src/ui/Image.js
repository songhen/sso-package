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
exports.Image = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const themes_1 = require("../themes");
const images_1 = __importDefault(require("../assets/images"));
const Image = (_a) => {
    var { imageHeight, imageWidth, imageSrc, fallbackImage = images_1.default.fallbackImage, style, animated = true } = _a, restProps = __rest(_a, ["imageHeight", "imageWidth", "imageSrc", "fallbackImage", "style", "animated"]);
    const isLocalImage = Boolean(typeof imageSrc === 'number');
    const isRemoteImage = Boolean(typeof imageSrc === 'object' && imageSrc.hasOwnProperty('uri') && imageSrc.uri);
    const [{ loading, error }, setError] = (0, react_1.useState)({
        loading: isRemoteImage,
        error: false,
    });
    const imageStyle = { width: imageWidth, height: imageHeight };
    const imageAnimated = (0, react_1.useRef)(new react_native_1.Animated.Value(animated && isRemoteImage ? 0 : 1)).current;
    if (!error && isRemoteImage) {
        return (react_1.default.createElement(react_native_1.View, { style: [imageStyle, style] },
            react_1.default.createElement(react_native_1.View, null,
                react_1.default.createElement(react_native_1.Animated.Image, Object.assign({}, restProps, { source: imageSrc, style: [imageStyle, style, { opacity: imageAnimated }], onError: () => {
                        setError(prev => (Object.assign(Object.assign({}, prev), { error: true })));
                        if (animated) {
                            react_native_1.Animated.timing(imageAnimated, {
                                toValue: 0,
                                duration: 500,
                                useNativeDriver: true,
                            }).start();
                        }
                    }, onLoad: () => {
                        setError(prev => (Object.assign(Object.assign({}, prev), { loading: false })));
                        if (animated) {
                            react_native_1.Animated.timing(imageAnimated, {
                                toValue: 1,
                                duration: 500,
                                useNativeDriver: true,
                            }).start();
                        }
                    } })),
                loading ? (react_1.default.createElement(react_native_1.View, { style: [imageStyle, style, styles.imageOverlay] })) : null)));
    }
    if (isLocalImage) {
        return (react_1.default.createElement(react_native_1.View, { style: [imageStyle, style] },
            react_1.default.createElement(react_native_1.Image, Object.assign({}, restProps, { source: imageSrc, style: [imageStyle, style] }))));
    }
    return (react_1.default.createElement(react_native_1.View, { style: [imageStyle, style] },
        react_1.default.createElement(react_native_1.Image, Object.assign({}, restProps, { source: fallbackImage, style: [imageStyle, style] }))));
};
exports.Image = Image;
const styles = (0, themes_1.createStyles)({
    imageOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: themes_1.Colors.PLACEHOLDER,
    },
});
exports.default = (0, react_1.memo)(exports.Image, (prev, next) => next.style === prev.style &&
    prev.imageSrc === next.imageSrc &&
    prev.imageWidth === next.imageWidth &&
    prev.imageHeight === next.imageHeight);
