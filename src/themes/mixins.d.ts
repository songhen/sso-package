import { ViewStyle } from 'react-native';
export declare const WINDOW_WIDTH: number;
export declare const WINDOW_HEIGHT: number;
export declare const SCREEN_HEIGHT: number;
export declare const TOP_BAR_HEIGHT = 48;
export declare const scaleSize: (size: number) => number;
export declare const scaleFont: (size: number) => number;
export declare function margin(top: number, right: number, bottom: number, left: number): {
    [key: string]: number;
};
export declare function padding(top: number, right: number, bottom: number, left: number): {
    [key: string]: number;
};
export declare function boxShadow(color: string, offset?: {
    height: number;
    width: number;
}, radius?: number, opacity?: number): {
    shadowColor: string;
    shadowOffset: {
        height: number;
        width: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
};
export declare const ButtonSize: {
    SCALE_20: number;
    SCALE_22: number;
    SCALE_30: number;
    SCALE_32: number;
    SCALE_40: number;
    SCALE_45: number;
    SCALE_48: number;
};
export declare const Spacing: {
    readonly SCALE_2: 2;
    readonly SCALE_3: 3;
    readonly SCALE_4: 4;
    readonly SCALE_6: 6;
    readonly SCALE_8: 8;
    readonly SCALE_10: 10;
    readonly SCALE_12: 12;
    readonly SCALE_14: 14;
    readonly SCALE_16: 16;
    readonly SCALE_18: 18;
    readonly SCALE_20: 20;
    readonly SCALE_22: 22;
    readonly SCALE_24: 24;
    readonly SCALE_26: 26;
    readonly SCALE_28: 28;
    readonly SCALE_30: 30;
    readonly SCALE_32: 32;
    readonly SCALE_36: 36;
    readonly SCALE_40: 40;
    readonly SCALE_50: 50;
    readonly SCALE_64: 64;
    readonly SCALE_72: 72;
};
export declare const Radius: {
    readonly SCALE_4: 4;
    readonly SCALE_8: 8;
    readonly SCALE_16: 16;
    readonly SCALE_32: 32;
    readonly SCALE_100: 100;
};
export type BaseStyles = {
    flex1: ViewStyle;
    contentCenter: ViewStyle;
    flexRow: ViewStyle;
    flexRowReverse: ViewStyle;
    flexEnd: ViewStyle;
    flexStart: ViewStyle;
    flexCenter: ViewStyle;
    justifyEnd: ViewStyle;
    justifyStart: ViewStyle;
    justifyCenter: ViewStyle;
    spaceBetween: ViewStyle;
    sectionSeparator: ViewStyle;
    flexWrap: ViewStyle;
    button: ViewStyle;
    growButton: ViewStyle;
    footerButtonWrapper: ViewStyle;
    footerButtonWrapperNoShadow: ViewStyle;
    topBarWrapper: ViewStyle;
    topBarDisplayTitleWrapper: ViewStyle;
    fullWidth: ViewStyle;
    confirmationModalImageWrapper: ViewStyle;
    confirmationModalLeftBtn: ViewStyle;
};
export declare const BASE_STYLES: BaseStyles;
export declare const CAROUSEL_WIDTH = 312;
export declare const WIDE_ASPECT_RATIO: number;
export declare const PRODUCT_CARD_WIDTH: number;
export declare const HORIZONTAL_PRODUCT_CARD_ITEM_WIDTH: number;
export declare const CATEGORY_PRODUCT_TYPE_WIDTH: number;
