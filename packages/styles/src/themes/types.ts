import { FixedLengthArray } from "type-fest";

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type ColorSchemes<C, L, D> = {
    common?: Partial<C>;
    light: Partial<L>;
    dark: Partial<D>;
};
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export type SpaceValues = FixedLengthArray<string, 13>;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
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
};
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export type FontWeightValues = FixedLengthArray<number, 9>;

export type LineHeightValues = FixedLengthArray<number, 6>;

export type BorderWidthValues = FixedLengthArray<string, 5>;

export type BoxShadowValues = FixedLengthArray<string, 4>;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type BoxShadowRoles = {
    "alias-skim": string;
    "alias-lifted": string;
    "alias-raised": string;
    "alias-floating": string;
};
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export type BorderRadiusValues = FixedLengthArray<string, 4>;

export type ZIndexValues = FixedLengthArray<number, 5>;

export type ColorPalette = FixedLengthArray<string, 10>;

/* eslint-disable @typescript-eslint/consistent-type-definitions */
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
};
/* eslint-enable @typescript-eslint/consistent-type-definitions */

/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type ColorRoles = {
    /* Background */
    "alias-bg-1": string;
    "alias-bg-1-hover": string;
    "alias-bg-1-active": string;
    "alias-bg-2": string;
    "alias-bg-2-hover": string;
    "alias-bg-2-active": string;
    "alias-bg-3": string;
    "alias-bg-4": string;
    "alias-bg-4-hover": string;
    "alias-bg-4-active": string;
    "alias-bg-5": string;
    "alias-bg-5-hover": string;
    "alias-bg-5-active": string;
    "alias-bg-6": string;
    "alias-bg-6-hover": string;
    "alias-bg-6-active": string;
    "alias-bg-primary-1": string;
    "alias-bg-primary-1-hover": string;
    "alias-bg-primary-1-active": string;
    "alias-bg-primary-1-focus": string;
    "alias-bg-primary-2": string;
    "alias-bg-negative-1": string;
    "alias-bg-negative-1-hover": string;
    "alias-bg-negative-1-active": string;
    "alias-bg-negative-2": string;
    "alias-bg-warning-1": string;
    "alias-bg-warning-1-hover": string;
    "alias-bg-warning-1-active": string;
    "alias-bg-warning-2": string;
    "alias-bg-positive-1": string;
    "alias-bg-positive-1-hover": string;
    "alias-bg-positive-1-active": string;
    "alias-bg-positive-2": string;
    "alias-bg-info-1": string;
    "alias-bg-info-1-hover": string;
    "alias-bg-info-active": string;
    /* Border */
    "alias-b-1": string;
    "alias-b-1-hover": string;
    "alias-b-1-active": string;
    "alias-b-2": string;
    "alias-b-3": string;
    "alias-b-3-hover": string;
    "alias-b-3-active": string;
    "alias-b-4": string;
    "alias-b-4-hover": string;
    "alias-b-primary-1": string;
    "alias-b-primary-1-hover": string;
    "alias-b-primary-1-active": string;
    "alias-b-primary-1-translucent": string;
    "alias-b-negative-1": string;
    "alias-b-negative-1-hover": string;
    "alias-b-negative-1-active": string;
    "alias-b-negative-1-translucent": string;
    "alias-b-negative-2": string;
    "alias-b-warning-1": string;
    "alias-b-warning-1-hover": string;
    "alias-b-warning-1-active": string;
    "alias-b-positive-1": string;
    "alias-b-positive-1-hover": string;
    "alias-b-positive-1-active": string;
    /* Icon */
    "alias-icon-1": string;
    "alias-icon-2": string;
    "alias-icon-primary-1": string;
    "alias-icon-negative-1": string;
    "alias-icon-negative-2": string;
    "alias-icon-positive-1": string;
    "alias-icon-positive-2": string;
    "alias-icon-warning-1": string;
    "alias-icon-warning-2": string;
    "alias-icon-info-1": string;
    /* Text */
    "alias-text-1": string;
    "alias-text-1-hover": string;
    "alias-text-1-active": string;
    "alias-text-2": string;
    "alias-text-2-hover": string;
    "alias-text-2-active": string;
    "alias-text-3": string;
    "alias-text-3-hover": string;
    "alias-text-3-active": string;
    "alias-text-4": string;
    "alias-text-primary-1": string;
    "alias-text-primary-1-hover": string;
    "alias-text-primary-1-active": string;
    "alias-text-negative-1": string;
    "alias-text-negative-1-hover": string;
    "alias-text-negative-1-active": string;
    "alias-text-negative-2": string;
    "alias-text-info-1": string;
    "alias-text-info-1-hover": string;
    "alias-text-info-1-active": string;
    "alias-text-positive-1": string;
    "alias-text-positive-1-hover": string;
    "alias-text-positive-1-active": string;
    "alias-text-positive-2": string;
    "alias-text-warning-1": string;
    "alias-text-warning-1-hover": string;
    "alias-text-warning-1-active": string;
    "alias-text-warning-2": string;
    "alias-text-input-selection": string;
    "alias-text-input-placeholder": string;
};
/* eslint-enable @typescript-eslint/consistent-type-definitions */

export interface OrbitTheme {
    name: string;
    space: SpaceValues;
    fontSizes: FontSizeValues;
    fontWeights: FontWeightValues;
    lineHeights: LineHeightValues;
    borderWidths: BorderWidthValues;
    borderRadii: BorderRadiusValues;
    boxShadows: BoxShadowValues & BoxShadowRoles | ColorSchemes<BoxShadowRoles, BoxShadowValues, BoxShadowValues>;
    zIndices: ZIndexValues;
    colors: ColorPalettes & ColorRoles | ColorSchemes<ColorPalettes, ColorRoles, ColorRoles>;
}
