export declare const TOP_BAR_HEIGHT = 48;
export declare const WINDOW_WIDTH: number;
export declare const WINDOW_HEIGHT: number;
export declare const SCREEN_HEIGHT: number;
export declare function replaceAll(str: string, find: RegExp, replace: string): string;
export declare const isIOS: boolean;
export declare const isAndroid: boolean;
export declare const isHasDynamicIsland: boolean;
export declare const isIphoneX: () => boolean;
export declare const isIphoneSE: () => boolean;
export declare const VersionOver30: boolean;
export declare const VersionOver33: boolean;
export declare const getStatusBarHeight: () => number;
export declare const getDefaultModalHeight: () => number;
export declare function uuidv4(): string;
export declare const centToDollar: (value: number) => string;
export declare const centToWingcoin: (value: number) => string;
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
export declare const formatNumberWithAbbreviateSuffix: ({ value, abbrFromValue, }: {
    value: number;
    abbrFromValue: number;
}) => string;
export declare const formatPhoneNumber: (phoneNumber: string) => string;
export declare const formatPhoneNumberToNumber: (phoneNumber: string) => string;
