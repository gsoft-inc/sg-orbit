import { FixedLengthArray } from "type-fest";

export type ColorSchemes<C, L, D> = {
    common?: Partial<C>;
    light: Partial<L>;
    dark: Partial<D>;
}

export type SpaceValues = FixedLengthArray<string, 13>;

export type FontSizeValues = {
    "1": string;
    "2": string;
    "3": string;
    "4": string;
    "5": string;
    "6": string;
    "7": string;
    "8": string;
    "9": string;
    "subheadline": string;
    "headline": string;
}

export type FontWeightValues = FixedLengthArray<number, 9>;

export type LineHeightValues = FixedLengthArray<number, 6>;

export type BorderWidthValues = FixedLengthArray<string, 5>;

export type BoxShadowValues = FixedLengthArray<string, 4>;

export type BoxShadowRoles = {
    "skim": string;
    "lifted": string;
    "raised": string;
    "floating": string;
}

export type BorderRadiusValues = FixedLengthArray<string, 4>;

export type ZIndexValues = FixedLengthArray<number, 5>;

export type ColorPalette = FixedLengthArray<string, 10>;

export type ColorPalettes = {
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

export type ColorRoles = {
    /* Background */
    "background-1": string;
    "background-1-hover": string;
    "background-1-active": string;
    "background-2": string;
    "background-2-hover": string;
    "background-2-active": string;
    "background-3": string;
    "background-4": string;
    "background-4-hover": string;
    "background-4-active": string;
    "background-5": string;
    "background-5-hover": string;
    "background-5-active": string;
    "background-6": string;
    "background-6-hover": string;
    "background-6-active": string;
    "background-primary-1": string;
    "background-primary-1-hover": string;
    "background-primary-1-active": string;
    "background-primary-1-focus": string;
    "background-primary-2": string;
    "background-negative-1": string;
    "background-negative-1-hover": string;
    "background-negative-1-active": string;
    "background-negative-2": string;
    "background-warning-1": string;
    "background-warning-1-hover": string;
    "background-warning-1-active": string;
    "background-warning-2": string;
    "background-positive-1": string;
    "background-positive-1-hover": string;
    "background-positive-1-active": string;
    "background-positive-2": string;
    "background-info-1": string;
    "background-info-1-hover": string;
    "background-info-active": string;
    /* Border */
    "border-1": string;
    "border-1-hover": string;
    "border-1-active": string;
    "border-2": string;
    "border-3": string;
    "border-3-hover": string;
    "border-3-active": string;
    "border-4": string;
    "border-4-hover": string;
    "border-primary-1": string;
    "border-primary-1-hover": string;
    "border-primary-1-active": string;
    "border-primary-1-translucent": string;
    "border-negative-1": string;
    "border-negative-1-hover": string;
    "border-negative-1-active": string;
    "border-negative-1-translucent": string;
    "border-negative-2": string;
    "border-warning-1": string;
    "border-warning-1-hover": string;
    "border-warning-1-active": string;
    "border-positive-1": string;
    "border-positive-1-hover": string;
    "border-positive-1-active": string;
    /* Icon */
    "icon-1": string;
    "icon-2": string;
    "icon-primary-1": string;
    "icon-negative-1": string;
    "icon-negative-2": string;
    "icon-positive-1": string;
    "icon-positive-2": string;
    "icon-warning-1": string;
    "icon-warning-2": string;
    "icon-info-1": string;
    /* Text */
    "text-1": string;
    "text-1-hover": string;
    "text-1-active": string;
    "text-2": string;
    "text-2-hover": string;
    "text-2-active": string;
    "text-3": string;
    "text-3-hover": string;
    "text-3-active": string;
    "text-4": string;
    "text-primary-1": string;
    "text-primary-1-hover": string;
    "text-primary-1-active": string;
    "text-negative-1": string;
    "text-negative-1-hover": string;
    "text-negative-1-active": string;
    "text-negative-2": string;
    "text-info-1": string;
    "text-info-1-hover": string;
    "text-info-1-active": string;
    "text-positive-1": string;
    "text-positive-1-hover": string;
    "text-positive-1-active": string;
    "text-positive-2": string;
    "text-warning-1": string;
    "text-warning-1-hover": string;
    "text-warning-1-active": string;
    "text-warning-2": string;
    "text-input-selection": string;
    "text-input-placeholder": string;
}

export interface OrbitTheme {
    name: string;
    space: SpaceValues;
    fontSizes: FontSizeValues;
    fontWeights: FontWeightValues;
    lineHeights: LineHeightValues;
    borderWidths: BorderWidthValues;
    borderRadii: BorderRadiusValues;
    boxShadows: BoxShadowValues | ColorSchemes<BoxShadowRoles, BoxShadowValues, BoxShadowValues>;
    zIndices: ZIndexValues;
    colors: ColorPalettes | ColorSchemes<ColorPalettes, ColorRoles, ColorRoles>;
}
