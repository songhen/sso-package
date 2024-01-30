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
exports.CATEGORY_PRODUCT_TYPE_WIDTH = exports.HORIZONTAL_PRODUCT_CARD_ITEM_WIDTH = exports.PRODUCT_CARD_WIDTH = exports.WIDE_ASPECT_RATIO = exports.CAROUSEL_WIDTH = exports.BASE_STYLES = exports.Radius = exports.Spacing = exports.ButtonSize = exports.boxShadow = exports.padding = exports.margin = exports.scaleFont = exports.scaleSize = exports.TOP_BAR_HEIGHT = exports.SCREEN_HEIGHT = exports.WINDOW_HEIGHT = exports.WINDOW_WIDTH = void 0;
const react_native_1 = require("react-native");
const helpers = __importStar(require("../utils/helpers"));
const Colors = __importStar(require("./colors"));
exports.WINDOW_WIDTH = helpers.WINDOW_WIDTH;
exports.WINDOW_HEIGHT = helpers.WINDOW_HEIGHT;
exports.SCREEN_HEIGHT = helpers.SCREEN_HEIGHT;
exports.TOP_BAR_HEIGHT = helpers.TOP_BAR_HEIGHT;
const guidelineBaseWidth = 375;
const scaleSize = (size) => (exports.WINDOW_WIDTH / guidelineBaseWidth) * size;
exports.scaleSize = scaleSize;
const scaleFont = (size) => size * react_native_1.PixelRatio.getFontScale();
exports.scaleFont = scaleFont;
function dimensions(top, right = top, bottom = top, left = right, property) {
    const styles = {};
    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;
    return styles;
}
function margin(top, right, bottom, left) {
    return dimensions(top, right, bottom, left, 'margin');
}
exports.margin = margin;
function padding(top, right, bottom, left) {
    return dimensions(top, right, bottom, left, 'padding');
}
exports.padding = padding;
function boxShadow(color, offset = { height: 2, width: 2 }, radius = 8, opacity = 0.2) {
    return {
        shadowColor: color,
        shadowOffset: offset,
        shadowOpacity: opacity,
        shadowRadius: radius,
        elevation: radius / 2,
    };
}
exports.boxShadow = boxShadow;
exports.ButtonSize = {
    SCALE_20: 20,
    SCALE_22: 22,
    SCALE_30: 30,
    SCALE_32: 32,
    SCALE_40: 40,
    SCALE_45: 45,
    SCALE_48: 48,
};
exports.Spacing = {
    SCALE_2: 2,
    SCALE_3: 3,
    SCALE_4: 4,
    SCALE_6: 6,
    SCALE_8: 8,
    SCALE_10: 10,
    SCALE_12: 12,
    SCALE_14: 14,
    SCALE_16: 16,
    SCALE_18: 18,
    SCALE_20: 20,
    SCALE_22: 22,
    SCALE_24: 24,
    SCALE_26: 26,
    SCALE_28: 28,
    SCALE_30: 30,
    SCALE_32: 32,
    SCALE_36: 36,
    SCALE_40: 40,
    SCALE_50: 50,
    SCALE_64: 64,
    SCALE_72: 72,
};
exports.Radius = {
    SCALE_4: 4,
    SCALE_8: 8,
    SCALE_16: 16,
    SCALE_32: 32,
    SCALE_100: 100,
};
exports.BASE_STYLES = {
    flex1: {
        flex: 1,
    },
    contentCenter: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    flexRow: {
        flexDirection: 'row',
    },
    flexRowReverse: {
        flexDirection: 'row-reverse',
    },
    flexStart: {
        alignItems: 'flex-start',
    },
    flexEnd: {
        alignItems: 'flex-end',
    },
    flexCenter: {
        alignItems: 'center',
    },
    justifyCenter: {
        justifyContent: 'center',
    },
    justifyStart: {
        justifyContent: 'flex-start',
    },
    justifyEnd: {
        justifyContent: 'flex-end',
    },
    spaceBetween: {
        justifyContent: 'space-between',
    },
    sectionSeparator: {
        height: exports.Spacing.SCALE_8,
        backgroundColor: Colors.WHITE_3,
    },
    flexWrap: {
        flexWrap: 'wrap',
    },
    footerButtonWrapper: Object.assign({ flexDirection: 'row', padding: exports.Spacing.SCALE_16, paddingBottom: helpers.isIphoneX() ? exports.Spacing.SCALE_32 : exports.Spacing.SCALE_16, backgroundColor: Colors.WHITE_1 }, boxShadow(Colors.DARK_5, { height: -3, width: 0 }, 12, 0.2)),
    footerButtonWrapperNoShadow: {
        flexDirection: 'row',
        padding: exports.Spacing.SCALE_16,
        paddingBottom: helpers.isIphoneX() ? exports.Spacing.SCALE_32 : exports.Spacing.SCALE_16,
    },
    button: {
        width: 34,
        height: 34,
        borderWidth: 1,
        borderRadius: 2,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderColor: Colors.DARK_1,
        // columnGap: Spacing.SCALE_3,
    },
    topBarWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.WHITE_1,
        paddingHorizontal: exports.Spacing.SCALE_16,
        paddingTop: helpers.getStatusBarHeight(),
        height: exports.TOP_BAR_HEIGHT + helpers.getStatusBarHeight(),
    },
    topBarDisplayTitleWrapper: {
        marginTop: exports.Spacing.SCALE_8,
        marginBottom: exports.Spacing.SCALE_16,
        marginHorizontal: exports.Spacing.SCALE_16,
    },
    growButton: {
        flex: 1,
        width: undefined,
    },
    fullWidth: {
        width: '100%',
    },
    confirmationModalImageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 50,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.PRIMARY_6,
        marginTop: exports.Spacing.SCALE_32,
        marginBottom: exports.Spacing.SCALE_28,
    },
    confirmationModalLeftBtn: {
        minWidth: 120,
        marginRight: exports.Spacing.SCALE_8,
    },
};
exports.CAROUSEL_WIDTH = 312;
exports.WIDE_ASPECT_RATIO = 16 / 9;
exports.PRODUCT_CARD_WIDTH = (exports.WINDOW_WIDTH - exports.Spacing.SCALE_32 - exports.Spacing.SCALE_8) / 2; // split into 2 columns and 8 spacing
exports.HORIZONTAL_PRODUCT_CARD_ITEM_WIDTH = (exports.WINDOW_WIDTH - exports.Spacing.SCALE_32 - exports.Spacing.SCALE_8) / 2.1;
exports.CATEGORY_PRODUCT_TYPE_WIDTH = (exports.WINDOW_WIDTH * 0.75 - exports.Spacing.SCALE_8 - exports.Spacing.SCALE_32) / 3;
