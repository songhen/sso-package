import { PixelRatio, ViewStyle } from 'react-native'
import * as helpers from '../utils/helpers'
import * as Colors from './colors'

export const WINDOW_WIDTH = helpers.WINDOW_WIDTH
export const WINDOW_HEIGHT = helpers.WINDOW_HEIGHT
export const SCREEN_HEIGHT = helpers.SCREEN_HEIGHT
export const TOP_BAR_HEIGHT = helpers.TOP_BAR_HEIGHT

const guidelineBaseWidth = 375

export const scaleSize = (size: number) => (WINDOW_WIDTH / guidelineBaseWidth) * size

export const scaleFont = (size: number) => size * PixelRatio.getFontScale()

function dimensions(top: number, right = top, bottom = top, left = right, property: 'padding' | 'margin') {
  const styles: { [key: string]: number } = {}

  styles[`${property}Top`] = top
  styles[`${property}Right`] = right
  styles[`${property}Bottom`] = bottom
  styles[`${property}Left`] = left

  return styles
}

export function margin(top: number, right: number, bottom: number, left: number) {
  return dimensions(top, right, bottom, left, 'margin')
}

export function padding(top: number, right: number, bottom: number, left: number) {
  return dimensions(top, right, bottom, left, 'padding')
}

export function boxShadow(color: string, offset = { height: 2, width: 2 }, radius = 8, opacity = 0.2) {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius / 2,
  }
}

export const ButtonSize = {
  SCALE_20: 20,
  SCALE_22: 22,
  SCALE_30: 30,
  SCALE_32: 32,
  SCALE_40: 40,
  SCALE_45: 45,
  SCALE_48: 48,
}

export const Spacing = {
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
} as const

export const Radius = {
  SCALE_4: 4,
  SCALE_8: 8,
  SCALE_16: 16,
  SCALE_32: 32,
  SCALE_100: 100,
} as const

export type BaseStyles = {
  flex1: ViewStyle
  contentCenter: ViewStyle
  flexRow: ViewStyle
  flexRowReverse: ViewStyle
  flexEnd: ViewStyle
  flexStart: ViewStyle
  flexCenter: ViewStyle
  justifyEnd: ViewStyle
  justifyStart: ViewStyle
  justifyCenter: ViewStyle
  spaceBetween: ViewStyle
  sectionSeparator: ViewStyle
  flexWrap: ViewStyle

  button: ViewStyle
  growButton: ViewStyle
  footerButtonWrapper: ViewStyle
  footerButtonWrapperNoShadow: ViewStyle
  topBarWrapper: ViewStyle
  topBarDisplayTitleWrapper: ViewStyle

  fullWidth: ViewStyle
  confirmationModalImageWrapper: ViewStyle
  confirmationModalLeftBtn: ViewStyle
}

export const BASE_STYLES: BaseStyles = {
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
    height: Spacing.SCALE_8,
    backgroundColor: Colors.WHITE_3,
  },
  flexWrap: {
    flexWrap: 'wrap',
  },

  footerButtonWrapper: {
    flexDirection: 'row',
    padding: Spacing.SCALE_16,
    paddingBottom: helpers.isIphoneX() ? Spacing.SCALE_32 : Spacing.SCALE_16,
    backgroundColor: Colors.WHITE_1,
    ...boxShadow(Colors.DARK_5, { height: -3, width: 0 }, 12, 0.2),
  },

  footerButtonWrapperNoShadow: {
    flexDirection: 'row',
    padding: Spacing.SCALE_16,
    paddingBottom: helpers.isIphoneX() ? Spacing.SCALE_32 : Spacing.SCALE_16,
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
    paddingHorizontal: Spacing.SCALE_16,
    paddingTop: helpers.getStatusBarHeight(),
    height: TOP_BAR_HEIGHT + helpers.getStatusBarHeight(),
  },

  topBarDisplayTitleWrapper: {
    marginTop: Spacing.SCALE_8,
    marginBottom: Spacing.SCALE_16,
    marginHorizontal: Spacing.SCALE_16,
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
    marginTop: Spacing.SCALE_32,
    marginBottom: Spacing.SCALE_28,
  },

  confirmationModalLeftBtn: {
    minWidth: 120,
    marginRight: Spacing.SCALE_8,
  },
}

export const CAROUSEL_WIDTH = 312
export const WIDE_ASPECT_RATIO = 16 / 9

export const PRODUCT_CARD_WIDTH = (WINDOW_WIDTH - Spacing.SCALE_32 - Spacing.SCALE_8) / 2 // split into 2 columns and 8 spacing
export const HORIZONTAL_PRODUCT_CARD_ITEM_WIDTH = (WINDOW_WIDTH - Spacing.SCALE_32 - Spacing.SCALE_8) / 2.1

export const CATEGORY_PRODUCT_TYPE_WIDTH = (WINDOW_WIDTH * 0.75 - Spacing.SCALE_8 - Spacing.SCALE_32) / 3
