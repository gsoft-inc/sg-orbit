import { BorderRadiusPrefix, BoxShadowPrefix, ColorPrefix, FontSizePrefix, FontWeightPrefix, LineHeightPrefix, SpacePrefix, normalizeVariable } from "../theming";
import { Breakpoint, useBreakpoint } from "../BreakpointProvider";
import { CSSProperties, useMemo } from "react";
import { LiteralUnion } from "type-fest";
import { Property } from "csstype";
import { ResponsiveProp, parseResponsiveValue } from "../useResponsiveValue";
import { isNil } from "../../../shared";

/*
SYNTAX:

// No breakpoint, no pseudo, known value
<Button backgroundColor="sunray-10">Toto</Button>

// No breakpoint, no pseudo, dynamic value
<Button backgroundColor="#fff">Toto</Button>

// No breakpoint, pseudo, known value
<Button backgroundColorHover="sunray-10">Toto</Button>

// No breakpoint, pseudo, dynamic value
<Button backgroundColorHover="#fff">Toto</Button>

// Breakpoint, no pseudo, known value
<Button backgroundColor={{ s: "sunray-10", m: "primary-10", l: "black" }}>Toto</Button>

// Breakpoint, no pseudo, dynamic value
<Button backgroundColor={{ s: "sunray-10", m: "#fff", l: "black" }}>Toto</Button>

// Breakpoint, pseudo, known value
<Button backgroundColorHover={{ s: "sunray-10", m: "primary-10", l: "black" }}>Toto</Button>

// Breakpoint, pseudo, dynamic value
<Button backgroundColorHover={{ s: "sunray-10", m: "#fff", l: "black" }}>Toto</Button>
*/

const GlobalValues = [
    "inherit",
    "initial",
    "revert",
    "unset"
];

const ColorExpressionTypes = [
    "#",
    "rgb",
    "rgba",
    "hsl",
    "hsla"
];

const SpacingScale = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13
] as const;

const Colors = [
    "white",
    "black",
    // Marine
    "marine-1",
    "marine-2",
    "marine-3",
    "marine-4",
    "marine-5",
    "marine-6",
    "marine-7",
    "marine-8",
    "marine-9",
    "marine-10",
    // Sunray
    "sunray-1",
    "sunray-2",
    "sunray-3",
    "sunray-4",
    "sunray-5",
    "sunray-6",
    "sunray-7",
    "sunray-8",
    "sunray-9",
    "sunray-10",
    // Moonstone
    "moonstone-1",
    "moonstone-2",
    "moonstone-3",
    "moonstone-4",
    "moonstone-5",
    "moonstone-6",
    "moonstone-7",
    "moonstone-8",
    "moonstone-9",
    "moonstone-10",
    // Cloud
    "cloud-1",
    "cloud-2",
    "cloud-3",
    "cloud-4",
    "cloud-5",
    "cloud-6",
    "cloud-7",
    "cloud-8",
    "cloud-10",
    "cloud-10",
    // Neutral
    "neutral-1",
    "neutral-2",
    "neutral-3",
    "neutral-4",
    "neutral-5",
    "neutral-6",
    "neutral-7",
    "neutral-8",
    "neutral-9",
    "neutral-10",
    // Neutral dark
    "neutral-dark-1",
    "neutral-dark-2",
    "neutral-dark-3",
    "neutral-dark-4",
    "neutral-dark-5",
    "neutral-dark-6",
    "neutral-dark-7",
    "neutral-dark-8",
    "neutral-dark-9",
    "neutral-dark-10",
    // Beetle
    "beetle-1",
    "beetle-2",
    "beetle-3",
    "beetle-4",
    "beetle-5",
    "beetle-6",
    "beetle-7",
    "beetle-8",
    "beetle-9",
    "beetle-10",
    // Botanic
    "botanic-1",
    "botanic-2",
    "botanic-3",
    "botanic-4",
    "botanic-5",
    "botanic-6",
    "botanic-7",
    "botanic-8",
    "botanic-9",
    "botanic-10",
    // Primary
    "primary-1",
    "primary-2",
    "primary-3",
    "primary-4",
    "primary-5",
    "primary-6",
    "primary-7",
    "primary-8",
    "primary-9",
    "primary-10"
] as const;

const BackgroundColorAliases = [
    "alias-1",
    "alias-2",
    "alias-3",
    "alias-4",
    "alias-5",
    "alias-6",
    "alias-info-1",
    "alias-negative-1",
    "alias-negative-2",
    "alias-positive-1",
    "alias-positive-2",
    "alias-primary-1",
    "alias-primary-2",
    "alias-warning-1",
    "alias-warning-2"
] as const;

const BorderWidthAndStyle = "1px solid";

const BorderColorAliases = [
    "alias-1",
    "alias-2",
    "alias-3",
    "alias-4",
    "alias-negative-1",
    "alias-negative-1-translucent",
    "alias-negative-2",
    "alias-positive-1",
    "alias-primary-1",
    "alias-primary-1-translucent",
    "alias-warning-1"
] as const;

const IconColorAliases = [
    "alias-1",
    "alias-2",
    "alias-info-1",
    "alias-negative-1",
    "alias-negative-2",
    "alias-positive-1",
    "alias-positive-2",
    "alias-primary-1",
    "alias-warning-1",
    "alias-warning-2"
] as const;

const TextColorAliases = [
    "alias-1",
    "alias-1-hover",
    "alias-1-active",
    "alias-2",
    "alias-2-hover",
    "alias-2-active",
    "alias-3",
    "alias-3-hover",
    "alias-3-active",
    "alias-4",
    "alias-primary-1",
    "alias-primary-1-hover",
    "alias-primary-1-active",
    "alias-negative-1",
    "alias-negative-1-hover",
    "alias-negative-1-active",
    "alias-negative-2",
    "alias-info-1",
    "alias-info-1-hover",
    "alias-info-1-active",
    "alias-positive-1",
    "alias-positive-1-hover",
    "alias-positive-1-active",
    "alias-positive-2",
    "alias-warning-1",
    "alias-warning-1-hover",
    "alias-warning-1-active",
    "alias-warning-2",
    "alias-input-selection",
    "alias-input-placeholder"
] as const;

const BorderRadiusScale = [
    0,
    1,
    2,
    3,
    4,
    "pill"
] as const;

const BoxShadowScale = [
    1,
    2,
    3,
    4
] as const;

const BoxShadowAliases = [
    "alias-floating",
    "alias-lifted",
    "alias-raised",
    "alias-skim"
] as const;

const FontSizeScale = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    "headline",
    "subheadline"
] as const;

const FontWeightScale = [
    1,
    2,
    3
] as const;

const LineHeightScale = [
    1,
    2,
    3,
    4,
    5,
    6
] as const;

function createValuesMapping<T extends readonly (string | number)[]>(values: T, template: (value: T[number]) => string) {
    const mapping = {} as Record<T[number], string>;

    values.reduce((acc, x) => {
        acc[x] = template(x);

        return acc;
    }, mapping);

    return mapping;
}

function composePrefixes(...rest) {
    return rest.reduce((acc, prefix) => {
        return !isNil(prefix) ? `${acc}${acc !== "" ? "-" : ""}${prefix}` : acc;
    }, "");
}

function createPrefixedValueTemplate(prefix: string) {
    return (value: string | number) => `var(${normalizeVariable(value, prefix)})`;
}

export const SpacingMapping = createValuesMapping(SpacingScale, createPrefixedValueTemplate(SpacePrefix));

export const ColorMapping = createValuesMapping(Colors, createPrefixedValueTemplate(ColorPrefix));

export const BackgroundColorMapping = {
    ...createValuesMapping(BackgroundColorAliases, createPrefixedValueTemplate(composePrefixes(ColorPrefix, "bg"))),
    ...ColorMapping
};

export const BorderMapping = {
    ...createValuesMapping(BorderColorAliases, value => `${BorderWidthAndStyle} var(${normalizeVariable(value, composePrefixes(ColorPrefix, "b"))})`),
    ...createValuesMapping(Colors, value => `${BorderWidthAndStyle} var(${normalizeVariable(value, ColorPrefix)})`)
};

export const BorderRadiusMapping = createValuesMapping(BorderRadiusScale, createPrefixedValueTemplate(BorderRadiusPrefix));

export const BoxShadowMapping = {
    ...createValuesMapping(BoxShadowScale, createPrefixedValueTemplate(BoxShadowPrefix)),
    ...createValuesMapping(BoxShadowAliases, createPrefixedValueTemplate(BoxShadowPrefix))
};

export const FontSizeMapping = createValuesMapping(FontSizeScale, createPrefixedValueTemplate(FontSizePrefix));

const fontVariationSettingsValueTemplate = (value: string | number) => `'wght' var(${normalizeVariable(value, FontWeightPrefix)})`;

export const FontWeightMapping = createValuesMapping(FontWeightScale, fontVariationSettingsValueTemplate);

export const IconColorMapping = {
    ...createValuesMapping(IconColorAliases, createPrefixedValueTemplate(composePrefixes(ColorPrefix, "icon"))),
    ...ColorMapping
};

export const LineHeightMapping = createValuesMapping(LineHeightScale, createPrefixedValueTemplate(LineHeightPrefix));

export const TextColorMapping = {
    ...createValuesMapping(TextColorAliases, createPrefixedValueTemplate(composePrefixes(ColorPrefix, "text"))),
    ...ColorMapping
};

export type BackgroundColorValue = keyof typeof BackgroundColorMapping | Property.BackgroundColor;
export type BorderValue = keyof typeof BorderMapping | Property.Border;
export type BorderRadiusValue = keyof typeof BorderRadiusMapping | Property.BorderRadius;
export type BoxShadowValue = keyof typeof BoxShadowMapping | Property.BoxShadow;
export type ColorValue = keyof typeof TextColorMapping | Property.Color;
export type ColumnGapValue = keyof typeof SpacingMapping | Property.ColumnGap;
export type FillValue = keyof typeof IconColorMapping | Property.Fill;
export type FontSizeValue = keyof typeof FontSizeMapping | Property.FontSize;
export type FontWeightValue = keyof typeof FontWeightMapping | typeof GlobalValues[number];
export type GapValue = keyof typeof SpacingMapping | Property.Gap;
export type GridAutoColumnsValue = keyof typeof SpacingMapping | Property.GridAutoColumns;
export type GridAutoRowsValue = keyof typeof SpacingMapping | Property.GridAutoRows;
export type GridTemplateColumnsValue = keyof typeof SpacingMapping | Property.GridTemplateColumns;
export type GridTemplateRowsValue = keyof typeof SpacingMapping | Property.GridTemplateRows;
export type HeightValue = keyof typeof SpacingMapping | Property.Height;
export type LineHeightValue = keyof typeof LineHeightMapping | Property.LineHeight;
export type MarginValue = keyof typeof SpacingMapping | Property.Margin;
export type PaddingValue = keyof typeof SpacingMapping | Property.Padding;
export type RowGapValue = keyof typeof SpacingMapping | Property.RowGap;
export type SpacingValue = LiteralUnion<keyof typeof SpacingMapping, string>;
export type StrokeValue = keyof typeof IconColorMapping | Property.Stroke;
export type WidthValue = keyof typeof SpacingMapping | Property.Width;

export type AlignContentProp = ResponsiveProp<Property.AlignContent>;
export type AlignItemsProp = ResponsiveProp<Property.AlignItems>;
export type AlignSelfProp = ResponsiveProp<Property.AlignSelf>;
export type AspectRatioProp = ResponsiveProp<Property.AspectRatio>;
export type BackgroundColorProp = ResponsiveProp<BackgroundColorValue>;
export type BackgroundImageProp = ResponsiveProp<Property.BackgroundImage>;
export type BackgroundPositionProp = ResponsiveProp<Property.BackgroundPosition>;
export type BackgroundRepeatProp = ResponsiveProp<Property.BackgroundRepeat>;
export type BackgroundSizeProp = ResponsiveProp<Property.BackgroundSize>;
export type BorderProp = ResponsiveProp<BorderValue>;
export type BorderBottomProp = BorderProp;
export type BorderLeftProp = BorderProp;
export type BorderRightProp = BorderProp;
export type BorderTopProp = BorderProp;
export type BorderRadiusProp = ResponsiveProp<BorderRadiusValue>;
export type BorderBottomLeftRadiusProp = BorderRadiusProp;
export type BorderBottomRightRadiusProp = BorderRadiusProp;
export type BorderTopLeftRadiusProp = BorderRadiusProp;
export type BorderTopRightRadiusProp = BorderRadiusProp;
export type BottomProp = ResponsiveProp<Property.Bottom>;
export type BoxShadowProp = ResponsiveProp<BoxShadowValue>;
export type ColorProp = ResponsiveProp<ColorValue>;
export type ColumnGapProp = ResponsiveProp<ColumnGapValue>;
export type ContentProp = ResponsiveProp<Property.Content>;
export type ContentVisibilityProp = ResponsiveProp<Property.ContentVisibility>;
export type CursorProp = ResponsiveProp<Property.Cursor>;
export type DisplayProp = ResponsiveProp<Property.Display>;
export type FillProp = ResponsiveProp<FillValue>;
export type FilterProp = ResponsiveProp<Property.Filter>;
export type FlexProp = ResponsiveProp<Property.Flex>;
export type FlexBasisProp = ResponsiveProp<Property.FlexBasis>;
export type FlexDirectionProp = ResponsiveProp<Property.FlexDirection>;
export type FlexFlowProp = ResponsiveProp<Property.FlexFlow>;
export type FlexGrowProp = ResponsiveProp<Property.FlexGrow>;
export type FlexShrinkProp = ResponsiveProp<Property.FlexShrink>;
export type FlexWrapProp = ResponsiveProp<Property.FlexWrap>;
export type FontSizeProp = ResponsiveProp<FontSizeValue>;
export type FontStyleProp = ResponsiveProp<Property.FontStyle>;
export type FontWeightProp = ResponsiveProp<FontWeightValue>;
export type GapProp = ResponsiveProp<GapValue>;
export type GridProp = ResponsiveProp<Property.Grid>;
export type GridAreaProp = ResponsiveProp<Property.GridArea>;
export type GridAutoColumnsProp = ResponsiveProp<GridAutoColumnsValue>;
export type GridAutoFlowProp = ResponsiveProp<Property.GridAutoFlow>;
export type GridAutoRowsProp = ResponsiveProp<GridAutoRowsValue>;
export type GridColumnProp = ResponsiveProp<Property.GridColumn>;
export type GridColumnEndProp = ResponsiveProp<Property.GridColumnEnd>;
export type GridColumnSpanProp = ResponsiveProp<number>;
export type GridColumnStartProp = ResponsiveProp<Property.GridColumnStart>;
export type GridRowProp = ResponsiveProp<Property.GridRow>;
export type GridRowEndProp = ResponsiveProp<Property.GridRowEnd>;
export type GridRowStartProp = ResponsiveProp<Property.GridRowStart>;
export type GridRowSpanProp = ResponsiveProp<number>;
export type GridTemplateProp = ResponsiveProp<Property.GridTemplate>;
export type GridTemplateAreasProp = ResponsiveProp<Property.GridTemplateAreas>;
export type GridTemplateColumnsProp = ResponsiveProp<GridTemplateColumnsValue>;
export type GridTemplateRowsProp = ResponsiveProp<GridTemplateRowsValue>;
export type HeightProp = ResponsiveProp<HeightValue>;
export type JustifyContentProp = ResponsiveProp<Property.JustifyContent>;
export type JustifyItemsProp = ResponsiveProp<Property.JustifyItems>;
export type JustifySelfProp = ResponsiveProp<Property.JustifySelf>;
export type LeftProp = ResponsiveProp<Property.Left>;
export type LetterSpacingProp = ResponsiveProp<Property.LetterSpacing>;
export type LineHeightProp = ResponsiveProp<LineHeightValue>;
export type MarginProp = ResponsiveProp<MarginValue>;
export type MarginBottomProp = MarginProp;
export type MarginLeftProp = MarginProp;
export type MarginRightProp = MarginProp;
export type MarginTopProp = MarginProp;
export type MarginXProp = MarginProp;
export type MarginYProp = MarginProp;
export type MaxHeightProp = ResponsiveProp<HeightValue>;
export type MaxWidthProp = ResponsiveProp<WidthValue>;
export type MinHeightProp = ResponsiveProp<HeightValue>;
export type MinWidthProp = ResponsiveProp<WidthValue>;
export type ObjectFitProp = ResponsiveProp<Property.ObjectFit>;
export type ObjectPositionProp = ResponsiveProp<Property.ObjectPosition>;
export type OpacityProp = ResponsiveProp<Property.Opacity>;
export type OrderProp = ResponsiveProp<Property.Order>;
export type OutlineProp = ResponsiveProp<Property.Outline>;
export type OverflowProp = ResponsiveProp<Property.Overflow>;
export type OverflowXProp = ResponsiveProp<Property.OverflowX>;
export type OverflowYProp = ResponsiveProp<Property.OverflowY>;
export type PaddingProp = ResponsiveProp<PaddingValue>;
export type PaddingBottomProp = PaddingProp;
export type PaddingLeftProp = PaddingProp;
export type PaddingRightProp = PaddingProp;
export type PaddingTopProp = PaddingProp;
export type PaddingXProp = PaddingProp;
export type PaddingYProp = PaddingProp;
export type PointerEventsProp = ResponsiveProp<Property.PointerEvents>;
export type PositionProp = ResponsiveProp<Property.Position>;
export type ResizeProp = ResponsiveProp<Property.Resize>;
export type RightProp = ResponsiveProp<Property.Right>;
export type RowGapProp = ResponsiveProp<RowGapValue>;
export type StrokeProp = ResponsiveProp<StrokeValue>;
export type TextAlignProp = ResponsiveProp<Property.TextAlign | "justify-all">;
export type TextDecorationProp = ResponsiveProp<Property.TextDecoration>;
export type TextOverflowProp = ResponsiveProp<Property.TextOverflow>;
export type TextTransformProp = ResponsiveProp<Property.TextTransform>;
export type TopProp = ResponsiveProp<Property.Top>;
export type TransformProp = ResponsiveProp<Property.Transform>;
export type TransformOriginProp = ResponsiveProp<Property.TransformOrigin>;
export type TransformStyleProp = ResponsiveProp<Property.TransformStyle>;
export type VerticalAlignProp = ResponsiveProp<Property.VerticalAlign>;
export type VisibilityProp = ResponsiveProp<Property.Visibility>;
export type WhiteSpaceProp = ResponsiveProp<Property.WhiteSpace>;
export type WidthProp = ResponsiveProp<WidthValue>;
export type WillChangeProp = ResponsiveProp<Property.WillChange>;
export type WordBreakProp = ResponsiveProp<Property.WordBreak>;
export type ZIndexProp = ResponsiveProp<Property.ZIndex>;

export interface StyledSystemProps {
    /**
     * @ignore
     */
    alignContent?: AlignContentProp;
    /**
     * @ignore
     */
    alignItems?: AlignItemsProp;
    /**
     * @ignore
     */
    alignSelf?: AlignSelfProp;
    /**
     * @ignore
     */
    aspectRatio?: AspectRatioProp;
    /**
     * @ignore
     */
    backgroundColor?: BackgroundColorProp;
    /**
     * @ignore
     */
    backgroundColorFocus?: BackgroundColorProp;
    /**
     * @ignore
     */
    backgroundColorHover?: BackgroundColorProp;
    /**
     * @ignore
     */
    backgroundImage?: BackgroundImageProp;
    /**
     * @ignore
     */
    backgroundPosition?: BackgroundPositionProp;
    /**
     * @ignore
     */
    backgroundRepeat?: BackgroundRepeatProp;
    /**
     * @ignore
     */
    backgroundSize?: BackgroundSizeProp;
    /**
     * @ignore
     */
    border?: BorderProp;
    /**
     * @ignore
     */
    borderBottom?: BorderBottomProp;
    /**
     * @ignore
     */
    borderBottomFocus?: BorderBottomProp;
    /**
     * @ignore
     */
    borderBottomHover?: BorderBottomProp;
    /**
     * @ignore
     */
    borderBottomLeftRadius?: BorderRadiusProp;
    /**
     * @ignore
     */
    borderBottomRightRadius?: BorderRadiusProp;
    /**
     * @ignore
     */
    borderFocus?: BorderProp;
    /**
     * @ignore
     */
    borderHover?: BorderProp;
    /**
     * @ignore
     */
    borderLeft?: BorderLeftProp;
    /**
     * @ignore
     */
    borderLeftFocus?: BorderLeftProp;
    /**
     * @ignore
     */
    borderLeftHover?: BorderLeftProp;
    /**
     * @ignore
     */
    borderRadius?: BorderRadiusProp;
    /**
     * @ignore
     */
    borderRight?: BorderRightProp;
    /**
     * @ignore
     */
    borderRightFocus?: BorderRightProp;
    /**
     * @ignore
     */
    borderRightHover?: BorderRightProp;
    /**
     * @ignore
     */
    borderTop?: BorderTopProp;
    /**
     * @ignore
     */
    borderTopFocus?: BorderTopProp;
    /**
     * @ignore
     */
    borderTopHover?: BorderTopProp;
    /**
     * @ignore
     */
    borderTopLeftRadius?: BorderRadiusProp;
    /**
     * @ignore
     */
    borderTopRightRadius?: BorderRadiusProp;
    /**
     * @ignore
     */
    bottom?: BottomProp;
    /**
     * @ignore
     */
    boxShadow?: BoxShadowProp;
    /**
     * @ignore
     */
    boxShadowFocus?: BoxShadowProp;
    /**
     * @ignore
     */
    boxShadowHover?: BoxShadowProp;
    /**
     * @ignore
     */
    color?: ColorProp;
    /**
     * @ignore
     */
    colorFocus?: ColorProp;
    /**
     * @ignore
     */
    colorHover?: ColorProp;
    /**
     * @ignore
     */
    columnGap?: ColumnGapProp;
    /**
     * @ignore
     */
    content?: ContentProp;
    /**
     * @ignore
     */
    contentVisibility?: ContentVisibilityProp;
    /**
     * @ignore
     */
    cursor?: CursorProp;
    /**
     * @ignore
     */
    cursorHover?: CursorProp;
    /**
     * @ignore
     */
    display?: DisplayProp;
    /**
     * @ignore
     */
    fill?: FillProp;
    /**
     * @ignore
     */
    fillFocus?: FillProp;
    /**
     * @ignore
     */
    fillHover?: FillProp;
    /**
     * @ignore
     */
    filter?: FilterProp;
    /**
     * @ignore
     */
    flex?: FlexProp;
    /**
     * @ignore
     */
    flexBasis?: FlexBasisProp;
    /**
     * @ignore
     */
    flexDirection?: FlexDirectionProp;
    /**
     * @ignore
     */
    flexFlow?: FlexFlowProp;
    /**
     * @ignore
     */
    flexGrow?: FlexGrowProp;
    /**
     * @ignore
     */
    flexShrink?: FlexShrinkProp;
    /**
     * @ignore
     */
    flexWrap?: FlexWrapProp;
    /**
     * @ignore
     */
    fontSize?: FontSizeProp;
    /**
     * @ignore
     */
    fontStyle?: FontStyleProp;
    /**
     * @ignore
     */
    fontWeight?: FontWeightProp;
    /**
     * @ignore
     */
    gap?: GapProp;
    /**
     * @ignore
     */
    grid?: GridProp;
    /**
     * @ignore
     */
    gridArea?: GridAreaProp;
    /**
     * @ignore
     */
    gridAutoColumns?: GridAutoColumnsProp;
    /**
     * @ignore
     */
    gridAutoFlow?: GridAutoFlowProp;
    /**
     * @ignore
     */
    gridAutoRows?: GridAutoRowsProp;
    /**
     * @ignore
     */
    gridColumn?: GridColumnProp;
    /**
     * @ignore
     */
    gridColumnEnd?: GridColumnEndProp;
    /**
     * @ignore
     */
    gridColumnSpan?: GridColumnSpanProp;
    /**
     * @ignore
     */
    gridColumnStart?: GridColumnStartProp;
    /**
     * @ignore
     */
    gridRow?: GridRowProp;
    /**
     * @ignore
     */
    gridRowEnd?: GridRowEndProp;
    /**
     * @ignore
     */
    gridRowSpan?: GridRowSpanProp;
    /**
     * @ignore
     */
    gridRowStart?: GridRowStartProp;
    /**
     * @ignore
     */
    gridTemplate?: GridTemplateProp;
    /**
     * @ignore
     */
    gridTemplateAreas?: GridTemplateAreasProp;
    /**
     * @ignore
     */
    gridTemplateColumns?: GridTemplateColumnsProp;
    /**
     * @ignore
     */
    gridTemplateRows?: GridTemplateRowsProp;
    /**
     * @ignore
     */
    height?: HeightProp;
    /**
     * @ignore
     */
    justifyContent?: JustifyContentProp;
    /**
     * @ignore
     */
    justifyItems?: JustifyItemsProp;
    /**
     * @ignore
     */
    justifySelf?: JustifySelfProp;
    /**
     * @ignore
     */
    left?: LeftProp;
    /**
     * @ignore
     */
    letterSpacing?: LetterSpacingProp;
    /**
     * @ignore
     */
    lineHeight?: LineHeightProp;
    /**
     * @ignore
     */
    margin?: MarginProp;
    /**
     * @ignore
     */
    marginBottom?: MarginBottomProp;
    /**
     * @ignore
     */
    marginLeft?: MarginLeftProp;
    /**
     * @ignore
     */
    marginRight?: MarginRightProp;
    /**
     * @ignore
     */
    marginTop?: MarginTopProp;
    /**
     * @ignore
     */
    marginX?: MarginXProp;
    /**
     * @ignore
     */
    marginY?: MarginYProp;
    /**
     * @ignore
     */
    maxHeight?: MaxHeightProp;
    /**
     * @ignore
     */
    maxWidth?: MaxWidthProp;
    /**
     * @ignore
     */
    minHeight?: MinHeightProp;
    /**
     * @ignore
     */
    minWidth?: MinWidthProp;
    /**
     * @ignore
     */
    objectFit?: ObjectFitProp;
    /**
     * @ignore
     */
    objectPosition?: ObjectPositionProp;
    /**
     * @ignore
     */
    opacity?: OpacityProp;
    /**
     * @ignore
     */
    opacityHover?: OpacityProp;
    /**
     * @ignore
     */
    order?: OrderProp;
    /**
     * @ignore
     */
    outline?: OutlineProp;
    /**
     * @ignore
     */
    outlineFocus?: OutlineProp;
    /**
     * @ignore
     */
    overflow?: OverflowProp;
    /**
     * @ignore
     */
    overflowX?: OverflowXProp;
    /**
     * @ignore
     */
    overflowY?: OverflowYProp;
    /**
     * @ignore
     */
    padding?: PaddingProp;
    /**
     * @ignore
     */
    paddingBottom?: PaddingBottomProp;
    /**
     * @ignore
     */
    paddingLeft?: PaddingLeftProp;
    /**
     * @ignore
     */
    paddingRight?: PaddingRightProp;
    /**
     * @ignore
     */
    paddingTop?: PaddingTopProp;
    /**
     * @ignore
     */
    paddingX?: PaddingXProp;
    /**
     * @ignore
     */
    paddingY?: PaddingYProp;
    /**
     * @ignore
     */
    pointerEvents?: PointerEventsProp;
    /**
     * @ignore
     */
    position?: PositionProp;
    /**
     * @ignore
     */
    resize?: ResizeProp;
    /**
     * @ignore
     */
    right?: RightProp;
    /**
     * @ignore
     */
    rowGap?: RowGapProp;
    /**
     * @ignore
     */
    stroke?: StrokeProp;
    /**
     * @ignore
     */
    textAlign?: TextAlignProp;
    /**
     * @ignore
     */
    textDecoration?: TextDecorationProp;
    /**
     * @ignore
     */
    textOverflow?: TextOverflowProp;
    /**
     * @ignore
     */
    textTransform?: TextTransformProp;
    /**
     * @ignore
     */
    top?: TopProp;
    /**
     * @ignore
     */
    transform?: TransformProp;
    /**
     * @ignore
     */
    transformOrigin?: TransformOriginProp;
    /**
     * @ignore
     */
    transformStyle?: TransformStyleProp;
    /**
     * @ignore
     */
    verticalAlign?: VerticalAlignProp;
    /**
     * @ignore
     */
    visibility?: VisibilityProp;
    /**
     * @ignore
     */
    whiteSpace?: WhiteSpaceProp;
    /**
     * @ignore
     */
    width?: WidthProp;
    /**
     * @ignore
     */
    willChange?: WillChangeProp;
    /**
     * @ignore
     */
    wordBreak?: WordBreakProp;
    /**
     * @ignore
     */
    zIndex?: ZIndexProp;
}

class StylingContext {
    private classes: string[];
    private style: Record<string, any>;
    breakpoint: Breakpoint;

    constructor(className: string, style: CSSProperties, breakpoint: Breakpoint) {
        this.classes = !isNil(className) ? [className] : [];
        this.style = style ?? {};
        this.breakpoint = breakpoint;
    }

    addClass(className: string) {
        if (!this.classes.includes(className)) {
            this.classes.push(className);
        }
    }

    addStyleValue(name: string, value: any) {
        if (isNil(this.style[name])) {
            this.style[name] = value;
        }
    }

    computeStyling() {
        const className = this.classes.length !== 0 ? this.classes.join(" ") : undefined;
        const styleValue = Object.keys(this.style).length !== 0 ? this.style : undefined;

        return { className, style: styleValue };
    }
}

type PropHandler<TValue> = (name: string, value: TValue, context: StylingContext) => void;

function getSystemValue<T extends Record<string | number, string>>(value: keyof T, systemValues: T) {
    return systemValues[value as keyof typeof systemValues];
}

export function getSpacingValue(value: string | keyof typeof SpacingMapping) {
    const systemValue = getSystemValue(value as keyof typeof SpacingMapping, SpacingMapping);

    return systemValue ?? value;
}

function parseResponsiveSystemValue<TValue extends string | number>(value: TValue, systemValues: Record<TValue, string>, breakpoint: Breakpoint) {
    if (isNil(value)) {
        return value;
    }

    // Quick lookup since most values will be a non responsive system value and will not requires to parse for a responsive value.
    const systemValue = getSystemValue(value, systemValues);

    if (!isNil(systemValue)) {
        return systemValue;
    }

    const underlyingValue = parseResponsiveValue(value, breakpoint);

    if (!isNil(underlyingValue)) {
        const underlyingSystemValue = getSystemValue(underlyingValue, systemValues);

        if (!isNil(underlyingSystemValue)) {
            return underlyingSystemValue;
        }
    }

    return underlyingValue;
}

function createHandler<TValue extends string | number>(systemValues?: Record<TValue, string>): PropHandler<TValue> {
    const systemValueHandler: PropHandler<TValue> = (name, value, context) => {
        const parsedValue = parseResponsiveSystemValue(value, systemValues, context.breakpoint);

        if (!isNil(parsedValue)) {
            context.addStyleValue(name, parsedValue);
        }
    };

    const passThroughHandler: PropHandler<TValue> = (name, value, context: StylingContext) => {
        const parsedValue = parseResponsiveValue(value, context.breakpoint);

        if (!isNil(parsedValue)) {
            context.addStyleValue(name, parsedValue);
        }
    };

    return !isNil(systemValues) ? systemValueHandler : passThroughHandler;
}

function createPseudoHandler<TValue extends string | number>(pseudoClassName, pseudoVariable, systemValues?: Record<TValue, string>): PropHandler<TValue> {
    const systemValueHandler: PropHandler<TValue> = (name, value, context) => {
        const parsedValue = parseResponsiveSystemValue(value, systemValues, context.breakpoint);

        if (!isNil(parsedValue)) {
            context.addClass(pseudoClassName);
            context.addStyleValue(pseudoVariable, parsedValue);
        }
    };

    const passThroughHandler: PropHandler<TValue> = (name, value, context) => {
        const parsedValue = parseResponsiveValue(value, context.breakpoint);

        if (!isNil(parsedValue)) {
            context.addClass(pseudoClassName);
            context.addStyleValue(pseudoVariable, parsedValue);
        }
    };

    return !isNil(systemValues) ? systemValueHandler : passThroughHandler;
}

// Custom handler for borders to allow the following syntax:
// - border="sunray-10" -> style="1px solid var(--o-ui-sunray-10)"
// - border="hsla(223, 12%, 87%, 1)" -> style="1px solid hsla(223, 12%, 87%, 1)"
function createBorderHandler<TValue extends string>(systemValues: Record<TValue, string>): PropHandler<TValue> {
    return (name, value, context) => {
        const parsedValue = parseResponsiveSystemValue(value, systemValues, context.breakpoint);

        if (!isNil(parsedValue)) {
            if (ColorExpressionTypes.some(x => parsedValue.startsWith(x))) {
                context.addStyleValue(name, `${BorderWidthAndStyle} ${parsedValue}`);
            }
            else {
                context.addStyleValue(name, parsedValue);
            }
        }
    };
}

function createBorderPseudoHandler<TValue extends string>(pseudoClassName: string, pseudoVariable: string, systemValues: Record<TValue, string>): PropHandler<TValue> {
    return (name, value, context) => {
        const parsedValue = parseResponsiveSystemValue(value, systemValues, context.breakpoint);

        if (!isNil(parsedValue)) {
            context.addClass(pseudoClassName);

            if (ColorExpressionTypes.some(x => parsedValue.startsWith(x))) {
                context.addStyleValue(pseudoVariable, `${BorderWidthAndStyle} ${parsedValue}`);
            }
            else {
                context.addStyleValue(pseudoVariable, parsedValue);
            }
        }
    };
}

const fontWeightHandler: PropHandler<string | number> = (name, value, context) => {
    const parsedValue = parseResponsiveSystemValue(value, FontWeightMapping, context.breakpoint);

    if (!isNil(parsedValue)) {
        context.addStyleValue("fontVariationSettings", parsedValue);

        if (!GlobalValues.includes(parsedValue as string)) {
            context.addStyleValue("fontWeight", "400");
        }
    }
};

const gridColumnSpanHandler: PropHandler<string | number> = (name, value, context) => {
    const parsedValue = parseResponsiveValue(value, context.breakpoint);

    if (!isNil(parsedValue)) {
        context.addStyleValue("gridColumn", `span ${parsedValue} / span ${parsedValue}`);
    }
};

const gridRowSpanHandler: PropHandler<string | number> = (name, value, context) => {
    const parsedValue = parseResponsiveValue(value, context.breakpoint);

    if (!isNil(parsedValue)) {
        context.addStyleValue("gridRow", `span ${parsedValue} / span ${parsedValue}`);
    }
};

function createAxisHandler<TValue extends string>(firstPropName: string, secondPropName: string, systemValues: Record<TValue, string>): PropHandler<TValue> {
    const firstHandler = createHandler(systemValues);
    const secondHandler = createHandler(systemValues);

    return (name, value, context) => {
        firstHandler(firstPropName, value, context);
        secondHandler(secondPropName, value, context);
    };
}

const PropsHandlers: Record<string, PropHandler<unknown>> = {
    alignContent: createHandler(),
    alignItems: createHandler(),
    alignSelf: createHandler(),
    aspectRatio: createHandler(),
    backgroundColor: createHandler(BackgroundColorMapping),
    backgroundColorFocus: createPseudoHandler("o-ui-bg-focus", "--o-ui-bg-focus", BackgroundColorMapping),
    backgroundColorHover: createPseudoHandler("o-ui-bg-hover", "--o-ui-bg-hover", BackgroundColorMapping),
    backgroundImage: createHandler(),
    backgroundPosition: createHandler(),
    backgroundRepeat: createHandler(),
    backgroundSize: createHandler(),
    border: createBorderHandler(BorderMapping),
    borderBottom: createBorderHandler(BorderMapping),
    borderBottomFocus: createBorderPseudoHandler("o-ui-bb-focus", "--o-ui-bb-focus", BorderMapping),
    borderBottomHover: createBorderPseudoHandler("o-ui-bb-hover", "--o-ui-bb-hover", BorderMapping),
    borderBottomLeftRadius: createHandler(BorderRadiusMapping),
    borderBottomRightRadius: createHandler(BorderRadiusMapping),
    borderFocus: createBorderPseudoHandler("o-ui-b-focus", "--o-ui-b-focus", BorderMapping),
    borderHover: createBorderPseudoHandler("o-ui-b-hover", "--o-ui-b-hover", BorderMapping),
    borderLeft: createBorderHandler(BorderMapping),
    borderLeftFocus: createBorderPseudoHandler("o-ui-bl-focus", "--o-ui-bl-focus", BorderMapping),
    borderLeftHover: createBorderPseudoHandler("o-ui-bl-hover", "--o-ui-bl-hover", BorderMapping),
    borderRadius: createHandler(BorderRadiusMapping),
    borderRight: createBorderHandler(BorderMapping),
    borderRightFocus: createBorderPseudoHandler("o-ui-br-focus", "--o-ui-br-focus", BorderMapping),
    borderRightHover: createBorderPseudoHandler("o-ui-br-hover", "--o-ui-br-hover", BorderMapping),
    borderTop: createBorderHandler(BorderMapping),
    borderTopFocus: createBorderPseudoHandler("o-ui-bt-focus", "--o-ui-bt-focus", BorderMapping),
    borderTopHover: createBorderPseudoHandler("o-ui-bt-hover", "--o-ui-bt-hover", BorderMapping),
    borderTopLeftRadius: createHandler(BorderRadiusMapping),
    borderTopRightRadius: createHandler(BorderRadiusMapping),
    bottom: createHandler(),
    boxShadow: createHandler(BoxShadowMapping),
    boxShadowFocus: createPseudoHandler("o-ui-bs-focus", "--o-ui-bs-focus", BoxShadowMapping),
    boxShadowHover: createPseudoHandler("o-ui-bs-hover", "--o-ui-bs-hover", BoxShadowMapping),
    color: createHandler(ColorMapping),
    colorFocus: createPseudoHandler("o-ui-c-focus", "--o-ui-c-focus", ColorMapping),
    colorHover: createPseudoHandler("o-ui-c-hover", "--o-ui-c-hover", ColorMapping),
    columnGap: createHandler(SpacingMapping),
    content: createHandler(),
    contentVisibility: createHandler(),
    cursor: createHandler(),
    cursorHover: createPseudoHandler("o-ui-cs-hover", "--o-ui-cs-hover"),
    display: createHandler(),
    fill: createHandler(IconColorMapping),
    fillFocus: createPseudoHandler("o-ui-f-focus", "--o-ui-f-focus", BorderMapping),
    fillHover: createPseudoHandler("o-ui-f-hover", "--o-ui-f-hover", BorderMapping),
    filter: createHandler(),
    flex: createHandler(),
    flexBasis: createHandler(),
    flexDirection: createHandler(),
    flexFlow: createHandler(),
    flexGrow: createHandler(),
    flexShrink: createHandler(),
    flexWrap: createHandler(),
    fontSize: createHandler(FontSizeMapping),
    fontStyle: createHandler(),
    fontWeight: fontWeightHandler,
    gap: createHandler(SpacingMapping),
    grid: createHandler(),
    gridArea: createHandler(),
    gridAutoColumns: createHandler(SpacingMapping),
    gridAutoFlow: createHandler(),
    gridAutoRows: createHandler(SpacingMapping),
    gridColumn: createHandler(),
    gridColumnEnd: createHandler(),
    gridColumnSpan: gridColumnSpanHandler,
    gridColumnStart: createHandler(),
    gridRow: createHandler(),
    gridRowEnd: createHandler(),
    gridRowSpan: gridRowSpanHandler,
    gridRowStart: createHandler(),
    gridTemplate: createHandler(),
    gridTemplateAreas: createHandler(),
    gridTemplateColumns: createHandler(SpacingMapping),
    gridTemplateRows: createHandler(SpacingMapping),
    height: createHandler(SpacingMapping),
    justifyContent: createHandler(),
    justifyItems: createHandler(),
    justifySelf: createHandler(),
    left: createHandler(),
    letterSpacing: createHandler(),
    lineHeight: createHandler(LineHeightMapping),
    margin: createHandler(SpacingMapping),
    marginBottom: createHandler(SpacingMapping),
    marginLeft: createHandler(SpacingMapping),
    marginRight: createHandler(SpacingMapping),
    marginTop: createHandler(SpacingMapping),
    marginX: createAxisHandler("marginLeft", "marginRight", SpacingMapping),
    marginY: createAxisHandler("marginBottom", "marginTop", SpacingMapping),
    maxHeight: createHandler(SpacingMapping),
    maxWidth: createHandler(SpacingMapping),
    minHeight: createHandler(SpacingMapping),
    minWidth: createHandler(SpacingMapping),
    objectFit: createHandler(),
    objectPosition: createHandler(),
    opacity: createHandler(),
    opacityHover: createPseudoHandler("o-ui-o-hover", "o-ui-o-hover"),
    order: createHandler(),
    outline: createHandler(),
    outlineFocus: createPseudoHandler("o-ui-ol-focus", "o-ui-ol-focus"),
    overflow: createHandler(),
    overflowX: createHandler(),
    overflowY: createHandler(),
    padding: createHandler(SpacingMapping),
    paddingBottom: createHandler(SpacingMapping),
    paddingLeft: createHandler(SpacingMapping),
    paddingRight: createHandler(SpacingMapping),
    paddingTop: createHandler(SpacingMapping),
    paddingX: createAxisHandler("paddingLeft", "paddingRight", SpacingMapping),
    paddingY: createAxisHandler("paddingBottom", "paddingTop", SpacingMapping),
    pointerEvents: createHandler(),
    position: createHandler(),
    resize: createHandler(),
    right: createHandler(),
    rowGap: createHandler(SpacingMapping),
    stroke: createHandler(IconColorMapping),
    textAlign: createHandler(),
    textDecoration: createHandler(),
    textOverflow: createHandler(),
    textTransform: createHandler(),
    top: createHandler(),
    transform: createHandler(),
    transformOrigin: createHandler(),
    transformStyle: createHandler(),
    verticalAlign: createHandler(),
    visibility: createHandler(),
    whiteSpace: createHandler(),
    width: createHandler(SpacingMapping),
    willChange: createHandler(),
    wordBreak: createHandler(),
    zIndex: createHandler()
};

export function useStyledSystem<TProps extends Record<string, any>>(props: TProps) {
    const {
        alignContent,
        alignItems,
        alignSelf,
        aspectRatio,
        backgroundColor,
        backgroundColorFocus,
        backgroundColorHover,
        backgroundImage,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        border,
        borderBottom,
        borderBottomFocus,
        borderBottomHover,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderFocus,
        borderHover,
        borderLeft,
        borderLeftFocus,
        borderLeftHover,
        borderRadius,
        borderRight,
        borderRightFocus,
        borderRightHover,
        borderTop,
        borderTopFocus,
        borderTopHover,
        borderTopLeftRadius,
        borderTopRightRadius,
        bottom,
        boxShadow,
        boxShadowFocus,
        boxShadowHover,
        className,
        color,
        colorFocus,
        colorHover,
        columnGap,
        content,
        contentVisibility,
        cursor,
        cursorHover,
        display,
        fill,
        fillFocus,
        fillHover,
        filter,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        fontSize,
        fontStyle,
        fontWeight,
        gap,
        grid,
        gridArea,
        gridAutoColumns,
        gridAutoFlow,
        gridAutoRows,
        gridColumn,
        gridColumnEnd,
        gridColumnSpan,
        gridColumnStart,
        gridRow,
        gridRowEnd,
        gridRowSpan,
        gridRowStart,
        gridTemplate,
        gridTemplateAreas,
        gridTemplateColumns,
        gridTemplateRows,
        height,
        justifyContent,
        justifyItems,
        justifySelf,
        left,
        letterSpacing,
        lineHeight,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginX,
        marginY,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        objectFit,
        objectPosition,
        opacity,
        opacityHover,
        order,
        outline,
        outlineFocus,
        overflow,
        overflowX,
        overflowY,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingX,
        paddingY,
        pointerEvents,
        position,
        resize,
        right,
        rowGap,
        stroke,
        style,
        textAlign,
        textDecoration,
        textOverflow,
        textTransform,
        top,
        transform,
        transformOrigin,
        transformStyle,
        verticalAlign,
        visibility,
        whiteSpace,
        width,
        willChange,
        wordBreak,
        zIndex,
        ...rest
    } = props;

    const breakpoint = useBreakpoint();

    // We don't have to add "props" as a dependency because useStyledSystem return the "rest" which is all the props that are not already a dependency
    // of this memoization. If we do add props, the memoization will refresh on every render, which is bad, so don't do it.
    /* eslint-disable react-hooks/exhaustive-deps */
    const styling = useMemo(() => {
        const context = new StylingContext(className, style, breakpoint);

        Object.keys(props).forEach(key => {
            const value = props[key];

            if (!isNil(value)) {
                const handler = PropsHandlers[key];

                if (!isNil(handler)) {
                    handler(key, value, context);
                }
            }
        });

        return context.computeStyling();
    }, [
        alignContent,
        alignItems,
        alignSelf,
        aspectRatio,
        backgroundColor,
        backgroundColorFocus,
        backgroundColorHover,
        backgroundImage,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        border,
        borderBottom,
        borderBottomFocus,
        borderBottomHover,
        borderLeft,
        borderLeftFocus,
        borderLeftHover,
        borderRight,
        borderRightFocus,
        borderRightHover,
        borderTop,
        borderTopFocus,
        borderTopHover,
        borderFocus,
        borderHover,
        borderRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        boxShadow,
        boxShadowFocus,
        boxShadowHover,
        bottom,
        breakpoint,
        className,
        color,
        colorFocus,
        colorHover,
        columnGap,
        content,
        contentVisibility,
        cursor,
        cursorHover,
        display,
        fill,
        fillFocus,
        fillHover,
        filter,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        fontSize,
        fontStyle,
        fontWeight,
        gap,
        grid,
        gridArea,
        gridAutoColumns,
        gridAutoFlow,
        gridAutoRows,
        gridColumn,
        gridColumnEnd,
        gridColumnSpan,
        gridColumnStart,
        gridRow,
        gridRowEnd,
        gridRowSpan,
        gridRowStart,
        gridTemplate,
        gridTemplateAreas,
        gridTemplateColumns,
        gridTemplateRows,
        height,
        justifyContent,
        justifyItems,
        justifySelf,
        left,
        letterSpacing,
        lineHeight,
        margin,
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginX,
        marginY,
        maxHeight,
        maxWidth,
        minHeight,
        minWidth,
        objectFit,
        objectPosition,
        opacity,
        opacityHover,
        order,
        outline,
        outlineFocus,
        overflow,
        overflowX,
        overflowY,
        padding,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingX,
        paddingY,
        pointerEvents,
        position,
        resize,
        right,
        rowGap,
        stroke,
        style,
        textAlign,
        textDecoration,
        textOverflow,
        textTransform,
        top,
        transform,
        transformOrigin,
        transformStyle,
        verticalAlign,
        visibility,
        whiteSpace,
        width,
        willChange,
        wordBreak,
        zIndex
    ]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return {
        ...rest,
        className: styling.className,
        style: styling.style
    } as Omit<TProps, keyof StyledSystemProps>;

}
