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
    "b-low-contrast": string;
    "b-mid-contrast": string;
    "b-high-contrast": string;
    "b-accent": string;
    "b-accent-hover": string;
    "b-accent-active": string;
    "b-alert": string;
    "b-alert-hover": string;
    "b-alert-active": string;
    "b-warning": string;
    "b-warning-hover": string;
    "b-warning-active": string;
    "b-success": string;
    "b-success-hover": string;
    "b-success-active": string;
    /* Icon */
    "icon-primary": string;
    "icon-secondary": string;
    "icon-tertiary": string;
    "icon-inactive": string;
    "icon-accent": string;
    "icon-alert": string;
    "icon-warning": string;
    "icon-success": string;
    "icon-static-white": string;
    "icon-static-black": string;
    /* Text */
    "text-primary": string;
    "text-secondary": string;
    "text-tertiary": string;
    "text-inactive": string;
    "text-accent": string;
    "text-alert": string;
    "text-warning": string;
    "text-success": string;
    "text-static-white": string;
    "text-static-black": string;
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
