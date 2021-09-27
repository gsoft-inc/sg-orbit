import { FixedLengthArray } from "type-fest";

export interface ColorSchemes<C, L, D> {
    common?: Partial<C>;
    light: Partial<L>;
    dark: Partial<D>;
}

export type SpaceValues = FixedLengthArray<string, 13>;

export interface FontSizeValues {
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    "subheadline": string;
    "headline": string;
}

export type FontWeightValues = FixedLengthArray<string, 3>;

export type LineHeightValues = FixedLengthArray<number, 6>;

export type BoxShadowValues = FixedLengthArray<string, 4>;

export interface BoxShadowAliases {
    "alias-skim": string;
    "alias-lifted": string;
    "alias-raised": string;
    "alias-floating": string;
}

export type BorderRadiusValues = FixedLengthArray<string, 4>;

export type BoxShadowColorSchemes = ColorSchemes<BoxShadowAliases, BoxShadowValues, BoxShadowValues>;

export type ColorPalette = FixedLengthArray<string, 10>;

export interface ColorPalettes {
    "white": string;
    "black": string;
    "marine": ColorPalette;
    "sunray": ColorPalette;
    "moonstone": ColorPalette;
    "cloud": ColorPalette;
    "neutral": ColorPalette;
    "neutral-dark": ColorPalette;
    "beetle": ColorPalette;
    "botanic": ColorPalette;
    "primary": ColorPalette;
}

export interface ColorAliases {
    /* Background */
    "bg-alias-1": string;
    "bg-alias-1-hover": string;
    "bg-alias-1-active": string;
    "bg-alias-2": string;
    "bg-alias-2-hover": string;
    "bg-alias-2-active": string;
    "bg-alias-3": string;
    "bg-alias-4": string;
    "bg-alias-4-hover": string;
    "bg-alias-4-active": string;
    "bg-alias-5": string;
    "bg-alias-5-hover": string;
    "bg-alias-5-active": string;
    "bg-alias-6": string;
    "bg-alias-6-hover": string;
    "bg-alias-6-active": string;
    "bg-alias-primary-1": string;
    "bg-alias-primary-1-hover": string;
    "bg-alias-primary-1-active": string;
    "bg-alias-primary-1-focus": string;
    "bg-alias-primary-2": string;
    "bg-alias-negative-1": string;
    "bg-alias-negative-1-hover": string;
    "bg-alias-negative-1-active": string;
    "bg-alias-negative-2": string;
    "bg-alias-warning-1": string;
    "bg-alias-warning-1-hover": string;
    "bg-alias-warning-1-active": string;
    "bg-alias-warning-2": string;
    "bg-alias-positive-1": string;
    "bg-alias-positive-1-hover": string;
    "bg-alias-positive-1-active": string;
    "bg-alias-positive-2": string;
    "bg-alias-info-1": string;
    "bg-alias-info-1-hover": string;
    "bg-alias-info-active": string;
    "bg-alias-input-selection": string;
    /* Border */
    "b-alias-1": string;
    "b-alias-1-hover": string;
    "b-alias-1-active": string;
    "b-alias-2": string;
    "b-alias-3": string;
    "b-alias-3-hover": string;
    "b-alias-3-active": string;
    "b-alias-4": string;
    "b-alias-4-hover": string;
    "b-alias-primary-1": string;
    "b-alias-primary-1-hover": string;
    "b-alias-primary-1-active": string;
    "b-alias-primary-1-translucent": string;
    "b-alias-negative-1": string;
    "b-alias-negative-1-hover": string;
    "b-alias-negative-1-active": string;
    "b-alias-negative-1-translucent": string;
    "b-alias-negative-2": string;
    "b-alias-warning-1": string;
    "b-alias-warning-1-hover": string;
    "b-alias-warning-1-active": string;
    "b-alias-positive-1": string;
    "b-alias-positive-1-hover": string;
    "b-alias-positive-1-active": string;
    /* Icon */
    "icon-alias-1": string;
    "icon-alias-2": string;
    "icon-alias-primary-1": string;
    "icon-alias-negative-1": string;
    "icon-alias-negative-2": string;
    "icon-alias-positive-1": string;
    "icon-alias-positive-2": string;
    "icon-alias-warning-1": string;
    "icon-alias-warning-2": string;
    "icon-alias-info-1": string;
    /* Text */
    "text-alias-1": string;
    "text-alias-1-hover": string;
    "text-alias-1-active": string;
    "text-alias-2": string;
    "text-alias-2-hover": string;
    "text-alias-2-active": string;
    "text-alias-3": string;
    "text-alias-3-hover": string;
    "text-alias-3-active": string;
    "text-alias-4": string;
    "text-alias-primary-1": string;
    "text-alias-primary-1-hover": string;
    "text-alias-primary-1-active": string;
    "text-alias-negative-1": string;
    "text-alias-negative-1-hover": string;
    "text-alias-negative-1-active": string;
    "text-alias-negative-2": string;
    "text-alias-info-1": string;
    "text-alias-info-1-hover": string;
    "text-alias-info-1-active": string;
    "text-alias-positive-1": string;
    "text-alias-positive-1-hover": string;
    "text-alias-positive-1-active": string;
    "text-alias-positive-2": string;
    "text-alias-warning-1": string;
    "text-alias-warning-1-hover": string;
    "text-alias-warning-1-active": string;
    "text-alias-warning-2": string;
    "text-alias-input-selection": string;
    "text-alias-input-placeholder": string;
}

export type ColorColorSchemes = ColorSchemes<ColorPalettes, ColorAliases, ColorAliases>;

export interface OrbitTheme {
    name: string;
    space: SpaceValues;
    fontSizes: FontSizeValues;
    fontWeights: FontWeightValues;
    lineHeights: LineHeightValues;
    borderRadii: BorderRadiusValues;
    boxShadows: BoxShadowColorSchemes;
    colors: ColorColorSchemes;
}
