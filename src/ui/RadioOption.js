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
Object.defineProperty(exports, "__esModule", { value: true });
exports.RadioOption = void 0;
const react_1 = __importStar(require("react"));
const react_native_1 = require("react-native");
const themes_1 = require("../themes");
function RadioOption({ size = themes_1.Mixins.ButtonSize.SCALE_20, color = themes_1.Colors.SECONDARY_1, selected, }) {
    const styles = (0, react_1.useMemo)(() => {
        return {
            outer: {
                height: size,
                width: size,
                borderRadius: size / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: selected ? color : themes_1.Colors.SECONDARY_10,
            },
            circle: {
                width: size - 4,
                height: size - 4,
                borderRadius: (size - 2) / 2,
                backgroundColor: themes_1.Colors.WHITE_1,
            },
            inner: {
                height: size - 8,
                width: size - 8,
                borderRadius: size / 2,
                position: 'absolute',
                backgroundColor: color,
            },
        };
    }, [size, selected, color]);
    return (react_1.default.createElement(react_native_1.View, { style: styles.outer },
        react_1.default.createElement(react_native_1.View, { style: styles.circle }),
        selected ? react_1.default.createElement(react_native_1.View, { style: styles.inner }) : null));
}
exports.RadioOption = RadioOption;
