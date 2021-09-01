import { CSSProperties, useMemo } from "react";
import { Entry, LiteralUnion, Simplify } from "type-fest";
import { isNil } from "./assertions";

/*
TODO:
- Breakpoints -> Breakpoint | BreakpointValue | Responsive | ResponsiveValue
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

export type SpaceValueIncludingZero = 0 | SpaceValue;

export type WidthValue =
    SpaceValueIncludingZero |
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
    0 |
    OrbitBorderWidth |
    LengthUnit |
    "thin" |
    "medium" |
    "thick" |
    GlobalValue;

export type ColorExpressionType =
    "#" |
    "rgb" |
    "rgba" |
    "hsl" |
    "hsla";

export type ColorExpression = `${ColorExpressionType}${string}`;

export type CssColor = ColorExpression;

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
    "end": "o-ui-ac-fe",
    "left": "o-ui-ac-l",
    "normal": "o-ui-ac-n",
    "right": "o-ui-ac-r",
    "space-around": "o-ui-ac-sa",
    "space-between": "o-ui-ac-sb",
    "space-evenly": "o-ui-ac-se",
    "start": "o-ui-ac-fs",
    "stretch": "o-ui-ac-s"
} as const;

export const AlignItemsClasses = {
    "baseline": "o-ui-ai-b",
    "center": "o-ui-ai-c",
    "end": "o-ui-ai-e",
    "flex-end": "o-ui-ai-fe",
    "flex-start": "o-ui-ai-fs",
    "normal": "o-ui-ai-n",
    "start": "o-ui-ai-sta",
    "stretch": "o-ui-ai-str"
} as const;

export const AlignSelfClasses = {
    "baseline": "o-ui-as-b",
    "center": "o-ui-as-c",
    "end": "o-ui-as-e",
    "flex-end": "o-ui-as-fe",
    "flex-start": "o-ui-as-fs",
    "normal": "o-ui-as-n",
    "start": "o-ui-as-strt",
    "stretch": "o-ui-as-str"
} as const;

export const AppearanceClasses = {
    "auto": "o-ui-a-a",
    "none": "o-ui-a-n",
    "menu-list-button": "o-ui-a-mlb",
    "textfield": "o-ui-a-t"
} as const;

export const BackgroundAttachmentClasses = {
    "scroll": "o-ui-bga-s",
    "fixed": "o-ui-bga-f",
    "local": "o-ui-bga-l"
} as const;

export const BackgroundClipClasses = {
    "border-box": "o-ui-bgc-bb",
    "content-box": "o-ui-bgc-cb",
    "text-box": "o-ui-bgc-tb",
    "padding-box": "o-ui-bgc-pb",
} as const;

export const BackgroundColorRoleClasses = {
    "alias-1": "o-ui-alias-bgc-1",
    "alias-2": "o-ui-alias-bgc-2",
    "alias-3": "o-ui-alias-bgc-3",
    "alias-4": "o-ui-alias-bgc-4",
    "alias-5": "o-ui-alias-bgc-5",
    "alias-6": "o-ui-alias-bgc-6",
    "alias-info-1": "o-ui-alias-bgc-info-1",
    "alias-negative-1": "o-ui-alias-bgc-negative-1",
    "alias-negative-2": "o-ui-alias-bgc-negative-2",
    "alias-positive-1": "o-ui-alias-bgc-positive-1",
    "alias-positive-2": "o-ui-alias-bgc-positive-2",
    "alias-primary-1": "o-ui-alias-bgc-primary-1",
    "alias-primary-2": "o-ui-alias-bgc-primary-2",
    "alias-warning-1": "o-ui-alias-bgc-warning-1",
    "alias-warning-2": "o-ui-alias-bgc-warning-2"
} as const;

export const BackgroundColorClasses = { ...createOrbitColorClasses("bgc"), ...BackgroundColorRoleClasses };

export const BackgroundPositionClasses = {
    "bottom": "o-ui-bgp-b",
    "center": "o-ui-bgp-c",
    "left": "o-ui-bgp-l",
    "left-bottom": "o-ui-bgp-lb",
    "left-top": "o-ui-bgp-lt",
    "right": "o-ui-bgp-r",
    "right-bottom": "o-ui-bgp-rb",
    "right-top": "o-ui-bgp-rt",
    "top": "o-ui-bgp-t"
} as const;

export const BackgroundRepeatClasses = {
    "repeat-x": "o-ui-bgr-rx",
    "repeat-y": "o-ui-bgr-ry",
    "repeat": "o-ui-bgr-rpt",
    "no-repeat": "o-ui-bgr-nr",
    "space": "o-ui-bgr-s",
    "round": "o-ui-bgr-rnd"
} as const;

export const BackgroundSizeClasses = {
    "auto": "o-ui-bgs-a",
    "contain": "o-ui-bgs-cnt",
    "cover": "o-ui-bgs-cvr"
} as const;

export const BorderColorRoleClasses = {
    "alias-1": "o-ui-alias-b-1",
    "alias-2": "o-ui-alias-b-2",
    "alias-3": "o-ui-alias-b-3",
    "alias-4": "o-ui-alias-b-4",
    "alias-negative-1": "o-ui-alias-b-negative-1",
    "alias-negative-1-translucent": "o-ui-alias-b-negative-1-translucent",
    "alias-negative-2": "o-ui-alias-b-negative-2",
    "alias-positive-1": "o-ui-alias-b-positive-1",
    "alias-primary-1": "o-ui-alias-b-primary-1",
    "alias-primary-1-translucent": "o-ui-alias-b-primary-1-translucent",
    "alias-warning-1": "o-ui-alias-b-warning-1"
} as const;

export const BorderColorClasses = { ...createOrbitColorClasses("b"), ...BorderColorRoleClasses };

export const BorderRadiusClasses = {
    0: "o-ui-b-radius-0",
    1: "o-ui-b-radius-1",
    "100": "o-ui-b-radius-100",
    2: "o-ui-b-radius-2",
    3: "o-ui-b-radius-3",
    4: "o-ui-b-radius-4",
    "pill": "o-ui-pill"
} as const;

export const BorderStyleClasses = {
    "dashed": "o-ui-b-da",
    "dotted": "o-ui-b-dt",
    "double": "o-ui-b-db",
    "none": "o-ui-b-n",
    "solid": "o-ui-b-s"
} as const;

export const BorderWidthClasses = createOrbitBorderWidthScaleClasses("ba", true);

export const BorderTopWidthClasses = createOrbitBorderWidthScaleClasses("bt", true);

export const BorderBottomWidthClasses = createOrbitBorderWidthScaleClasses("bb", true);

export const BorderLeftWidthClasses = createOrbitBorderWidthScaleClasses("bl", true);

export const BorderRightWidthClasses = createOrbitBorderWidthScaleClasses("br", true);

export const BottomClasses = { ...createOrbitSpacingScaleClasses("bottom", true), "auto": "o-ui-bottom-auto" };

export const BoxShadowClasses = {
    1: "o-ui-bs-1",
    2: "o-ui-bs-2",
    3: "o-ui-bs-3",
    4: "o-ui-bs-4",
    "alias-floating": "o-ui-alias-bs-floating",
    "alias-lifted": "o-ui-alias-bs-lifted",
    "alias-raised": "o-ui-alias-bs-raised",
    "alias-skim": "o-ui-alias-bs-skim"
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
    "alias-info-1": "o-ui-alias-text-info-1",
    "alias-input-placeholder": "o-ui-alias-text-input-placeholder",
    "alias-input-selection": "o-ui-alias-text-input-selection",
    "alias-negative-1": "o-ui-alias-text-negative-1",
    "alias-negative-2": "o-ui-alias-text-negative-2",
    "alias-positive-1": "o-ui-alias-text-positive-1",
    "alias-positive-2": "o-ui-alias-text-positive-2",
    "alias-primary-1": "o-ui-alias-text-primary-1",
    "alias-warning-1": "o-ui-alias-text-warning-1",
    "alias-warning-2": "o-ui-alias-text-warning-2"
} as const;

export const ColorClasses = { ...createOrbitColorClasses(), ...ColorRoleClasses };

export const ColumnGapClasses = createOrbitSpacingScaleClasses("c-gap", true);

export const CursorClasses = {
    "auto": "o-ui-c-a",
    "crosshair": "o-ui-c-c",
    "grab": "o-ui-c-g",
    "help": "o-ui-c-h",
    "not-allowed": "o-ui-c-na",
    "wait": "o-ui-c-w",
    "zoom-in": "o-ui-c-zi"
} as const;

export const DisplayClasses = {
    "block": "o-ui-db",
    "flex": "o-ui-df",
    "grid": "o-ui-dg",
    "inline": "o-ui-di",
    "inline-block": "o-ui-dib",
    "inline-flex": "o-ui-dif",
    "inline-grid": "o-ui-dig",
    "inline-table": "o-ui-dit",
    "list-item": "o-ui-dli",
    "none": "o-ui-dn",
    "table": "o-ui-dt",
    "table-caption": "o-ui-dt-caption",
    "table-cell": "o-ui-dt-cell",
    "table-column": "o-ui-dt-column",
    "table-column-group": "o-ui-dt-cg",
    "table-footer-group": "o-ui-dt-fg",
    "table-header-group": "o-ui-dt-hg",
    "table-row": "o-ui-dt-row",
    "table-row-group": "o-ui-dt-rg"
} as const;

export const FillRoleClasses = {
    "alias-icon-1": "o-ui-alias-icon-1",
    "alias-icon-2": "o-ui-alias-icon-2",
    "alias-icon-info-1": "o-ui-alias-icon-info-1",
    "alias-icon-negative-1": "o-ui-alias-icon-negative-1",
    "alias-icon-negative-2": "o-ui-alias-icon-negative-2",
    "alias-icon-positive-1": "o-ui-alias-icon-positive-1",
    "alias-icon-positive-2": "o-ui-alias-icon-positive-2",
    "alias-icon-primary-1": "o-ui-alias-icon-primary-1",
    "alias-icon-warning-1": "o-ui-alias-icon-warning-1",
    "alias-icon-warning-2": "o-ui-alias-icon-warning-2"
} as const;

export const FillClasses = { ...createOrbitColorClasses("fill"), ...FillRoleClasses };

export const FlexBasisClasses = {
    "auto": "o-ui-b-a",
    "content": "o-ui-b-c",
    "fill": "o-ui-b-f",
    "fit-content": "o-ui-b-f",
    "max-content": "o-ui-b-mxc",
    "min-content": "o-ui-b-mnc"
} as const;

export const FlexClasses = {
    "auto": "o-ui-f-a",
    "max-content": "o-ui-f-mx",
    "min-content": "o-ui-f-mn",
    "none": "o-ui-f-n"
} as const;

export const FlexDirectionClasses = {
    "column": "o-ui-fd-c",
    "column-reverse": "o-ui-fd-cr",
    "row": "o-ui-fd-r",
    "row-reverse": "o-ui-fd-rr"
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
    "nowrap": "o-ui-fw-nw",
    "wrap": "o-ui-fw-w",
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
    "headline": "o-ui-headline",
    "subheadline": "o-ui-subheadline"
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
    "auto": "o-ui-h-auto",
    "fit-content": "o-ui-h-fit",
    "max-content": "o-ui-h-max",
    "min-content": "o-ui-h-min",
    "screen": "o-ui-h-screen"
} as const;

export const HeightClasses = { ...createOrbitSpacingScaleClasses("h", true), ...HeightAdditionalClasses };

export const JustifyContentClasses = {
    "center": "o-ui-jc-c",
    "end": "o-ui-jc-e",
    "left": "o-ui-jc-l",
    "normal": "o-ui-jc-n",
    "right": "o-ui-jc-r",
    "space-around": "o-ui-jc-a",
    "space-between": "o-ui-jc-b",
    "space-evenly": "o-ui-jc-evn",
    "start": "o-ui-jc-strt",
    "stretch": "o-ui-jc-str"
} as const;

export const LeftClasses = { ...createOrbitSpacingScaleClasses("left", true), "auto": "o-ui-left-auto" };

export const LineHeightClasses = {
    1: "o-ui-lh-1",
    2: "o-ui-lh-2",
    3: "o-ui-lh-3",
    4: "o-ui-lh-4",
    5: "o-ui-lh-5",
    6: "o-ui-lh-6",
    "none": "o-ui-lh-none",
    "normal": "o-ui-lh-normal"
} as const;

export const MarginClasses = { ...createOrbitSpacingScaleClasses("ma", true), "auto": "o-ui-ma-auto" };

export const MarginTopClasses = { ...createOrbitSpacingScaleClasses("mt", true), "auto": "o-ui-mt-auto" };

export const MarginBottomClasses = { ...createOrbitSpacingScaleClasses("mb", true), "auto": "o-ui-mb-auto" };

export const MarginLeftClasses = { ...createOrbitSpacingScaleClasses("ml", true), "auto": "o-ui-ml-auto" };

export const MarginRightClasses = { ...createOrbitSpacingScaleClasses("mr", true), "auto": "o-ui-mr-auto" };

export const MarginXClasses = { ...createOrbitSpacingScaleClasses("mh", true), "auto": "o-ui-mh-auto" };

export const MarginYClasses = { ...createOrbitSpacingScaleClasses("mv", true), "auto": "o-ui-mv-auto" };

export const MaxHeightAdditionalClasses = {
    "100%": "o-ui-mh-100",
    "auto": "o-ui-mh-a",
    "fit-content": "o-ui-mh-f",
    "max-content": "o-ui-mh-mx",
    "min-content": "o-ui-mh-mn"
} as const;

export const MaxHeightClasses = { ...createOrbitSpacingScaleClasses("mh-"), ...MaxHeightAdditionalClasses };

export const MaxWidthAdditionalClasses = {
    "100%": "o-ui-max-w-100",
    "auto": "o-ui-max-w-a",
    "fit-content": "o-ui-max-w-fc",
    "max-content": "o-ui-max-w-mxc",
    "min-content": "o-ui-max-w-mnc"
} as const;

export const MaxWidthClasses = { ...createOrbitSpacingScaleClasses("max-w"), ...MaxWidthAdditionalClasses };

export const MinHeightAdditionalClasses = {
    "100%": "o-ui-min-h-100",
    "auto": "o-ui-min-h-a",
    "fit-content": "o-ui-min-h-f",
    "max-content": "o-ui-min-h-mxc",
    "min-content": "o-ui-min-h-mnc"
} as const;

export const MinHeightClasses = { ...createOrbitSpacingScaleClasses("min-h"), ...MinHeightAdditionalClasses };

export const MinWidthAdditionalClasses = {
    "100%": "o-ui-min-w-100",
    "auto": "o-ui-min-w-a",
    "fit-content": "o-ui-min-w-f",
    "max-content": "o-ui-min-w-mxc",
    "min-content": "o-ui-min-w-mnc"
} as const;

export const MinWidthClasses = { ...createOrbitSpacingScaleClasses("min-w"), ...MinWidthAdditionalClasses };

export const ObjectFitClasses = {
    "contain": "o-ui-of-cnt",
    "cover": "o-ui-of-cvr",
    "fill": "o-ui-of-f",
    "none": "o-ui-of-n",
    "scale-down": "o-ui-of-sd"
} as const;

export const OpacityClasses = {
    "visible": "o-ui-of-v",
    "not-visible": "o-ui-opc-nv",
    "disabled": "o-ui-opc-d"
} as const;

export const OutlineClasses = {
    "none": "o-ui-o-n"
} as const;

export const OverflowClasses = {
    "auto": "o-ui-ovf-a",
    "clip": "o-ui-ovf-c",
    "hidden": "o-ui-ovf-h",
    "scroll": "o-ui-ovf-s",
    "visible": "o-ui-ovf-v"
} as const;

export const OverflowXClasses = {
    "auto": "o-ui-ovf-x-a",
    "clip": "o-ui-ovf-x-c",
    "hidden": "o-ui-ovf-x-h",
    "scroll": "o-ui-ovf-x-s",
    "visible": "o-ui-ovf-x-v"
} as const;

export const OverflowYClasses = {
    "auto": "o-ui-ovf-y-a",
    "clip": "o-ui-ovf-y-c",
    "hidden": "o-ui-ovf-y-h",
    "scroll": "o-ui-ovf-y-s",
    "visible": "o-ui-ovf-y-v"
} as const;

export const PaddingClasses = createOrbitSpacingScaleClasses("pa", true);

export const PaddingTopClasses = createOrbitSpacingScaleClasses("pt", true);

export const PaddingBottomClasses = createOrbitSpacingScaleClasses("pb", true);

export const PaddingLeftClasses = createOrbitSpacingScaleClasses("pl", true);

export const PaddingRightClasses = createOrbitSpacingScaleClasses("pr", true);

export const PaddingXClasses = createOrbitSpacingScaleClasses("ph", true);

export const PaddingYClasses = createOrbitSpacingScaleClasses("pv", true);

export const PointerEventsClasses = {
    "auto": "o-ui-pe-a",
    "none": "o-ui-pe-n"
} as const;


export const PositionClasses = {
    "absolute": "o-ui-a",
    "fixed": "o-ui-f",
    "relative": "o-ui-r",
    "static": "o-ui-stc",
    "sticky": "o-ui-stck"
} as const;

export const ResizeClasses = {
    "both": "o-ui-rz-b",
    "horizontal": "o-ui-rz-h",
    "none": "o-ui-rz-n",
    "vertical": "o-ui-rz-v"
} as const;

export const RightClasses = { ...createOrbitSpacingScaleClasses("right", true), "auto": "o-ui-right-auto" };

export const RowGapClasses = createOrbitSpacingScaleClasses("r-gap", true);

export const StrokeClasses = createOrbitColorClasses("stroke");

export const TextAlignClasses = {
    "center": "o-ui-ta-c",
    "end": "o-ui-ta-e",
    "justify": "o-ui-ta-j",
    "justify-all": "o-ui-ta-ja",
    "left": "o-ui-ta-l",
    "match-parent": "o-ui-ta-mp",
    "right": "o-ui-ta-r",
    "start": "o-ui-ta-s"
} as const;

export const TextDecorationClasses = {
    "no-underline": "o-ui-td-nu",
    "strike": "o-ui-td-s",
    "underline": "o-ui-td-u"
} as const;

export const TextOverflowClasses = {
    "clip": "o-ui-to-clip",
    "ellipsis": "o-ui-to-ellipsis"
} as const;

export const TextTransformClasses = {
    "capitalize": "o-ui-tt-c",
    "lowercase": "o-ui-tt-l",
    "none": "o-ui-tt-n",
    "uppercase": "o-ui-tt-u"
} as const;

export const TopClasses = { ...createOrbitSpacingScaleClasses("top", true), "auto": "o-ui-top-auto" };

export const UserSelectClasses = {
    "all": "o-ui-us-all",
    "auto": "o-ui-us-a",
    "contain": "o-ui-us-c",
    "none": "o-ui-us-n",
    "tenxt": "o-ui-us-t"
} as const;

export const VerticalAlignClasses = {
    "baseline": "o-ui-va-bs",
    "bottom": "o-ui-va-b",
    "middle": "o-ui-va-m",
    "sub": "o-ui-va-sb",
    "super": "o-ui-va-sp",
    "text-bottom": "o-ui-va-tb",
    "text-top": "o-ui-va-tt",
    "top": "o-ui-va-t"
} as const;

export const WidthAdditionalClasses = {
    "100%": "o-ui-w-100",
    "auto": "o-ui-w-a",
    "fit-content": "o-ui-w-f",
    "max-content": "o-ui-w-mx",
    "min-content": "o-ui-w-mn",
    "screen": "o-ui-w-s"
} as const;

export const WhiteSpaceClasses = {
    "break-spaces": "o-ui-ws-bs",
    "normal": "o-ui-ws-n",
    "nowrap": "o-ui-ws-nw",
    "pre": "o-ui-ws-p",
    "pre-line": "o-ui-ws-pl",
    "pre-wrap": "o-ui-ws-pw"
} as const;

export const WidthClasses = { ...createOrbitSpacingScaleClasses("w", true), ...WidthAdditionalClasses };

export const WordBreakClasses = {
    "break-all": "o-ui-wb-b",
    "break-word": "o-ui-wb-bw",
    "keep-all": "o-ui-wb-ka",
    "normal": "o-ui-wb-n"
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

export type AppearanceProp = Simplify<keyof typeof AppearanceClasses | GlobalValue>;

export type BackgroundAttachmentProp = Simplify<LiteralUnion<keyof typeof BackgroundAttachmentClasses, string> | GlobalValue>;

export type BackgroundClipProp = Simplify<keyof typeof BackgroundClipClasses | GlobalValue>;

export type BackgroundColorProp = Simplify<keyof typeof BackgroundColorRoleClasses | ColorValue>;

export type BackgroundPositionProp = Simplify<LiteralUnion<keyof typeof BackgroundPositionClasses, string> | GlobalValue>;

export type BackgroundRepeatProp = Simplify<LiteralUnion<keyof typeof BackgroundRepeatClasses, string> | GlobalValue>;

export type BackgroundSizeProp = Simplify<LiteralUnion<keyof typeof BackgroundSizeClasses, string> | GlobalValue>;

export type BorderColorProp = Simplify<keyof typeof BorderColorRoleClasses | ColorValue>;

export type BorderRadiusProp = Simplify<keyof typeof BorderRadiusClasses | GlobalValue>;

export type BorderStyleProp = Simplify<keyof typeof BorderStyleClasses | GlobalValue>;

export type BorderWidthProp = Simplify<BorderWidthValue>;

export type BorderTopWidthProp = Simplify<BorderWidthValue>;

export type BorderBottomWidthProp = Simplify<BorderWidthValue>;

export type BorderLeftWidthProp = Simplify<BorderWidthValue>;

export type BorderRightWidthProp = Simplify<BorderWidthValue>;

export type BottomProp = Simplify<LiteralUnion<keyof typeof BottomClasses, string> | Omit<SpaceValue, OrbitSpace> | GlobalValue>;

export type BoxShadowProp = Simplify<keyof typeof BoxShadowClasses | GlobalValue>;

export type BoxSizingProp = Simplify<keyof typeof BoxSizingClasses | GlobalValue>;

export type ColorProp = Simplify<keyof typeof ColorRoleClasses | ColorValue>;

export type ColumnGapProp = Simplify<LiteralUnion<SpaceValueIncludingZero, string>>;

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

export type GapProp = Simplify<LiteralUnion<SpaceValueIncludingZero, string>>;

export type HeightProp = Simplify<keyof typeof HeightClasses | HeightValue>;

export type JustifyContentProp = Simplify<keyof typeof JustifyContentClasses | GlobalValue>;

export type LeftProp = Simplify<LiteralUnion<keyof typeof LeftClasses, string> | Omit<SpaceValue, OrbitSpace> | GlobalValue>;

export type LineHeightProp = Simplify<LiteralUnion<keyof typeof LineHeightClasses, string> | GlobalValue>;

export type MarginProp = Simplify<keyof typeof MarginClasses | LengthShorthand | GlobalValue>;

export type MarginTopProp = Simplify<keyof typeof MarginTopClasses | GlobalValue>;

export type MarginBottomProp = Simplify<keyof typeof MarginBottomClasses | Omit<SpaceValue, OrbitSpace>>;

export type MarginLeftProp = Simplify<keyof typeof MarginLeftClasses | Omit<SpaceValue, OrbitSpace>>;

export type MarginRightProp = Simplify<keyof typeof MarginRightClasses | Omit<SpaceValue, OrbitSpace>>;

export type MarginXProp = Simplify<keyof typeof MarginXClasses | Omit<SpaceValue, OrbitSpace>>;

export type MarginYProp = Simplify<keyof typeof MarginYClasses | Omit<SpaceValue, OrbitSpace>>;

export type MaxHeightProp = Simplify<keyof typeof MaxHeightClasses | HeightValue>;

export type MaxWidthProp = Simplify<keyof typeof MaxWidthClasses | WidthValue>;

export type MinHeightProp = Simplify<keyof typeof MinHeightClasses | Omit<SpaceValue, OrbitSpace>>;

export type MinWidthProp = Simplify<keyof typeof MinWidthClasses | Omit<SpaceValue, OrbitSpace>>;

export type ObjectFitProp = Simplify<keyof typeof ObjectFitClasses | GlobalValue>;

export type OpacityProp = Simplify<keyof typeof OpacityClasses | GlobalValue>;

export type OutlineProp = Simplify<keyof typeof OutlineClasses | GlobalValue>;

export type OverflowProp = Simplify<keyof typeof OverflowClasses | GlobalValue>;

export type OverflowXProp = Simplify<keyof typeof OverflowXClasses | GlobalValue>;

export type OverflowYProp = Simplify<keyof typeof OverflowYClasses | GlobalValue>;

export type PaddingProp = Simplify<keyof typeof PaddingClasses | LengthShorthand | GlobalValue>;

export type PaddingTopProp = Simplify<SpaceValueIncludingZero>;

export type PaddingBottomProp = Simplify<SpaceValueIncludingZero>;

export type PaddingLeftProp = Simplify<SpaceValueIncludingZero>;

export type PaddingRightProp = Simplify<SpaceValueIncludingZero>;

export type PaddingXProp = Simplify<SpaceValueIncludingZero>;

export type PaddingYProp = Simplify<SpaceValueIncludingZero>;

export type PointerEventsProp = Simplify<keyof typeof PointerEventsClasses | GlobalValue>;

export type PositionProp = Simplify<keyof typeof PositionClasses | GlobalValue>;

export type ResizeProp = Simplify<keyof typeof ResizeClasses | GlobalValue>;

export type RightProp = Simplify<LiteralUnion<keyof typeof RightClasses, string> | Omit<SpaceValue, OrbitSpace> | GlobalValue>;

export type RowGapProp = Simplify<LiteralUnion<SpaceValueIncludingZero, string>>;

export type StrokeProp = Simplify<ColorValue>;

export type TextAlignProp = Simplify<keyof typeof TextAlignClasses | GlobalValue>;

export type TextDecorationProp = Simplify<keyof typeof TextDecorationClasses | GlobalValue>;

export type TextOverflowProp = Simplify<keyof typeof TextOverflowClasses | GlobalValue>;

export type TextTransformProp = Simplify<keyof typeof TextTransformClasses | GlobalValue>;

export type TopProp = Simplify<LiteralUnion<keyof typeof TopClasses, string> | GlobalValue>;

export type UserSelectProp = Simplify<keyof typeof UserSelectClasses | GlobalValue>;

export type VerticalAlignProp = Simplify<keyof typeof VerticalAlignClasses | GlobalValue>;

export type WhiteSpaceProp = Simplify<keyof typeof WordBreakClasses | GlobalValue>;

export type WidthProp = Simplify<keyof typeof WidthClasses | WidthValue>;

export type WordBreakProp = Simplify<keyof typeof WordBreakClasses | GlobalValue>;

export type ZindexProp = Simplify<LiteralUnion<keyof typeof ZindexClasses, string> | GlobalValue>;

// TODO: Add docs to all props.
// TODO: I think it should extends from CSSProperties
export interface StyleProps {
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
    appearance?: AppearanceProp;
    /**
     * @ignore
     */
    backgroundAttachment?: BackgroundAttachmentProp;
    /**
     * @ignore
     */
    backgroundClip?: BackgroundClipProp;
    /**
     * @ignore
     */
    backgroundColor?: BackgroundColorProp;
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
    border?: string;
    /**
     * @ignore
     */
    borderBottom?: string;
    /**
     * @ignore
     */
    borderBottomWidth?: BorderBottomWidthProp;
    /**
     * @ignore
     */
    borderColor?: BorderColorProp;
    /**
     * @ignore
     */
    borderLeft?: string;
    /**
     * @ignore
     */
    borderLeftWidth?: BorderLeftWidthProp;
    /**
     * @ignore
     */
    borderRadius?: BorderRadiusProp;
    /**
     * @ignore
     */
    borderRight?: string;
    /**
     * @ignore
     */
    borderRightWidth?: BorderRightWidthProp;
    /**
     * @ignore
     */
    borderStyle?: BorderStyleProp;
    /**
     * @ignore
     */
    borderTop?: string;
    /**
     * @ignore
     */
    borderTopWidth?: BorderTopWidthProp;
    /**
     * @ignore
     */
    borderWidth?: BorderWidthProp;
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
    boxSizing?: BoxSizingProp;
    /**
     * @ignore
     */
    className?: string;
    /**
     * @ignore
     */
    color?: ColorProp;
    /**
     * @ignore
     */
    columnGap?: ColumnGapProp;
    /**
     * @ignore
     */
    cursor?: CursorProp;
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
    fontWeight?: FontWeightProp;
    /**
     * @ignore
     */
    gap?: GapProp;
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
    left?: LeftProp;
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
    opacity?: OpacityProp;
    /**
     * @ignore
     */
    outline?: OutlineProp;
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
    style?: CSSProperties;
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
    userSelect?: UserSelectProp;
    /**
     * @ignore
     */
    verticalAlign?: VerticalAlignProp;
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
    wordBreak?: WordBreakProp;
    /**
     * @ignore
     */
    zIndex?: ZindexProp;
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
    appearance: createPropHandler(AppearanceClasses),
    backgroundClip: createPropHandler(BackgroundClipClasses),
    backgroundColor: createPropHandler(BackgroundColorClasses),
    backgroundPosition: createPropHandler(BackgroundPositionClasses),
    backgroundSize: createPropHandler(BackgroundSizeClasses),
    borderBottomWidth: createPropHandler(BorderBottomWidthClasses),
    borderColor: createPropHandler(BorderColorClasses),
    borderLeftWidth: createPropHandler(BorderLeftWidthClasses),
    borderRadius: createPropHandler(BorderRadiusClasses),
    borderRightWidth: createPropHandler(BorderRightWidthClasses),
    borderTopWidth: createPropHandler(BorderTopWidthClasses),
    borderWidth: createPropHandler(BorderWidthClasses),
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
    marginBottom: createPropHandler(MarginBottomClasses),
    marginLeft: createPropHandler(MarginLeftClasses),
    marginRight: createPropHandler(MarginRightClasses),
    marginTop: createPropHandler(MarginTopClasses),
    marginX: createPropHandler(MarginXClasses),
    marginY: createPropHandler(MarginYClasses),
    maxHeight: createPropHandler(MaxHeightClasses),
    maxWidth: createPropHandler(MaxWidthClasses),
    minHeight: createPropHandler(MinHeightClasses),
    minWidth: createPropHandler(MinWidthClasses),
    objectFit: createPropHandler(ObjectFitClasses),
    opacity: createPropHandler(OpacityClasses),
    outline: createPropHandler(OutlineClasses),
    overflow: createPropHandler(OverflowClasses),
    overflowX: createPropHandler(OverflowXClasses),
    overflowY: createPropHandler(OverflowYClasses),
    padding: createPropHandler(PaddingClasses),
    paddingBottom: createPropHandler(PaddingBottomClasses),
    paddingLeft: createPropHandler(PaddingLeftClasses),
    paddingRight: createPropHandler(PaddingRightClasses),
    paddingTop: createPropHandler(PaddingTopClasses),
    paddingX: createPropHandler(PaddingXClasses),
    paddingY: createPropHandler(PaddingYClasses),
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
