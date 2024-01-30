"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Badge = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const themes_1 = require("../themes");
const typography_1 = require("../themes/typography");
const Badge = ({ value, badgeSize = 'small' }) => {
    if (!value) {
        return null;
    }
    let displayValue = value.toString();
    if (value > 99) {
        displayValue = '99+';
    }
    return (react_1.default.createElement(react_native_1.View, { style: [badgeSize === 'small' ? styles.smallBadge : styles.mediumBadge] },
        react_1.default.createElement(react_native_1.Text, { style: styles.text }, displayValue)));
};
exports.Badge = Badge;
const styles = (0, themes_1.createStyles)({
    smallBadge: {
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        right: -2,
        top: -2,
        width: 16,
        height: 16,
    },
    mediumBadge: {
        position: 'absolute',
        backgroundColor: 'red',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        right: -2,
        top: -2,
        height: 16,
        minWidth: 16,
        paddingHorizontal: themes_1.Mixins.Spacing.SCALE_2,
    },
    text: {
        color: 'white',
        fontSize: 9,
        fontWeight: typography_1.FontWeight.medium,
        lineHeight: 12,
    },
});
