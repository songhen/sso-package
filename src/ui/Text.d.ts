import React from 'react';
import { TextProps } from 'react-native';
import { WithTranslation } from 'react-i18next';
import { FontWeightType } from '../themes/typography';
import type { FontVariantType, SupportedLocale } from '../themes/typography';
export interface MyTextProps extends TextProps {
    animated?: boolean;
    /**
     * 10px, 12px, 14px, 16px, 18px, 20px, 22px, 28px
     */
    variant?: FontVariantType;
    weight?: FontWeightType;
    align?: 'left' | 'center' | 'right';
    transform?: 'capitalize' | 'uppercase' | 'lowercase' | 'none';
    decorationLine?: 'underline' | 'line-through' | 'none';
    colorScaling?: '100' | '80' | '60' | '40' | '20' | '10';
    color?: 'dark' | 'white' | 'primary' | 'secondary' | 'positive' | 'negative' | 'warning' | 'inactive' | 'orange';
    overrideLocale?: SupportedLocale;
}
declare const WithTranslationText: React.ComponentType<Omit<import("react-i18next/helpers").$Subtract<MyTextProps & WithTranslation<undefined, undefined>, import("react-i18next").WithTranslationProps>, keyof WithTranslation<Ns, undefined>> & import("react-i18next").WithTranslationProps>;
export { WithTranslationText as Text };
export default WithTranslationText;
