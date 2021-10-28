import { FixedLengthArray } from "type-fest";

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

export interface ColorAliases {
    /* Background */
    "bg-alias-default": string;
    "bg-alias-side-nav": string;
    "bg-alias-hard-break": string;
    "bg-alias-soft-break": string;
    "bg-alias-grey-hover": string;
    "bg-alias-grey-active": string;
    "bg-alias-accent": string;
    "bg-alias-accent-hover": string;
    "bg-alias-accent-active": string;
    "bg-alias-accent-faint": string;
    "bg-alias-accent-light": string;
    "bg-alias-alert": string;
    "bg-alias-alert-hover": string;
    "bg-alias-alert-active": string;
    "bg-alias-alert-faint": string;
    "bg-alias-alert-light": string;
    "bg-alias-warning": string;
    "bg-alias-warning-hover": string;
    "bg-alias-warning-active": string;
    "bg-alias-warning-faint": string;
    "bg-alias-warning-light": string;
    "bg-alias-success": string;
    "bg-alias-success-hover": string;
    "bg-alias-success-active": string;
    "bg-alias-success-faint": string;
    "bg-alias-success-light": string;
    "bg-alias-transparent": string;
    /* Border */
    "b-alias-low-contrast": string;
    "b-alias-mid-contrast": string;
    "b-alias-high-contrast": string;
    "b-alias-accent": string;
    "b-alias-accent-hover": string;
    "b-alias-accent-active": string;
    "b-alias-alert": string;
    "b-alias-alert-hover": string;
    "b-alias-alert-active": string;
    "b-alias-warning": string;
    "b-alias-warning-hover": string;
    "b-alias-warning-active": string;
    "b-alias-success": string;
    "b-alias-success-hover": string;
    "b-alias-success-active": string;
    /* Icon */
    "icon-alias-primary": string;
    "icon-alias-secondary": string;
    "icon-alias-tertiary": string;
    "icon-alias-inactive": string;
    "icon-alias-accent": string;
    "icon-alias-alert": string;
    "icon-alias-warning": string;
    "icon-alias-success": string;
    "icon-alias-static-white": string;
    "icon-alias-static-black": string;
    /* Text */
    "text-alias-primary": string;
    "text-alias-secondary": string;
    "text-alias-tertiary": string;
    "text-alias-inactive": string;
    "text-alias-accent": string;
    "text-alias-alert": string;
    "text-alias-warning": string;
    "text-alias-success": string;
    "text-alias-static-white": string;
    "text-alias-static-black": string;
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
