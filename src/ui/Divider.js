"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Divider = void 0;
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const themes_1 = require("../themes");
const Divider = ({ height = 8, style }) => {
    return react_1.default.createElement(react_native_1.View, { style: [styles.container, { height }, style] });
};
exports.Divider = Divider;
const styles = (0, themes_1.createStyles)({
    container: {
        width: '100%',
        backgroundColor: themes_1.Colors.WHITE_3,
    },
});
