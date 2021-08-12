import { FixedLengthArray } from "type-fest";

export type ColorSchemes<C, L, D> = {
    common?: Partial<C>;
    light: Partial<L>;
    dark: Partial<D>;
}

export type SpaceValues = FixedLengthArray<string, 13>;

export type FontSizeValues = {
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
    "bg-1": string;
    "bg-1-hover": string;
    "bg-1-active": string;
    "bg-2": string;
    "bg-2-hover": string;
    "bg-2-active": string;
    "bg-3": string;
    "bg-4": string;
    "bg-4-hover": string;
    "bg-4-active": string;
    "bg-5": string;
    "bg-5-hover": string;
    "bg-5-active": string;
    "bg-6": string;
    "bg-6-hover": string;
    "bg-6-active": string;
    "bg-primary-1": string;
    "bg-primary-1-hover": string;
    "bg-primary-1-active": string;
    "bg-primary-1-focus": string;
    "bg-primary-2": string;
    "bg-negative-1": string;
    "bg-negative-1-hover": string;
    "bg-negative-1-active": string;
    "bg-negative-2": string;
    "bg-warning-1": string;
    "bg-warning-1-hover": string;
    "bg-warning-1-active": string;
    "bg-warning-2": string;
    "bg-positive-1": string;
    "bg-positive-1-hover": string;
    "bg-positive-1-active": string;
    "bg-positive-2": string;
    "bg-info-1": string;
    "bg-info-1-hover": string;
    "bg-info-active": string;
    /* Border */
    "b-1": string;
    "b-1-hover": string;
    "b-1-active": string;
    "b-2": string;
    "b-3": string;
    "b-3-hover": string;
    "b-3-active": string;
    "b-4": string;
    "b-4-hover": string;
    "b-primary-1": string;
    "b-primary-1-hover": string;
    "b-primary-1-active": string;
    "b-primary-1-translucent": string;
    "b-negative-1": string;
    "b-negative-1-hover": string;
    "b-negative-1-active": string;
    "b-negative-1-translucent": string;
    "b-negative-2": string;
    "b-warning-1": string;
    "b-warning-1-hover": string;
    "b-warning-1-active": string;
    "b-positive-1": string;
    "b-positive-1-hover": string;
    "b-positive-1-active": string;
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
