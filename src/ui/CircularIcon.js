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
exports.CircularIcon = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const FontAwesome5_1 = __importDefault(require("react-native-vector-icons/FontAwesome5"));
const Ionicons_1 = __importDefault(require("react-native-vector-icons/Ionicons"));
const themes_1 = require("../themes");
const Badge_1 = require("./Badge");
function CircularIcon(props) {
    const sizeStyle = {
        width: props.size || themes_1.Mixins.Spacing.SCALE_32,
        height: props.size || themes_1.Mixins.Spacing.SCALE_32,
        borderRadius: props.size ? props.size / 2 : themes_1.Mixins.Radius.SCALE_16,
    };
    const hitSlop = props.hitSlop || { top: 10, bottom: 10, left: 10, right: 10 };
    return (react_1.default.createElement(react_native_1.TouchableOpacity, { activeOpacity: 0.8, onPress: props.onPress, disabled: props.disabled || props.loading, hitSlop: hitSlop, style: [styles.wrapper, sizeStyle, styles.contentCenter, props.containerStyle] }, props.loading ? (react_1.default.createElement(react_native_1.ActivityIndicator, { size: "small" })) : (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Icon, Object.assign({}, props)),
        props.badgeCount ? (react_1.default.createElement(Badge_1.Badge, { value: props.badgeCount, badgeSize: props.badgeCount > 99 ? 'medium' : 'small' })) : null))));
}
exports.CircularIcon = CircularIcon;
const Icon = (_a) => {
    var { iconFamily = 'FA' } = _a, restProps = __rest(_a, ["iconFamily"]);
    const iconSize = restProps.iconSize || 16;
    if (iconFamily === 'Ionicons') {
        return (react_1.default.createElement(Ionicons_1.default, Object.assign({ name: restProps.name, color: restProps.iconColor || themes_1.Colors.DARK_3, size: iconSize }, (restProps.solid ? { solid: true } : {}), { style: restProps.iconStyle })));
    }
    if (iconFamily === 'FA') {
        return (react_1.default.createElement(FontAwesome5_1.default, Object.assign({ name: restProps.name, color: restProps.iconColor || themes_1.Colors.DARK_3, size: iconSize }, (restProps.solid ? { solid: true } : {}), { style: restProps.iconStyle })));
    }
    if (iconFamily === 'Image' && restProps.icon) {
        return (react_1.default.createElement(react_native_1.Image, { resizeMode: "contain", source: restProps.icon, style: [
                { width: iconSize, tintColor: restProps.iconColor || themes_1.Colors.DARK_3 },
                restProps.iconStyle,
            ] }));
    }
    return null;
};
const styles = (0, themes_1.createStyles)({
    wrapper: {
        backgroundColor: themes_1.Colors.WHITE_4,
    },
    resizeContain: {
        resizeMode: 'contain',
    },
});
