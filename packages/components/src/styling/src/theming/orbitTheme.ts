import { ConditionalKeys, FixedLengthArray } from "type-fest";
import { Property } from "csstype";
import type { ColorExpressionTypes } from "../styled-system";

export interface ColorSchemeSection<C, L, D> {
    common?: Partial<C>;
    light: Partial<L>;
    dark: Partial<D>;
}

export type SpaceValues = FixedLengthArray<string, 13>;

export type SizingValues = FixedLengthArray<string, 18>;

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

export type BoxShadowColorSchemes = ColorSchemeSection<BoxShadowAliases, BoxShadowValues, BoxShadowValues>;

export type ColorPalette = FixedLengthArray<string, 10>;

export interface ColorPaletteSection {
    "white": string;
    "black": string;
    "gray": string;
    "purple": ColorPalette;
    "green": ColorPalette;
    "alert": ColorPalette;
    "warning": ColorPalette;
    "success": ColorPalette;
    "neutral": ColorPalette;
    "orange": ColorPalette;
    "primary": ColorPalette;
}

type AliasValue =
    `$${ConditionalKeys<ColorPaletteSection, ColorPalette>}-${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10}` | // any color in palette $primary-5
    `$${ConditionalKeys<ColorPaletteSection, string>}` | // any static colors $white $black
    `${typeof ColorExpressionTypes[number]}${string}` | // strings starting with hsl(a), rgb(a), #
    Property.Color; // basic colors

export interface ColorAliases {
    /* Background */
    "bg-alias-default": AliasValue;
    "bg-alias-side-nav": AliasValue;
    "bg-alias-hard-break": AliasValue;
    "bg-alias-soft-break": AliasValue;
    "bg-alias-basic": AliasValue;
    "bg-alias-basic-hover": AliasValue;
    "bg-alias-basic-active": AliasValue;
    "bg-alias-basic-transparent": AliasValue;
    "bg-alias-basic-transparent-hover": AliasValue;
    "bg-alias-basic-transparent-active": AliasValue;
    "bg-alias-static-white": AliasValue;
    "bg-alias-grey-hover": AliasValue;
    "bg-alias-grey-active": AliasValue;
    "bg-alias-accent": AliasValue;
    "bg-alias-accent-hover": AliasValue;
    "bg-alias-accent-active": AliasValue;
    "bg-alias-accent-faint": AliasValue;
    "bg-alias-accent-light": AliasValue;
    "bg-alias-accent-transparent": AliasValue;
    "bg-alias-accent-transparent-hover": AliasValue;
    "bg-alias-accent-transparent-active": AliasValue;
    "bg-alias-alert": AliasValue;
    "bg-alias-alert-hover": AliasValue;
    "bg-alias-alert-active": AliasValue;
    "bg-alias-alert-faint": AliasValue;
    "bg-alias-alert-light": AliasValue;
    "bg-alias-alert-transparent": AliasValue;
    "bg-alias-alert-transparent-hover": AliasValue;
    "bg-alias-alert-transparent-active": AliasValue;
    "bg-alias-warning": AliasValue;
    "bg-alias-warning-hover": AliasValue;
    "bg-alias-warning-active": AliasValue;
    "bg-alias-warning-faint": AliasValue;
    "bg-alias-warning-light": AliasValue;
    "bg-alias-success": AliasValue;
    "bg-alias-success-hover": AliasValue;
    "bg-alias-success-active": AliasValue;
    "bg-alias-success-faint": AliasValue;
    "bg-alias-success-light": AliasValue;
    "bg-alias-transparent": AliasValue;
    "bg-alias-input-selection": AliasValue;
    /* Border */
    "b-alias-low-contrast": AliasValue;
    "b-alias-mid-contrast": AliasValue;
    "b-alias-high-contrast": AliasValue;
    "b-alias-accent": AliasValue;
    "b-alias-accent-hover": AliasValue;
    "b-alias-accent-active": AliasValue;
    "b-alias-alert": AliasValue;
    "b-alias-alert-hover": AliasValue;
    "b-alias-alert-active": AliasValue;
    "b-alias-warning": AliasValue;
    "b-alias-warning-hover": AliasValue;
    "b-alias-warning-active": AliasValue;
    "b-alias-success": AliasValue;
    "b-alias-success-hover": AliasValue;
    "b-alias-success-active": AliasValue;
    /* Icon */
    "icon-alias-primary": AliasValue;
    "icon-alias-primary-hover": AliasValue;
    "icon-alias-secondary": AliasValue;
    "icon-alias-tertiary": AliasValue;
    "icon-alias-inactive": AliasValue;
    "icon-alias-accent": AliasValue;
    "icon-alias-accent-hover": AliasValue;
    "icon-alias-alert": AliasValue;
    "icon-alias-alert-hover": AliasValue;
    "icon-alias-warning": AliasValue;
    "icon-alias-success": AliasValue;
    "icon-alias-static-white": AliasValue;
    "icon-alias-static-black": AliasValue;
    /* Text */
    "text-alias-primary": AliasValue;
    "text-alias-primary-hover": AliasValue;
    "text-alias-secondary": AliasValue;
    "text-alias-tertiary": AliasValue;
    "text-alias-inactive": AliasValue;
    "text-alias-accent": AliasValue;
    "text-alias-accent-hover": AliasValue;
    "text-alias-alert": AliasValue;
    "text-alias-alert-hover": AliasValue;
    "text-alias-warning": AliasValue;
    "text-alias-success": AliasValue;
    "text-alias-static-white": AliasValue;
    "text-alias-static-black": AliasValue;
}

export type ColorColorSchemes = ColorSchemeSection<ColorPaletteSection, ColorAliases, ColorAliases>;

export interface OrbitTheme {
    name: string;
    sizing: SizingValues;
    space: SpaceValues;
    fontSizes: FontSizeValues;
    fontWeights: FontWeightValues;
    lineHeights: LineHeightValues;
    borderRadii: BorderRadiusValues;
    boxShadows: BoxShadowColorSchemes;
    colors: ColorColorSchemes;
}
