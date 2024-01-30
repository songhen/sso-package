"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPhoneNumberToNumber = exports.formatPhoneNumber = exports.formatNumberWithAbbreviateSuffix = exports.centToWingcoin = exports.centToDollar = exports.uuidv4 = exports.getDefaultModalHeight = exports.getStatusBarHeight = exports.VersionOver33 = exports.VersionOver30 = exports.isIphoneSE = exports.isIphoneX = exports.isHasDynamicIsland = exports.isAndroid = exports.isIOS = exports.replaceAll = exports.SCREEN_HEIGHT = exports.WINDOW_HEIGHT = exports.WINDOW_WIDTH = exports.TOP_BAR_HEIGHT = void 0;
const react_native_1 = require("react-native");
const precise_calculator_1 = require("./precise-calculator");
const react_native_device_info_1 = __importDefault(require("react-native-device-info"));
exports.TOP_BAR_HEIGHT = 48;
exports.WINDOW_WIDTH = react_native_1.Dimensions.get('window').width;
exports.WINDOW_HEIGHT = react_native_1.Dimensions.get('window').height;
exports.SCREEN_HEIGHT = react_native_1.Dimensions.get('screen').height;
function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}
exports.replaceAll = replaceAll;
exports.isIOS = react_native_1.Platform.OS === 'ios';
exports.isAndroid = react_native_1.Platform.OS === 'android';
exports.isHasDynamicIsland = react_native_device_info_1.default.hasDynamicIsland();
const isIphoneX = () => exports.isIOS && exports.WINDOW_HEIGHT >= 812;
exports.isIphoneX = isIphoneX;
const isIphoneSE = () => exports.isIOS && exports.WINDOW_HEIGHT <= 670;
exports.isIphoneSE = isIphoneSE;
exports.VersionOver30 = Number(react_native_1.Platform.Version) >= 30 && exports.isAndroid;
exports.VersionOver33 = Number(react_native_1.Platform.Version) >= 33 && exports.isAndroid;
const getStatusBarHeight = () => {
    const IOS_STATUS_BAR_HEIGHT = (0, exports.isIphoneX)() ? 44 : 20;
    const ANDROID_STATUS_BAR_HEIGHT = react_native_1.StatusBar.currentHeight || 20;
    const STATUS_BAR_HEIGHT = exports.isIOS ? IOS_STATUS_BAR_HEIGHT : ANDROID_STATUS_BAR_HEIGHT;
    return STATUS_BAR_HEIGHT;
};
exports.getStatusBarHeight = getStatusBarHeight;
const getDefaultModalHeight = () => {
    return exports.WINDOW_HEIGHT - (0, exports.getStatusBarHeight)() - exports.TOP_BAR_HEIGHT;
};
exports.getDefaultModalHeight = getDefaultModalHeight;
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0, 
        // eslint-disable-next-line no-bitwise
        v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
exports.uuidv4 = uuidv4;
const centToDollar = (value) => {
    const calculator = new precise_calculator_1.PreciseCalculator(value);
    calculator.div(100);
    const dollarValue = calculator.val();
    return (0, exports.formatNumberWithAbbreviateSuffix)({ value: dollarValue, abbrFromValue: 10000 });
};
exports.centToDollar = centToDollar;
const centToWingcoin = (value) => {
    return (0, exports.formatNumberWithAbbreviateSuffix)({ value, abbrFromValue: 10000 });
};
exports.centToWingcoin = centToWingcoin;
/**
 * Formats a number with an abbreviated suffix.
 *
 * If the value is less than 10,000, it returns the value as a string.
 * If the value is greater than or equal to 10,000, it calculates the appropriate suffix (K for thousands, M for millions, B for billions, T for trillions, Q for quadrillions) based on the logarithm of the value divided by 1,000.
 * It then divides the value by 1,000 raised to the power of the logarithm and returns the result as a string with the suffix appended.
 *
 * @param value - The number to be formatted.
 * @param abbrFromValue - The starting point of value where to be formatted.
 * @returns The formatted number as a string.
 */
const formatNumberWithAbbreviateSuffix = ({ value, abbrFromValue = 1000, }) => {
    if (value < abbrFromValue) {
        return value.toString();
    }
    const exp = Math.floor(Math.log(value) / Math.log(1000));
    const suffix = 'KMBTQ'[exp - 1];
    const decimalDigits = (value / Math.pow(1000, exp)).toFixed(1);
    return `${decimalDigits}${suffix}`;
};
exports.formatNumberWithAbbreviateSuffix = formatNumberWithAbbreviateSuffix;
const formatPhoneNumber = (phoneNumber) => {
    return `+855${phoneNumber.replace(/^0/, '')}`;
};
exports.formatPhoneNumber = formatPhoneNumber;
const formatPhoneNumberToNumber = (phoneNumber) => {
    return phoneNumber.replace('+855', '');
};
exports.formatPhoneNumberToNumber = formatPhoneNumberToNumber;
