import { Platform } from 'react-native'

export const SupportedLocales = {
  EN: 'en',
  KH: 'km',
  CN: 'cn',
} as const

export type SupportedLocale = (typeof SupportedLocales)[keyof typeof SupportedLocales]

// FONT FAMILY
export const FontFamily = {
  [SupportedLocales.EN]: 'Gotham',
  [SupportedLocales.KH]: 'Kantumruy Pro',
  [SupportedLocales.CN]: 'Gotham',
}

// ANDROID FONT FAMILY
export const AndroidFontFamily: Record<SupportedLocale, Record<FontWeightType, string>> = {
  [SupportedLocales.EN]: {
    thin: 'Gotham-Thin',
    light: 'Gotham-Light',
    normal: 'Gotham-Book',
    regular: 'Gotham-Book',
    medium: 'Gotham-Medium',
    semiBold: 'Gotham-Medium',
    bold: 'Gotham-Bold',
    extraBold: 'Gotham-Black',
    black: 'Gotham-Black',
  },
  [SupportedLocales.KH]: {
    thin: 'KantumruyPro-Thin',
    light: 'KantumruyPro-Light',
    normal: 'KantumruyPro',
    regular: 'KantumruyPro',
    medium: 'KantumruyPro-Medium',
    semiBold: 'KantumruyPro-SemiBold',
    bold: 'Gotham-Bold',
    extraBold: 'Gotham-Bold',
    black: 'Gotham-Bold',
  },
  [SupportedLocales.CN]: {
    thin: 'Gotham-Thin',
    light: 'Gotham-Light',
    normal: 'Gotham-Book',
    regular: 'Gotham-Book',
    medium: 'Gotham-Medium',
    semiBold: 'Gotham-Medium',
    bold: 'Gotham-Bold',
    extraBold: 'Gotham-Black',
    black: 'Gotham-Black',
  },
} as const

// FONT SIZE
export enum FontSize {
  caption = 10,
  caption2 = 12,
  body = 14,
  subtitle = 16,
  title = 18,
  title2 = 20,
  headline = 22,
  headline2 = 24,
  display = 28,
}

// FONT WEIGHT
export enum FontWeight {
  thin = '100',
  light = '200',
  normal = 'normal',
  regular = '400',
  medium = '500',
  semiBold = '600',
  bold = 'bold',
  extraBold = '800',
  black = '900',
}

// ANDROID FONT WEIGHT
export enum AndroidFontWeight {
  thin = 'Gotham-Thin',
  light = 'Gotham-Light',
  normal = 'Gotham-Book',
  regular = 'Gotham-Book',
  medium = 'Gotham-Medium',
  semiBold = 'Gotham-Medium',
  bold = 'Gotham-Bold',
  extraBold = 'Gotham-Black',
  black = 'Gotham-Black',
}

export enum FontVariant {
  /**
   * 10px
   */
  caption = 'caption',
  /**
   * 12px
   */
  caption2 = 'caption2',
  /**
   * 14px
   */
  body = 'body',
  /**
   * 16px
   */
  subtitle = 'subtitle',
  /**
   * 18px
   */
  title = 'title',
  /**
   * 20px
   */
  title2 = 'title2',
  /**
   * 22px
   */
  headline = 'headline',
  /**
   * 24px
   */
  headline2 = 'headline2',
  /**
   * 28px
   */
  display = 'display',
}

export type FontVariantType = keyof typeof FontVariant

export enum FontWeightVariant {
  thin = 'thin',
  light = 'light',
  normal = 'normal',
  regular = 'regular',
  medium = 'medium',
  semiBold = 'semiBold',
  bold = 'bold',
  extraBold = 'extraBold',
  black = 'black',
}

export type FontWeightType = keyof typeof FontWeight

export const fontFamilyAndWeightByPlatform = (weight: FontWeightType, language: SupportedLocale) => {
  /**
   *
   * is IOS return font weight and font family
   * is Android return font family
   */

  const fontWeightByPlatform = {
    ios: {
      fontWeight: FontWeight[weight],
      fontFamily: FontFamily[language],
    },
    android: {
      fontFamily: AndroidFontFamily[language][weight],
    },
    macos: {
      fontWeight: FontWeight[weight],
      fontFamily: FontFamily[language],
    },
    windows: {
      fontWeight: FontWeight[weight],
      fontFamily: FontFamily[language],
    },
    web: {
      fontWeight: FontWeight[weight],
      fontFamily: FontFamily[language],
    },
  }[Platform.OS]

  return fontWeightByPlatform
}
