import React from 'react'
import { Animated, Text as RNText, TextProps } from 'react-native'
import { withTranslation, WithTranslation } from 'react-i18next'

import {
  FontSize,
  FontVariant,
  FontWeightType,
  FontWeightVariant,
  fontFamilyAndWeightByPlatform,
} from '../themes/typography'
import type { FontVariantType, SupportedLocale } from '../themes/typography'

import { Colors, createStyles } from '../themes'

export interface MyTextProps extends TextProps {
  animated?: boolean
  /**
   * 10px, 12px, 14px, 16px, 18px, 20px, 22px, 28px
   */
  variant?: FontVariantType
  weight?: FontWeightType
  align?: 'left' | 'center' | 'right'
  transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none'
  decorationLine?: 'underline' | 'line-through' | 'none'
  colorScaling?: '100' | '80' | '60' | '40' | '20' | '10'
  color?:
    | 'dark'
    | 'white'
    | 'primary'
    | 'secondary'
    | 'positive'
    | 'negative'
    | 'warning'
    | 'inactive'
    | 'orange'
  overrideLocale?: SupportedLocale
}

const MyText = ({
  children,
  animated,
  variant = FontVariant.body,
  weight = FontWeightVariant.medium,
  color = 'dark',
  colorScaling = '100',
  transform = 'none',
  decorationLine = 'none',
  align = 'left',
  i18n,
  ...props
}: MyTextProps & WithTranslation) => {
  const locale = (props.overrideLocale || i18n.language) as SupportedLocale
  const TextComponent = animated ? Animated.Text : RNText
  const colorKey = `${color.toUpperCase()}_${colorScaling}` as keyof typeof Colors
  const textColor = { color: Colors[colorKey] }
  const textTransform = { textTransform: transform }
  const textDecorationLine = { textDecorationLine: decorationLine }
  const textAlign = { textAlign: align }

  return (
    <TextComponent
      {...props}
      allowFontScaling={false}
      maxFontSizeMultiplier={1}
      minimumFontScale={1}
      style={[
        styles[variant],
        textColor,
        textAlign,
        textTransform,
        textDecorationLine,
        fontFamilyAndWeightByPlatform(weight, locale), // this includes fontWeight and fontFamily
        props.style,
      ]}
    >
      {children}
    </TextComponent>
  )
}

const WithTranslationText = withTranslation()(MyText)

const styles = createStyles({
  // font size variants
  [FontVariant.caption]: {
    fontSize: FontSize.caption,
  },
  [FontVariant.caption2]: {
    fontSize: FontSize.caption2,
  },
  [FontVariant.body]: {
    fontSize: FontSize.body,
  },
  [FontVariant.subtitle]: {
    fontSize: FontSize.subtitle,
  },
  [FontVariant.title]: {
    fontSize: FontSize.title,
  },
  [FontVariant.title2]: {
    fontSize: FontSize.title2,
  },
  [FontVariant.headline]: {
    fontSize: FontSize.headline,
  },
  [FontVariant.headline2]: {
    fontSize: FontSize.headline2,
  },
  [FontVariant.display]: {
    fontSize: FontSize.display,
  },
})

export { WithTranslationText as Text }

export default WithTranslationText
