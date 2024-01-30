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
exports.ContainerView = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const themes_1 = require("../themes");
const ContainerView = (_a) => {
    var { scrollable, style, contentContainerStyle, scrollViewRef } = _a, restProps = __rest(_a, ["scrollable", "style", "contentContainerStyle", "scrollViewRef"]);
    if (!scrollable) {
        return react_1.default.createElement(react_native_1.View, Object.assign({ style: [styles.flex1, style] }, restProps));
    }
    return (react_1.default.createElement(react_native_1.ScrollView, Object.assign({ ref: scrollViewRef, style: style, showsVerticalScrollIndicator: false, contentContainerStyle: [styles.scrollViewContent, contentContainerStyle] }, restProps)));
};
exports.ContainerView = ContainerView;
const styles = (0, themes_1.createStyles)({
    scrollViewContent: {
        paddingBottom: themes_1.Mixins.Spacing.SCALE_32,
    },
});
