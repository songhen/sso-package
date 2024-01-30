export declare const SupportedLocales: {
    readonly EN: "en";
    readonly KH: "km";
    readonly CN: "cn";
};
export type SupportedLocale = (typeof SupportedLocales)[keyof typeof SupportedLocales];
export declare const FontFamily: {
    en: string;
    km: string;
    cn: string;
};
export declare const AndroidFontFamily: Record<SupportedLocale, Record<FontWeightType, string>>;
export declare enum FontSize {
    caption = 10,
    caption2 = 12,
    body = 14,
    subtitle = 16,
    title = 18,
    title2 = 20,
    headline = 22,
    headline2 = 24,
    display = 28
}
export declare enum FontWeight {
    thin = "100",
    light = "200",
    normal = "normal",
    regular = "400",
    medium = "500",
    semiBold = "600",
    bold = "bold",
    extraBold = "800",
    black = "900"
}
export declare enum AndroidFontWeight {
    thin = "Gotham-Thin",
    light = "Gotham-Light",
    normal = "Gotham-Book",
    regular = "Gotham-Book",
    medium = "Gotham-Medium",
    semiBold = "Gotham-Medium",
    bold = "Gotham-Bold",
    extraBold = "Gotham-Black",
    black = "Gotham-Black"
}
export declare enum FontVariant {
    /**
     * 10px
     */
    caption = "caption",
    /**
     * 12px
     */
    caption2 = "caption2",
    /**
     * 14px
     */
    body = "body",
    /**
     * 16px
     */
    subtitle = "subtitle",
    /**
     * 18px
     */
    title = "title",
    /**
     * 20px
     */
    title2 = "title2",
    /**
     * 22px
     */
    headline = "headline",
    /**
     * 24px
     */
    headline2 = "headline2",
    /**
     * 28px
     */
    display = "display"
}
export type FontVariantType = keyof typeof FontVariant;
export declare enum FontWeightVariant {
    thin = "thin",
    light = "light",
    normal = "normal",
    regular = "regular",
    medium = "medium",
    semiBold = "semiBold",
    bold = "bold",
    extraBold = "extraBold",
    black = "black"
}
export type FontWeightType = keyof typeof FontWeight;
export declare const fontFamilyAndWeightByPlatform: (weight: FontWeightType, language: SupportedLocale) => {
    fontWeight: FontWeight;
    fontFamily: string;
} | {
    fontFamily: string;
    fontWeight?: undefined;
} | {
    fontWeight: FontWeight;
    fontFamily: string;
} | {
    fontWeight: FontWeight;
    fontFamily: string;
} | {
    fontWeight: FontWeight;
    fontFamily: string;
};
