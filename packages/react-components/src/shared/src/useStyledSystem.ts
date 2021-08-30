import { CSSProperties, useMemo } from "react";
import { Entry, LiteralUnion, Simplify } from "type-fest";
import { isNil } from "./assertions";

/*
TODO:
- Breakpoints -> Breakpoint | BreakpointValue | Responsive | ResponsiveValue
- See if we can simplify the DOCS types by simplyfing a few types
    Hints:
        - Remove css native colors
        - Remove length / percentage etc.. and only use string
*/

/*
TODO FRANK:
- Would love to introduce something like border="red" and the resulting atomic css class would also set by default border-width: "1px" & border-style" solid
    -> Could it introduce some specifity bug if someone also a different border width or style?
    -> Could also introduce a concept of "shorthands" at the useStyledSystem layer
    -> Maybe it's easier to finally introduce interpolation and let the user do border="$border-widths-1 solid $sunray-1" <- not as cool as border="sunray-1"
*/

export type GlobalValue =
    "inherit" |
    "initial" |
    "revert" |
    "unset";

export type LengthType =
    "px" |
    "em" |
    "rem" |
    "ch" |
    "vw" |
    "vh" |
    "vmin" |
    "vmax";

export type LengthUnit = `${number}${LengthType}`;

export type LengthShorthand =
    `${LengthUnit}` |
    `${LengthUnit} ${LengthUnit}` |
    `${LengthUnit} ${LengthUnit} ${LengthUnit}` |
    `${LengthUnit} ${LengthUnit} ${LengthUnit} ${LengthUnit}`;

export type PercentageUnit = `${number}%`;

export type CalcExpression = `calc(${any})`;

const OrbitSpacingScale = [
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

export type OrbitSpace = typeof OrbitSpacingScale[number];

function createOrbitSpacingScaleClasses<IncludeZero extends boolean = false>(section: string, includeZero?: IncludeZero) {
    const classes: Record<number | string, string> = {};

    if (includeZero) {
        classes[0] = `o-ui-${section}-0`;
    }

    OrbitSpacingScale.reduce((acc, x) => {
        acc[x] = `o-ui-${section}-${x}`;

        return acc;
    }, classes);

    return classes as Record<IncludeZero extends true ? 0 | OrbitSpace : OrbitSpace, string>;
}

export type SpaceValue = OrbitSpace | LengthUnit | PercentageUnit | CalcExpression | GlobalValue;

export type WidthValue =
    SpaceValue |
    "max-content" |
    "min-content" |
    "fit-content" |
    `fit-content(${LengthUnit})` |
    `fit-content(${PercentageUnit})` |
    "auto";

export type HeightValue = WidthValue;

const OrbitBorderWidthScale = [
    1,
    2,
    3,
    4,
    5
] as const;

export type OrbitBorderWidth = typeof OrbitBorderWidthScale[number];

function createOrbitBorderWidthScaleClasses<IncludeZero extends boolean = false>(section: string, includeZero?: IncludeZero) {
    const classes: Record<number, string> = {};

    if (includeZero) {
        classes[0] = `o-ui-${section}-0`;
    }

    OrbitBorderWidthScale.reduce((acc, x) => {
        acc[x] = `o-ui-${section}-${x}`;

        return acc;
    }, classes);

    return classes as Record<IncludeZero extends true ? 0 | OrbitBorderWidth : OrbitBorderWidth, string>;
}

export type BorderWidthValue =
    OrbitBorderWidth |
    LengthUnit |
    "thin" |
    "medium" |
    "thick" |
    GlobalValue;

export type NamedColor =
    "aliceblue" |
    "antiquewhite" |
    "aqua" |
    "aquamarine" |
    "azure" |
    "beige" |
    "bisque" |
    "black" |
    "blanchedalmond" |
    "blue" |
    "blueviolet" |
    "brown" |
    "burlywood" |
    "cadetblue" |
    "chartreuse" |
    "chocolate" |
    "coral" |
    "cornflowerblue" |
    "cornsilk" |
    "crimson" |
    "cyan" |
    "darkblue" |
    "darkcyan" |
    "darkgoldenrod" |
    "darkgray" |
    "darkgreen" |
    "darkgrey" |
    "darkkhaki" |
    "darkmagenta" |
    "darkolivegreen" |
    "darkorange" |
    "darkorchid" |
    "darkred" |
    "darksalmon" |
    "darkseagreen" |
    "darkslateblue" |
    "darkslategray" |
    "darkslategrey" |
    "darkturquoise" |
    "darkviolet" |
    "deeppink" |
    "deepskyblue" |
    "dimgray" |
    "dimgrey" |
    "dodgerblue" |
    "firebrick" |
    "floralwhite" |
    "forestgreen" |
    "fuchsia" |
    "gainsboro" |
    "ghostwhite" |
    "gold" |
    "goldenrod" |
    "gray" |
    "green" |
    "greenyellow" |
    "grey" |
    "honeydew" |
    "hotpink" |
    "indianred" |
    "indigo" |
    "ivory" |
    "khaki" |
    "lavender" |
    "lavenderblush" |
    "lawngreen" |
    "lemonchiffon" |
    "lightblue" |
    "lightcoral" |
    "lightcyan" |
    "lightgoldenrodyellow" |
    "lightgray" |
    "lightgreen" |
    "lightgrey" |
    "lightpink" |
    "lightsalmon" |
    "lightseagreen" |
    "lightskyblue" |
    "lightslategray" |
    "lightslategrey" |
    "lightsteelblue" |
    "lightyellow" |
    "lime" |
    "limegreen" |
    "linen" |
    "magenta" |
    "maroon" |
    "mediumaquamarine" |
    "mediumblue" |
    "mediumorchid" |
    "mediumpurple" |
    "mediumseagreen" |
    "mediumslateblue" |
    "mediumspringgreen" |
    "mediumturquoise" |
    "mediumvioletred" |
    "midnightblue" |
    "mintcream" |
    "mistyrose" |
    "moccasin" |
    "navajowhite" |
    "navy" |
    "oldlace" |
    "olive" |
    "olivedrab" |
    "orange" |
    "orangered" |
    "orchid" |
    "palegoldenrod" |
    "palegreen" |
    "paleturquoise" |
    "palevioletred" |
    "papayawhip" |
    "peachpuff" |
    "peru" |
    "pink" |
    "plum" |
    "powderblue" |
    "purple" |
    "rebeccapurple" |
    "red" |
    "rosybrown" |
    "royalblue" |
    "saddlebrown" |
    "salmon" |
    "sandybrown" |
    "seagreen" |
    "seashell" |
    "sienna" |
    "silver" |
    "skyblue" |
    "slateblue" |
    "slategray" |
    "slategrey" |
    "snow" |
    "springgreen" |
    "steelblue" |
    "tan" |
    "teal" |
    "thistle" |
    "tomato" |
    "turquoise" |
    "violet" |
    "wheat" |
    "white" |
    "whitesmoke" |
    "yellow" |
    "yellowgreen";

export type ColorExpressionType =
    "#" |
    "rgb" |
    "rgba" |
    "hsl" |
    "hsla";

export type ColorExpression = `${ColorExpressionType}${string}`;

export type CssColor = ColorExpression | NamedColor;

export const OrbitColors = [
    "current",
    "transparent",
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

export type OrbitColor = typeof OrbitColors[number];

function createOrbitColorClasses(section?: string) {
    const template = isNil(section) ? (x: string) => `o-ui-${x}` : (x: string) => `o-ui-${section}-${x}`;

    return OrbitColors.reduce((acc, x) => {
        acc[x] = template(x);

        return acc;
    }, {} as Record<OrbitColor, string>);
}

export type ColorValue = OrbitColor | CssColor | GlobalValue;

export const AlignContentClasses = {
    "center": "o-ui-ac",
    "start": "o-ui-ac-fs",
    "end": "o-ui-ac-fe",
    "left": "o-ui-ac-l",
    "right": "o-ui-ac-r",
    "space-between": "o-ui-ac-sb",
    "space-around": "o-ui-ac-sa",
    "space-evenly": "o-ui-ac-se",
    "stretch": "o-ui-ac-s",
    "normal": "o-ui-ac-n"
} as const;

export const AlignItemsClasses = {
    "center": "o-ui-ai-c",
    "start": "o-ui-ai-sta",
    "end": "o-ui-ai-e",
    "flex-start": "o-ui-ai-fs",
    "flex-end": "o-ui-ai-fe",
    "baseline": "o-ui-ai-b",
    "stretch": "o-ui-ai-str",
    "normal": "o-ui-ai-n"
} as const;

export const AlignSelfClasses = {
    "center": "o-ui-as-c",
    "start": "o-ui-as-strt",
    "end": "o-ui-as-e",
    "flex-start": "o-ui-as-fs",
    "flex-end": "o-ui-as-fe",
    "baseline": "o-ui-as-b",
    "stretch": "o-ui-as-str",
    "normal": "o-ui-as-n"
} as const;

export const BackgroundColorRoleClasses = {
    "alias-1": "o-ui-alias-bg-1",
    "alias-2": "o-ui-alias-bg-2",
    "alias-3": "o-ui-alias-bg-3",
    "alias-4": "o-ui-alias-bg-4",
    "alias-5": "o-ui-alias-bg-5",
    "alias-6": "o-ui-alias-bg-6",
    "alias-primary-1": "o-ui-alias-bg-primary-1",
    "alias-primary-2": "o-ui-alias-bg-primary-2",
    "alias-negative-1": "o-ui-alias-bg-negative-1",
    "alias-negative-2": "o-ui-alias-bg-negative-2",
    "alias-warning-1": "o-ui-alias-bg-warning-1",
    "alias-warning-2": "o-ui-alias-bg-warning-2",
    "alias-positive-1": "o-ui-alias-bg-positive-1",
    "alias-positive-2": "o-ui-alias-bg-positive-2",
    "alias-info-1": "o-ui-alias-bg-info-1"
} as const;

export const BackgroundColorClasses = { ...createOrbitColorClasses("bg"), ...BackgroundColorRoleClasses };

export const BackgroundPositionClasses = {
    "top": "o-ui-bg-t",
    "bottom": "o-ui-bg-b",
    "left": "o-ui-bg-l",
    "right": "o-ui-bg-r",
    "center": "o-ui-bgp-c",
    "left-top": "o-ui-bg-lt",
    "left-bottom": "o-ui-bg-lb",
    "right-top": "o-ui-bg-rt",
    "right-bottom": "o-ui-bg-rb"
} as const;

export const BackgroundSizeClasses = {
    "auto": "o-ui-bg-a",
    "cover": "o-ui-bg-cvr",
    "contain": "o-ui-bg-cnt"
} as const;

export const BorderColorRoleClasses = {
    "alias-1": "o-ui-alias-b-1",
    "alias-2": "o-ui-alias-b-2",
    "alias-3": "o-ui-alias-b-3",
    "alias-4": "o-ui-alias-b-4",
    "alias-primary-1": "o-ui-alias-b-primary-1",
    "alias-primary-1-translucent": "o-ui-alias-b-primary-1-translucent",
    "alias-negative-1": "o-ui-alias-b-negative-1",
    "alias-negative-1-translucent": "o-ui-alias-b-negative-1-translucent",
    "alias-negative-2": "o-ui-alias-b-negative-2",
    "alias-warning-1": "o-ui-alias-b-warning-1",
    "alias-positive-1": "o-ui-alias-b-positive-1"
} as const;

export const BorderColorClasses = { ...createOrbitColorClasses("b"), ...BorderColorRoleClasses };

export const BorderRadiusClasses = {
    0: "o-ui-b-radius-0",
    1: "o-ui-b-radius-1",
    2: "o-ui-b-radius-2",
    3: "o-ui-b-radius-3",
    4: "o-ui-b-radius-4",
    "100": "o-ui-b-radius-100",
    "pill": "o-ui-pill"
} as const;

export const BorderStyleClasses = {
    "solid": "o-ui-b-s",
    "dashed": "o-ui-b-da",
    "dotted": "o-ui-b-dt",
    "double": "o-ui-b-db",
    "none": "o-ui-b-n"
} as const;

export const BorderWidthClasses = createOrbitBorderWidthScaleClasses("ba", true);

export const BorderTopWidthClasses = createOrbitBorderWidthScaleClasses("bt", true);

export const BorderBottomWidthClasses = createOrbitBorderWidthScaleClasses("bb", true);

export const BorderLeftWidthClasses = createOrbitBorderWidthScaleClasses("bl", true);

export const BorderRightWidthClasses = createOrbitBorderWidthScaleClasses("br", true);

// TODO FRANK: Do we realistically need vertical border classes?
export const BorderVerticalWidthClasses = createOrbitBorderWidthScaleClasses("bv", true);

// TODO FRANK: Do we realistically need horizontal border classes?
export const BorderHorizontalWidthClasses = createOrbitBorderWidthScaleClasses("bh", true);

export const BottomClasses = { ...createOrbitSpacingScaleClasses("bottom", true), "auto": "o-ui-bottom-auto" };

export const BoxShadowClasses = {
    1: "o-ui-bs-1",
    2: "o-ui-bs-2",
    3: "o-ui-bs-3",
    4: "o-ui-bs-4",
    "alias-skim": "o-ui-alias-bs-skim",
    "alias-lifted": "o-ui-alias-bs-lifted",
    "alias-raised": "o-ui-alias-bs-raised",
    "alias-floating": "o-ui-alias-bs-floating"
} as const;

export const BoxSizingClasses = {
    "border-box": "o-ui-bs-bb",
    "content-box": "o-ui-bs-cb"
} as const;

export const ColorRoleClasses = {
    "alias-1": "o-ui-alias-text-1",
    "alias-2": "o-ui-alias-text-2",
    "alias-3": "o-ui-alias-text-3",
    "alias-4": "o-ui-alias-text-4",
    "alias-primary-1": "o-ui-alias-text-primary-1",
    "alias-negative-1": "o-ui-alias-text-negative-1",
    "alias-negative-2": "o-ui-alias-text-negative-2",
    "alias-info-1": "o-ui-alias-text-info-1",
    "alias-positive-1": "o-ui-alias-text-positive-1",
    "alias-positive-2": "o-ui-alias-text-positive-2",
    "alias-warning-1": "o-ui-alias-text-warning-1",
    "alias-warning-2": "o-ui-alias-text-warning-2",
    "alias-input-selection": "o-ui-alias-text-input-selection",
    "alias-input-placeholder": "o-ui-alias-text-input-placeholder"
} as const;

export const ColorClasses = { ...createOrbitColorClasses(), ...ColorRoleClasses };

export const ColumnGapClasses = createOrbitSpacingScaleClasses("c-gap", true);

export const CursorClasses = {
    "help": "o-ui-c-h",
    "auto": "o-ui-c-a",
    "wait": "o-ui-c-w",
    "crosshair": "o-ui-c-c",
    "not-allowed": "o-ui-c-na",
    "grab": "o-ui-c-g",
    "zoom-in": "o-ui-c-zi"
} as const;

export const DisplayClasses = {
    "block": "o-ui-db",
    "inline-block": "o-ui-dib",
    "inline": "o-ui-di",
    "flex": "o-ui-df",
    "inline-flex": "o-ui-dif",
    "table": "o-ui-dt",
    "inline-table": "o-ui-dit",
    "table-caption": "o-ui-dt-caption",
    "table-cell": "o-ui-dt-cell",
    "table-column": "o-ui-dt-column",
    "table-column-group": "o-ui-dt-cg",
    "table-footer-group": "o-ui-dt-fg",
    "table-header-group": "o-ui-dt-hg",
    "table-row-group": "o-ui-dt-rg",
    "table-row": "o-ui-dt-row",
    "grid": "o-ui-dg",
    "inline-grid": "o-ui-dig",
    "list-item": "o-ui-dli",
    "none": "o-ui-dn"
} as const;

export const FillRoleClasses = {
    "alias-icon-1": "o-ui-alias-icon-1",
    "alias-icon-2": "o-ui-alias-icon-2",
    "alias-icon-primary-1": "o-ui-alias-icon-primary-1",
    "alias-icon-negative-1": "o-ui-alias-icon-negative-1",
    "alias-icon-negative-2": "o-ui-alias-icon-negative-2",
    "alias-icon-positive-1": "o-ui-alias-icon-positive-1",
    "alias-icon-positive-2": "o-ui-alias-icon-positive-2",
    "alias-icon-warning-1": "o-ui-alias-icon-warning-1",
    "alias-icon-warning-2": "o-ui-alias-icon-warning-2",
    "alias-icon-info-1": "o-ui-alias-icon-info-1"
} as const;

export const FillClasses = { ...createOrbitColorClasses("fill"), ...FillRoleClasses };

export const FlexBasisClasses = {
    "auto": "o-ui-b-a",
    "fill": "o-ui-b-f",
    "max-content": "o-ui-b-mxc",
    "min-content": "o-ui-b-mnc",
    "fit-content": "o-ui-b-f",
    "content": "o-ui-b-c"
} as const;

export const FlexClasses = {
    "auto": "o-ui-f-a",
    "max-content": "o-ui-f-mx",
    "min-content": "o-ui-f-mn",
    "none": "o-ui-f-n"
} as const;

export const FlexDirectionClasses = {
    "row": "o-ui-fd-r",
    "row-reverse": "o-ui-fd-rr",
    "column": "o-ui-fd-c",
    "column-reverse": "o-ui-fd-cr"
} as const;

export const FlexGrowClasses = {
    0: "o-ui-fg-0",
    1: "o-ui-fg-1",
    2: "o-ui-fg-2"
} as const;

export const FlexShrinkClasses = {
    0: "o-ui-fg-0",
    1: "o-ui-fg-1",
    2: "o-ui-fg-2"
} as const;

export const FlexWrapClasses = {
    "wrap": "o-ui-fw-w",
    "nowrap": "o-ui-fw-nw",
    "wrap-reverse": "o-ui-fw-wr"
} as const;

export const FontSizeClasses = {
    1: "o-ui-fs-1",
    2: "o-ui-fs-2",
    3: "o-ui-fs-3",
    4: "o-ui-fs-4",
    5: "o-ui-fs-5",
    6: "o-ui-fs-6",
    7: "o-ui-fs-7",
    8: "o-ui-fs-8",
    9: "o-ui-fs-9",
    "subheadline": "o-ui-subheadline",
    "headline": "o-ui-headline"
} as const;

export const FontWeightClasses = {
    1: "o-ui-fw-1",
    2: "o-ui-fw-2",
    3: "o-ui-fw-3",
    4: "o-ui-fw-4",
    5: "o-ui-fw-5",
    6: "o-ui-fw-6",
    7: "o-ui-fw-7",
    8: "o-ui-fw-8",
    9: "o-ui-fw-9"
} as const;

export const GapClasses = createOrbitSpacingScaleClasses("gap", true);

export const HeightAdditionalClasses = {
    "100%": "o-ui-h-100",
    "screen": "o-ui-h-screen",
    "auto": "o-ui-h-auto",
    "max-content": "o-ui-h-max",
    "min-content": "o-ui-h-min",
    "fit-content": "o-ui-h-fit"
} as const;

export const HeightClasses = { ...createOrbitSpacingScaleClasses("h", true), ...HeightAdditionalClasses };

export const JustifyContentClasses = {
    "center": "o-ui-jc-c",
    "start": "o-ui-jc-strt",
    "end": "o-ui-jc-e",
    "left": "o-ui-jc-l",
    "right": "o-ui-jc-r",
    "space-between": "o-ui-jc-b",
    "space-around": "o-ui-jc-a",
    "space-evenly": "o-ui-jc-evn",
    "stretch": "o-ui-jc-str",
    "normal": "o-ui-jc-n"
} as const;

export const LeftClasses = { ...createOrbitSpacingScaleClasses("left", true), "auto": "o-ui-left-auto" };

export const LineHeightClasses = {
    1: "o-ui-lh-1",
    2: "o-ui-lh-2",
    3: "o-ui-lh-3",
    4: "o-ui-lh-4",
    5: "o-ui-lh-5",
    6: "o-ui-lh-6",
    "normal": "o-ui-lh-normal",
    "none": "o-ui-lh-none"
} as const;

export const MarginClasses = { ...createOrbitSpacingScaleClasses("ma", true), "auto": "o-ui-ma-auto" };

export const MarginTopClasses = { ...createOrbitSpacingScaleClasses("mt", true), "auto": "o-ui-mt-auto" };

export const MarginBottomClasses = { ...createOrbitSpacingScaleClasses("mb", true), "auto": "o-ui-mb-auto" };

export const MarginLeftClasses = { ...createOrbitSpacingScaleClasses("ml", true), "auto": "o-ui-ml-auto" };

export const MarginRightClasses = { ...createOrbitSpacingScaleClasses("mr", true), "auto": "o-ui-mr-auto" };

export const MarginVerticalClasses = { ...createOrbitSpacingScaleClasses("mv", true), "auto": "o-ui-mv-auto" };

export const MarginHorizontalClasses = { ...createOrbitSpacingScaleClasses("mh", true), "auto": "o-ui-mh-auto" };

export const MaxHeightAdditionalClasses = {
    "100%": "o-ui-mh-100",
    "auto": "o-ui-mh-a",
    "max-content": "o-ui-mh-mx",
    "min-content": "o-ui-mh-mn",
    "fit-content": "o-ui-mh-f"
} as const;

export const MaxHeightClasses = { ...createOrbitSpacingScaleClasses("mh-"), ...MaxHeightAdditionalClasses };

export const MaxWidthAdditionalClasses = {
    "100%": "o-ui-max-w-100",
    "auto": "o-ui-max-w-a",
    "max-content": "o-ui-max-w-mxc",
    "min-content": "o-ui-max-w-mnc",
    "fit-content": "o-ui-max-w-fc"
} as const;

export const MaxWidthClasses = { ...createOrbitSpacingScaleClasses("max-w"), ...MaxWidthAdditionalClasses };

export const MinHeightAdditionalClasses = {
    "100%": "o-ui-min-h-100",
    "auto": "o-ui-min-h-a",
    "max-content": "o-ui-min-h-mxc",
    "min-content": "o-ui-min-h-mnc",
    "fit-content": "o-ui-min-h-f"
} as const;

export const MinHeightClasses = { ...createOrbitSpacingScaleClasses("min-h"), ...MinHeightAdditionalClasses };

export const MinWidthAdditionalClasses = {
    "100%": "o-ui-min-w-100",
    "auto": "o-ui-min-w-a",
    "max-content": "o-ui-min-w-mxc",
    "min-content": "o-ui-min-w-mnc",
    "fit-content": "o-ui-min-w-f"
} as const;

export const MinWidthClasses = { ...createOrbitSpacingScaleClasses("min-w"), ...MinWidthAdditionalClasses };

export const ObjectFitClasses = {
    "fill": "o-ui-of-f",
    "contain": "o-ui-of-cnt",
    "cover": "o-ui-of-cvr",
    "none": "o-ui-of-n",
    "scale-down": "o-ui-of-sd"
} as const;

export const OverflowClasses = {
    "hidden": "o-ui-ovf-h",
    "visible": "o-ui-ovf-v",
    "scroll": "o-ui-ovf-s",
    "auto": "o-ui-ovf-a",
    "clip": "o-ui-ovf-c"
} as const;

export const OverflowXClasses = {
    "hidden": "o-ui-ovf-x-h",
    "visible": "o-ui-ovf-x-v",
    "scroll": "o-ui-ovf-x-s",
    "auto": "o-ui-ovf-x-a",
    "clip": "o-ui-ovf-x-c"
} as const;

export const OverflowYClasses = {
    "hidden": "o-ui-ovf-y-h",
    "visible": "o-ui-ovf-y-v",
    "scroll": "o-ui-ovf-y-s",
    "auto": "o-ui-ovf-y-a",
    "clip": "o-ui-ovf-y-c"
} as const;

export const PaddingClasses = createOrbitSpacingScaleClasses("pa", true);

export const PaddingTopClasses = createOrbitSpacingScaleClasses("pt", true);

export const PaddingBottomClasses = createOrbitSpacingScaleClasses("pb", true);

export const PaddingLeftClasses = createOrbitSpacingScaleClasses("pl", true);

export const PaddingRightClasses = createOrbitSpacingScaleClasses("pr", true);

export const PaddingVerticalClasses = createOrbitSpacingScaleClasses("pv", true);

export const PaddingHorizontalClasses = createOrbitSpacingScaleClasses("ph", true);

export const PointerEventsClasses = {
    "none": "o-ui-pe-n",
    "auto": "o-ui-pe-a"
} as const;


export const PositionClasses = {
    "static": "o-ui-stc",
    "fixed": "o-ui-f",
    "absolute": "o-ui-a",
    "relative": "o-ui-r",
    "sticky": "o-ui-stck"
} as const;

export const ResizeClasses = {
    "none": "o-ui-rz-n",
    "both": "o-ui-rz-b",
    "horizontal": "o-ui-rz-h",
    "vertical": "o-ui-rz-v"
} as const;

export const RightClasses = { ...createOrbitSpacingScaleClasses("right", true), "auto": "o-ui-right-auto" };

export const RowGapClasses = createOrbitSpacingScaleClasses("r-gap", true);

export const StrokeClasses = createOrbitColorClasses("stroke");

export const TextAlignClasses = {
    "start": "o-ui-ta-s",
    "end": "o-ui-ta-e",
    "left": "o-ui-ta-l",
    "right": "o-ui-ta-r",
    "center": "o-ui-ta-c",
    "justify": "o-ui-ta-j",
    "justify-all": "o-ui-ta-ja",
    "match-parent": "o-ui-ta-mp"
} as const;

export const TextDecorationClasses = {
    "underline": "o-ui-td-u",
    "strike": "o-ui-td-s",
    "no-underline": "o-ui-td-nu"
} as const;

export const TextOverflowClasses = {
    "ellipsis": "o-ui-to-ellipsis",
    "clip": "o-ui-to-clip"
} as const;

export const TextTransformClasses = {
    "uppercase": "o-ui-tt-u",
    "lowercase": "o-ui-tt-l",
    "capitalize": "o-ui-tt-c",
    "none": "o-ui-tt-n"
} as const;

export const TopClasses = { ...createOrbitSpacingScaleClasses("top", true), "auto": "o-ui-top-auto" };

export const UserSelectClasses = {
    "none": "o-ui-us-n",
    "auto": "o-ui-us-a",
    "tenxt": "o-ui-us-t",
    "contain": "o-ui-us-c",
    "all": "o-ui-us-all"
} as const;

export const VerticalAlignClasses = {
    "top": "o-ui-va-t",
    "middle": "o-ui-va-m",
    "bottom": "o-ui-va-b",
    "baseline": "o-ui-va-bs",
    "sub": "o-ui-va-sb",
    "super": "o-ui-va-sp",
    "text-top": "o-ui-va-tt",
    "text-bottom": "o-ui-va-tb"
} as const;

export const WidthAdditionalClasses = {
    "100%": "o-ui-w-100",
    "screen": "o-ui-w-s",
    "auto": "o-ui-w-a",
    "max-content": "o-ui-w-mx",
    "min-content": "o-ui-w-mn",
    "fit-content": "o-ui-w-f"
} as const;

export const WhiteSpaceClasses = {
    "nowrap": "o-ui-ws-nw",
    "pre": "o-ui-ws-p",
    "pre-wrap": "o-ui-ws-pw",
    "pre-line": "o-ui-ws-pl",
    "break-spaces": "o-ui-ws-bs",
    "normal": "o-ui-ws-n"
} as const;

export const WidthClasses = { ...createOrbitSpacingScaleClasses("w", true), ...WidthAdditionalClasses };

export const WordBreakClasses = {
    "normal": "o-ui-wb-n",
    "break-all": "o-ui-wb-b",
    "break-word": "o-ui-wb-bw",
    "keep-all": "o-ui-wb-ka"
} as const;

export const ZindexClasses = {
    0: "o-ui-z-0",
    1: "o-ui-z-1",
    2: "o-ui-z-2",
    3: "o-ui-z-3",
    4: "o-ui-z-4",
    5: "o-ui-z-5",
    "999": "o-ui-z-999",
    "9999": "o-ui-z-9999",
    "max": "o-ui-z-9999"
} as const;

export type AlignContentProp = Simplify<keyof typeof AlignContentClasses | GlobalValue>;

export type AlignItemsProp = Simplify<keyof typeof AlignItemsClasses | GlobalValue>;

export type AlignSelfProp = Simplify<keyof typeof AlignSelfClasses | GlobalValue>;

export type BackgroundColorProp = Simplify<keyof typeof BackgroundColorRoleClasses | ColorValue>;

export type BackgroundPositionProp = Simplify<LiteralUnion<keyof typeof BackgroundPositionClasses, string> | GlobalValue>;

export type BackgroundSizeProp = Simplify<LiteralUnion<keyof typeof BackgroundSizeClasses, string> | GlobalValue>;

export type BorderColorProp = Simplify<keyof typeof BorderColorRoleClasses | ColorValue>;

export type BorderRadiusProp = Simplify<keyof typeof BorderRadiusClasses | GlobalValue>;

export type BorderStyleProp = Simplify<keyof typeof BorderStyleClasses | GlobalValue>;

export type BorderWidthProp = Simplify<BorderWidthValue>;

export type BorderTopWidthProp = Simplify<BorderWidthValue>;

export type BorderBottomWidthProp = Simplify<BorderWidthValue>;

export type BorderLeftWidthProp = Simplify<BorderWidthValue>;

export type BorderRightWidthProp = Simplify<BorderWidthValue>;

export type BorderVerticalWidthProp = Simplify<BorderWidthValue>;

export type BorderHorizontalWidthProp = Simplify<BorderWidthValue>;

export type BottomProp = Simplify<LiteralUnion<keyof typeof BottomClasses, string> | SpaceValue | GlobalValue>;

export type BoxShadowProp = Simplify<keyof typeof BoxShadowClasses | GlobalValue>;

export type BoxSizingProp = Simplify<keyof typeof BoxSizingClasses | GlobalValue>;

export type ColorProp = Simplify<keyof typeof ColorRoleClasses | ColorValue>;

export type ColumnGapProp = Simplify<SpaceValue>;

export type CursorProp = Simplify<keyof typeof CursorClasses | ColorValue>;

export type DisplayProp = Simplify<keyof typeof DisplayClasses | GlobalValue>;

export type FillProp = Simplify<keyof typeof FillRoleClasses | ColorValue>;

export type FlexProp = Simplify<LiteralUnion<keyof typeof FlexClasses, string> | GlobalValue>;

export type FlexBasisProp = Simplify<keyof typeof FlexBasisClasses | LengthUnit | PercentageUnit | GlobalValue>;

export type FlexDirectionProp = Simplify<keyof typeof FlexDirectionClasses | GlobalValue>;

export type FlexGrowProp = Simplify<LiteralUnion<keyof typeof FlexGrowClasses, number> | GlobalValue>;

export type FlexShrinkProp = Simplify<LiteralUnion<keyof typeof FlexShrinkClasses, number> | GlobalValue>;

export type FlexWrapProp = Simplify<keyof typeof FlexWrapClasses | GlobalValue>;

export type FlexFlowProp = FlexDirectionProp | FlexWrapProp | `${FlexDirectionProp} ${FlexWrapProp}`;

export type FontSizeProp = Simplify<LiteralUnion<keyof typeof FontSizeClasses, string> | GlobalValue>;

export type FontWeightProp = Simplify<keyof typeof FontWeightClasses | GlobalValue>;

export type GapProp = Simplify<SpaceValue>;

export type HeightProp = Simplify<keyof typeof HeightClasses | HeightValue>;

export type JustifyContentProp = Simplify<keyof typeof JustifyContentClasses | GlobalValue>;

export type LeftProp = Simplify<LiteralUnion<keyof typeof LeftClasses, string> | SpaceValue | GlobalValue>;

export type LineHeightProp = Simplify<LiteralUnion<keyof typeof LineHeightClasses, string> | GlobalValue>;

export type MarginProp = Simplify<keyof typeof MarginClasses | LengthShorthand | GlobalValue>;

export type MarginTopProp = Simplify<keyof typeof MarginTopClasses | GlobalValue>;

export type MarginBottomProp = Simplify<keyof typeof MarginBottomClasses | SpaceValue>;

export type MarginLeftProp = Simplify<keyof typeof MarginLeftClasses | SpaceValue>;

export type MarginRightProp = Simplify<keyof typeof MarginRightClasses | SpaceValue>;

export type MarginVerticalProp = Simplify<keyof typeof MarginVerticalClasses | SpaceValue>;

export type MarginHorizontalProp = Simplify<keyof typeof MarginHorizontalClasses | SpaceValue>;

export type MaxHeightProp = Simplify<keyof typeof MaxHeightClasses | HeightValue>;

export type MaxWidthProp = Simplify<keyof typeof MaxWidthClasses | WidthValue>;

export type MinHeightProp = Simplify<keyof typeof MinHeightClasses | SpaceValue>;

export type MinWidthProp = Simplify<keyof typeof MinWidthClasses | SpaceValue>;

export type ObjectFitProp = Simplify<keyof typeof ObjectFitClasses | GlobalValue>;

export type OverflowProp = Simplify<keyof typeof OverflowClasses | GlobalValue>;

export type OverflowXProp = Simplify<keyof typeof OverflowXClasses | GlobalValue>;

export type OverflowYProp = Simplify<keyof typeof OverflowYClasses | GlobalValue>;

export type PaddingProp = Simplify<keyof typeof PaddingClasses | LengthShorthand | GlobalValue>;

export type PaddingTopProp = Simplify<SpaceValue>;

export type PaddingBottomProp = Simplify<SpaceValue>;

export type PaddingLeftProp = Simplify<SpaceValue>;

export type PaddingRightProp = Simplify<SpaceValue>;

export type PaddingVerticalProp = Simplify<SpaceValue>;

export type PaddingHorizontalProp = Simplify<SpaceValue>;

export type PointerEventsProp = Simplify<keyof typeof PointerEventsClasses | GlobalValue>;

export type PositionProp = Simplify<keyof typeof PositionClasses | GlobalValue>;

export type ResizeProp = Simplify<keyof typeof AlignContentClasses | GlobalValue>;

export type RightProp = Simplify<LiteralUnion<keyof typeof RightClasses, string> | SpaceValue | GlobalValue>;

export type RowGapProp = Simplify<SpaceValue>;

export type StrokeProp = Simplify<ColorValue>;

export type TextAlignProp = Simplify<keyof typeof TextAlignClasses | GlobalValue>;

export type TextDecorationProp = Simplify<keyof typeof TextDecorationClasses | GlobalValue>;

export type TextOverflowProp = Simplify<keyof typeof TextOverflowClasses | GlobalValue>;

export type TextTransformProp = Simplify<keyof typeof TextTransformClasses | GlobalValue>;

export type TopProp = Simplify<LiteralUnion<keyof typeof TopClasses, string> | GlobalValue>;

export type UserSelectProp = Simplify<keyof typeof UserSelectClasses | GlobalValue>;

export type VerticalAlignProp = Simplify<keyof typeof VerticalAlignClasses | GlobalValue>;

export type WhiteSpaceProp = Simplify<keyof typeof WordBreakClasses | SpaceValue>;

export type WidthProp = Simplify<keyof typeof WidthClasses | WidthValue>;

export type WordBreakProp = Simplify<keyof typeof WordBreakClasses | SpaceValue>;

export type ZindexProp = Simplify<LiteralUnion<keyof typeof ZindexClasses, string> | GlobalValue>;

// TODO: Add docs to all props.
// TODO: I think it should extends from CSSProperties
export interface StyleProps {
    alignContent?: AlignContentProp;
    alignItems?: AlignItemsProp;
    alignSelf?: AlignSelfProp;
    backgroundColor?: BackgroundColorProp;
    backgroundPosition?: BackgroundPositionProp;
    backgroundSize?: BackgroundSizeProp;
    border?: string;
    borderColor?: BorderColorProp;
    borderRadius?: BorderRadiusProp;
    borderStyle?: BorderStyleProp;
    borderWidth?: BorderWidthProp;
    borderTop?: string;
    borderTopWidth?: BorderTopWidthProp;
    borderBottom?: string;
    borderBottomWidth?: BorderBottomWidthProp;
    borderLeft?: string;
    borderLeftWidth?: BorderLeftWidthProp;
    borderRight?: string;
    borderRightWidth?: BorderRightWidthProp;
    borderVerticalWidth?: BorderVerticalWidthProp;
    borderHorizontalWidth?: BorderHorizontalWidthProp;
    bottom?: BottomProp;
    boxShadow?: BoxShadowProp;
    boxSizing?: BoxSizingProp;
    color?: ColorProp;
    columnGap?: ColumnGapProp;
    cursor?: CursorProp;
    display?: DisplayProp;
    fill?: FillProp;
    flex?: FlexProp;
    flexBasis?: FlexBasisProp;
    flexDirection?: FlexDirectionProp;
    flexFlow?: FlexFlowProp;
    flexGrow?: FlexGrowProp;
    flexShrink?: FlexShrinkProp;
    flexWrap?: FlexWrapProp;
    fontSize?: FontSizeProp;
    fontWeight?: FontWeightProp;
    gap?: GapProp;
    height?: HeightProp;
    justifyContent?: JustifyContentProp;
    left?: LeftProp;
    lineHeight?: LineHeightProp;
    margin?: MarginProp;
    marginTop?: MarginTopProp;
    marginBottom?: MarginBottomProp;
    marginLeft?: MarginLeftProp;
    marginRight?: MarginRightProp;
    marginVertical?: MarginVerticalProp;
    marginHorizontal?: MarginHorizontalProp;
    maxHeight?: MaxHeightProp;
    maxWidth?: MaxWidthProp;
    minHeight?: MinHeightProp;
    minWidth?: MinWidthProp;
    objectFit?: ObjectFitProp;
    overflow?: OverflowProp;
    overflowX?: OverflowXProp;
    overflowY?: OverflowYProp;
    padding?: PaddingProp;
    paddingTop?: PaddingTopProp;
    paddingBottom?: PaddingBottomProp;
    paddingLeft?: PaddingLeftProp;
    paddingRight?: PaddingRightProp;
    paddingVertical?: PaddingVerticalProp;
    paddingHorizontal?: PaddingHorizontalProp;
    pointerEvents?: PointerEventsProp;
    position?: PositionProp;
    resize?: ResizeProp;
    right?: RightProp;
    rowGap?: RowGapProp;
    stroke?: StrokeProp;
    textAlign?: TextAlignProp;
    textDecoration?: TextDecorationProp;
    textOverflow?: TextOverflowProp;
    textTransform?: TextTransformProp;
    top?: TopProp;
    userSelect?: UserSelectProp;
    verticalAlign?: VerticalAlignProp;
    whiteSpace?: WhiteSpaceProp;
    width?: WidthProp;
    wordBreak?: WordBreakProp;
    zIndex?: ZindexProp;
    className?: string;
    style?: CSSProperties;
}

interface Context {
    classes: string[];
    style: Record<string, any>;
}

type PropHandler<T> = (name: string, value: T, context: Context) => void;

function createPropHandler<V extends string>(classes: Record<V, string>): PropHandler<V> {
    return (name, value, context) => {
        const className = classes[value as keyof typeof classes];

        if (!isNil(className)) {
            context.classes.push(className);
        } else {
            context.style[name] = value;
        }
    };
}

// TODO: should we introduce some kind of generic shorthandHandler?
function flexFlowHandler(name: string, value: string, context: Context) {
    const parts = value.split(" ");

    if (parts.length === 2) {
        const direction = FlexDirectionClasses[parts[0] as keyof typeof FlexDirectionClasses];
        const wrap = FlexWrapClasses[parts[1] as keyof typeof FlexWrapClasses];

        if (!isNil(direction) && !isNil(wrap)) {
            context.classes.push(direction);
            context.classes.push(wrap);
        } else {
            context.style[name] = value;
        }
    } else {
        let className: any = FlexDirectionClasses[value as keyof typeof FlexDirectionClasses];

        if (!isNil(className)) {
            className = FlexWrapClasses[value as keyof typeof FlexWrapClasses];
        }

        if (!isNil(className)) {
            context.classes.push(className);
        } else {
            context.style[name] = value;
        }
    }
}

const PropsHandlers: Record<string, PropHandler<unknown>> = {
    alignContent: createPropHandler(AlignContentClasses),
    alignItems: createPropHandler(AlignItemsClasses),
    alignSelf: createPropHandler(AlignSelfClasses),
    backgroundColor: createPropHandler(BackgroundColorClasses),
    backgroundPosition: createPropHandler(BackgroundPositionClasses),
    backgroundSize: createPropHandler(BackgroundSizeClasses),
    borderColor: createPropHandler(BorderColorClasses),
    borderRadius: createPropHandler(BorderRadiusClasses),
    borderWidth: createPropHandler(BorderWidthClasses),
    borderTopWidth: createPropHandler(BorderTopWidthClasses),
    borderBottomWidth: createPropHandler(BorderBottomWidthClasses),
    borderLeftWidth: createPropHandler(BorderLeftWidthClasses),
    borderRightWidth: createPropHandler(BorderRightWidthClasses),
    borderVerticalWidth: createPropHandler(BorderVerticalWidthClasses),
    borderHorizontalWidth: createPropHandler(BorderHorizontalWidthClasses),
    bottom: createPropHandler(BottomClasses),
    boxShadow: createPropHandler(BoxShadowClasses),
    boxSizing: createPropHandler(BoxSizingClasses),
    color: createPropHandler(ColorClasses),
    columnGap: createPropHandler(ColumnGapClasses),
    cursor: createPropHandler(CursorClasses),
    display: createPropHandler(DisplayClasses),
    fill: createPropHandler(FillClasses),
    flex: createPropHandler(FlexClasses),
    flexBasis: createPropHandler(FlexBasisClasses),
    flexDirection: createPropHandler(FlexDirectionClasses),
    flexFlow: flexFlowHandler,
    flexGrow: createPropHandler(FlexGrowClasses),
    flexShrink: createPropHandler(FlexShrinkClasses),
    flexWrap: createPropHandler(FlexWrapClasses),
    fontSize: createPropHandler(FontSizeClasses),
    fontWeight: createPropHandler(FontWeightClasses),
    gap: createPropHandler(GapClasses),
    height: createPropHandler(HeightClasses),
    justifyContent: createPropHandler(JustifyContentClasses),
    left: createPropHandler(LeftClasses),
    lineHeight: createPropHandler(LineHeightClasses),
    margin: createPropHandler(MarginClasses),
    marginTop: createPropHandler(MarginTopClasses),
    marginBottom: createPropHandler(MarginBottomClasses),
    marginLeft: createPropHandler(MarginLeftClasses),
    marginRight: createPropHandler(MarginRightClasses),
    marginVertical: createPropHandler(MarginVerticalClasses),
    marginHorizontal: createPropHandler(MarginHorizontalClasses),
    maxHeight: createPropHandler(MaxHeightClasses),
    maxWidth: createPropHandler(MaxWidthClasses),
    minHeight: createPropHandler(MinHeightClasses),
    minWidth: createPropHandler(MinWidthClasses),
    objectFit: createPropHandler(ObjectFitClasses),
    overflow: createPropHandler(OverflowClasses),
    overflowX: createPropHandler(OverflowXClasses),
    overflowY: createPropHandler(OverflowYClasses),
    padding: createPropHandler(PaddingClasses),
    paddingTop: createPropHandler(PaddingTopClasses),
    paddingBottom: createPropHandler(PaddingBottomClasses),
    paddingLeft: createPropHandler(PaddingLeftClasses),
    paddingRight: createPropHandler(PaddingRightClasses),
    paddingVertical: createPropHandler(PaddingVerticalClasses),
    paddingHorizontal: createPropHandler(PaddingHorizontalClasses),
    pointerEvents: createPropHandler(PointerEventsClasses),
    position: createPropHandler(PositionClasses),
    resize: createPropHandler(ResizeClasses),
    right: createPropHandler(RightClasses),
    rowGap: createPropHandler(RowGapClasses),
    stroke: createPropHandler(StrokeClasses),
    textAlign: createPropHandler(TextAlignClasses),
    textDecoration: createPropHandler(TextDecorationClasses),
    textOverflow: createPropHandler(TextOverflowClasses),
    textTransform: createPropHandler(TextTransformClasses),
    top: createPropHandler(TopClasses),
    userSelect: createPropHandler(UserSelectClasses),
    verticalAlign: createPropHandler(VerticalAlignClasses),
    whiteSpace: createPropHandler(WhiteSpaceClasses),
    width: createPropHandler(WidthClasses),
    wordBreak: createPropHandler(WordBreakClasses),
    zIndex: createPropHandler(ZindexClasses)
};

/*
EXAMPLE:
    <Box
        backgroundColor="background-1"
        borderTopWidth={2}
        borderTopWidth={[2, 4, 8]}
        borderTopWidth={[2, "10px", 8]}
        borderTopColor="sunray-3"
    />
*/
export function useStyledSystem(props: Partial<StyleProps>) {
    return useMemo(() => {
        const { className, style, ...rest } = props;

        const context: Context = {
            classes: !isNil(className) ? [className] : [],
            style: style ?? {}
        };

        Object.entries(rest).forEach(([key, value]: Entry<StyleProps>) => {
            if (!isNil(value)) {
                const handler = PropsHandlers[key];

                if (!isNil(handler)) {
                    handler(key, value, context);
                } else {
                    context.style[key] = value;
                }
            }
        });

        return {
            className: context.classes.join(" "),
            style: context.style
        };
    }, [props]);
}
