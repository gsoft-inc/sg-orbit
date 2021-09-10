import { CSSProperties } from "markdown-to-jsx/node_modules/@types/react";
import { Entry, LiteralUnion, Simplify } from "type-fest";
import { isNil } from "./assertions";
import { useMemo } from "react";

/*
TODO:
- Breakpoints -> Breakpoint | BreakpointValue | Responsive | ResponsiveValue
*/

export type GlobalValue =
    "inherit" |
    "initial" |
    "revert" |
    "unset";

export const OrbitSpacingScale = [
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

export type OrbitSpaceIncludingZero = 0 | OrbitSpace;

function createOrbitSpacingScaleClasses<IncludeZero extends boolean = false>(section: string, includeZero?: IncludeZero) {
    const classes: Record<number | string, string> = {};

    if (includeZero) {
        classes[0] = `o-ui-${section}-0`;
    }

    OrbitSpacingScale.reduce((acc, x) => {
        acc[x] = `o-ui-${section}-${x}`;

        return acc;
    }, classes);

    return classes as Record<IncludeZero extends true ? OrbitSpaceIncludingZero : OrbitSpace, string>;
}

export const OrbitColors = [
    "inherit",
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

export const OrbitBorderColorsAliases = [
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

function createOrbitBorderColorAliasesClasses(section?: string) {
    const template = isNil(section) ? (x: string) => `o-ui-${x}` : (x: string) => `o-ui-${section}-${x}`;

    return OrbitBorderColorsAliases.reduce((acc, x) => {
        acc[x] = template(x);

        return acc;
    }, {} as Record<typeof OrbitBorderColorsAliases[number], string>);
}

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

export const BackgroundAttachmentClasses = {
    "fixed": "o-ui-bga-f",
    "local": "o-ui-bga-l",
    "scroll": "o-ui-bga-s"
} as const;

export const BackgroundClipClasses = {
    "border-box": "o-ui-bgc-bb",
    "content-box": "o-ui-bgc-cb",
    "padding-box": "o-ui-bgc-pb",
    "text-box": "o-ui-bgc-tb"
} as const;

export const BackgroundColorRoleClasses = {
    "alias-1": "o-ui-bg-alias-1",
    "alias-2": "o-ui-bg-alias-2",
    "alias-3": "o-ui-bg-alias-3",
    "alias-4": "o-ui-bg-alias-4",
    "alias-5": "o-ui-bg-alias-5",
    "alias-6": "o-ui-bg-alias-6",
    "alias-info-1": "o-ui-bg-alias-info-1",
    "alias-negative-1": "o-ui-bg-alias-negative-1",
    "alias-negative-2": "o-ui-bg-alias-negative-2",
    "alias-positive-1": "o-ui-bg-alias-positive-1",
    "alias-positive-2": "o-ui-bg-alias-positive-2",
    "alias-primary-1": "o-ui-bg-alias-primary-1",
    "alias-primary-2": "o-ui-bg-alias-primary-2",
    "alias-warning-1": "o-ui-bg-alias-warning-1",
    "alias-warning-2": "o-ui-bg-alias-warning-2"
} as const;

export const BackgroundColorClasses = { ...createOrbitColorClasses("bg"), ...BackgroundColorRoleClasses };

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
    "no-repeat": "o-ui-bgr-nr",
    "repeat": "o-ui-bgr-rpt",
    "repeat-x": "o-ui-bgr-rx",
    "repeat-y": "o-ui-bgr-ry",
    "round": "o-ui-bgr-rnd",
    "space": "o-ui-bgr-s"
} as const;

export const BackgroundSizeClasses = {
    "auto": "o-ui-bgs-a",
    "contain": "o-ui-bgs-cnt",
    "cover": "o-ui-bgs-cvr"
} as const;

export const BorderAdditionalClasses = {
    "0": "o-ui-ba-n",
    "none": "o-ui-ba-n"
} as const;

export const BorderClasses = { ...createOrbitColorClasses("b"), ...createOrbitBorderColorAliasesClasses("b"), ...BorderAdditionalClasses };

export const BorderBottomAdditionalClasses = {
    "0": "o-ui-bb-n",
    "none": "o-ui-bb-n"
} as const;

export const BorderBottomClasses = { ...createOrbitColorClasses("b"), ...createOrbitBorderColorAliasesClasses("b"), ...BorderBottomAdditionalClasses };

export const BorderLeftAdditionalClasses = {
    "0": "o-ui-bl-n",
    "none": "o-ui-bl-n"
} as const;

export const BorderLeftClasses = { ...createOrbitColorClasses("b"), ...createOrbitBorderColorAliasesClasses("b"), ...BorderLeftAdditionalClasses };

export const BorderRightAdditionalClasses = {
    "0": "o-ui-br-n",
    "none": "o-ui-br-n"
} as const;

export const BorderRightClasses = { ...createOrbitColorClasses("b"), ...createOrbitBorderColorAliasesClasses("b"), ...BorderRightAdditionalClasses };

export const BorderTopAdditionalClasses = {
    "0": "o-ui-bt-n",
    "none": "o-ui-bt-n"
} as const;

export const BorderTopClasses = { ...createOrbitColorClasses("b"), ...createOrbitBorderColorAliasesClasses("b"), ...BorderTopAdditionalClasses };

export const BorderRadiusClasses = {
    0: "o-ui-b-radius-0",
    1: "o-ui-b-radius-1",
    2: "o-ui-b-radius-2",
    3: "o-ui-b-radius-3",
    4: "o-ui-b-radius-4",
    "100%": "o-ui-b-radius-100",
    "pill": "o-ui-pill"
} as const;

export const BoxShadowClasses = {
    1: "o-ui-bs-1",
    2: "o-ui-bs-2",
    3: "o-ui-bs-3",
    4: "o-ui-bs-4",
    "alias-floating": "o-ui-bs-alias-floating",
    "alias-lifted": "o-ui-bs-alias-lifted",
    "alias-raised": "o-ui-bs-alias-raised",
    "alias-skim": "o-ui-bs-alias-skim"
} as const;

export const BoxSizingClasses = {
    "border-box": "o-ui-bs-bb",
    "content-box": "o-ui-bs-cb"
} as const;


export const ColorRoleClasses = {
    "alias-1": "o-ui-text-alias-1",
    "alias-2": "o-ui-text-alias-2",
    "alias-3": "o-ui-text-alias-3",
    "alias-4": "o-ui-text-alias-4",
    "alias-info-1": "o-ui-text-alias-info-1",
    "alias-input-placeholder": "o-ui-text-alias-input-placeholder",
    "alias-input-selection": "o-ui-text-alias-input-selection",
    "alias-negative-1": "o-ui-text-alias-negative-1",
    "alias-negative-2": "o-ui-text-alias-negative-2",
    "alias-positive-1": "o-ui-text-alias-positive-1",
    "alias-positive-2": "o-ui-text-alias-positive-2",
    "alias-primary-1": "o-ui-text-alias-primary-1",
    "alias-warning-1": "o-ui-text-alias-warning-1",
    "alias-warning-2": "o-ui-text-alias-warning-2"
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
    "icon-alias-1": "o-ui-icon-alias-1",
    "icon-alias-2": "o-ui-icon-alias-2",
    "icon-alias-info-1": "o-ui-icon-alias-info-1",
    "icon-alias-negative-1": "o-ui-icon-alias-negative-1",
    "icon-alias-negative-2": "o-ui-icon-alias-negative-2",
    "icon-alias-positive-1": "o-ui-icon-alias-positive-1",
    "icon-alias-positive-2": "o-ui-icon-alias-positive-2",
    "icon-alias-primary-1": "o-ui-icon-alias-primary-1",
    "icon-alias-warning-1": "o-ui-icon-alias-warning-1",
    "icon-alias-warning-2": "o-ui-icon-alias-warning-2"
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
    "disabled": "o-ui-opc-d",
    "not-visible": "o-ui-opc-nv",
    "visible": "o-ui-of-v"
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

export const RowGapClasses = createOrbitSpacingScaleClasses("r-gap", true);

export const StrokeRoleClasses = {
    "icon-alias-1": "o-ui-icon-alias-1",
    "icon-alias-2": "o-ui-icon-alias-2",
    "icon-alias-info-1": "o-ui-icon-alias-info-1",
    "icon-alias-negative-1": "o-ui-icon-alias-negative-1",
    "icon-alias-negative-2": "o-ui-icon-alias-negative-2",
    "icon-alias-positive-1": "o-ui-icon-alias-positive-1",
    "icon-alias-positive-2": "o-ui-icon-alias-positive-2",
    "icon-alias-primary-1": "o-ui-icon-alias-primary-1",
    "icon-alias-warning-1": "o-ui-icon-alias-warning-1",
    "icon-alias-warning-2": "o-ui-icon-alias-warning-2"
} as const;

export const StrokeClasses = { ...createOrbitColorClasses("stroke"), ...StrokeRoleClasses };

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

export type AlignContentProp = Simplify<keyof typeof AlignContentClasses | GlobalValue>;

export type AlignItemsProp = Simplify<keyof typeof AlignItemsClasses | GlobalValue>;

export type AlignSelfProp = Simplify<keyof typeof AlignSelfClasses | GlobalValue>;

export type AppearanceProp = string;

export type BackgroundAttachmentProp = Simplify<LiteralUnion<keyof typeof BackgroundAttachmentClasses, string>>;

export type BackgroundClipProp = Simplify<keyof typeof BackgroundClipClasses | GlobalValue>;

export type BackgroundColorProp = Simplify<LiteralUnion<keyof typeof BackgroundColorClasses, string>>;

export type BackgroundPositionProp = Simplify<LiteralUnion<keyof typeof BackgroundPositionClasses, string>>;

export type BackgroundRepeatProp = Simplify<LiteralUnion<keyof typeof BackgroundRepeatClasses, string>>;

export type BackgroundSizeProp = Simplify<LiteralUnion<keyof typeof BackgroundSizeClasses, string>>;

export type BorderProp = Simplify<LiteralUnion<keyof typeof BorderClasses, string>>;

export type BorderBottomProp = Simplify<LiteralUnion<keyof typeof BorderBottomClasses, string>>;

export type BorderLeftProp = Simplify<LiteralUnion<keyof typeof BorderLeftClasses, string>>;

export type BorderRadiusProp = Simplify<LiteralUnion<keyof typeof BorderRadiusClasses, string>>;

export type BorderRightProp = Simplify<LiteralUnion<keyof typeof BorderRightClasses, string>>;

export type BorderTopProp = Simplify<LiteralUnion<keyof typeof BorderTopClasses, string>>;

export type BottomProp = string;

export type BoxShadowProp = Simplify<LiteralUnion<keyof typeof BoxShadowClasses, string>>;

export type BoxSizingProp = Simplify<keyof typeof BoxSizingClasses | GlobalValue>;

export type ColorProp = Simplify<LiteralUnion<keyof typeof ColorRoleClasses, string>>;

export type ColumnGapProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type CursorProp = Simplify<keyof typeof CursorClasses> | GlobalValue;

export type DisplayProp = Simplify<keyof typeof DisplayClasses | GlobalValue>;

export type FillProp = Simplify<LiteralUnion<keyof typeof FillRoleClasses, string>>;

export type FlexProp = Simplify<LiteralUnion<keyof typeof FlexClasses, string>>;

export type FlexBasisProp = Simplify<LiteralUnion<keyof typeof FlexBasisClasses, string>>;

export type FlexDirectionProp = Simplify<keyof typeof FlexDirectionClasses | GlobalValue>;

export type FlexGrowProp = Simplify<LiteralUnion<keyof typeof FlexGrowClasses, number>>;

export type FlexShrinkProp = Simplify<LiteralUnion<keyof typeof FlexShrinkClasses, number>>;

export type FlexWrapProp = Simplify<keyof typeof FlexWrapClasses | GlobalValue>;

export type FlexFlowProp = Simplify<FlexDirectionProp | FlexWrapProp | `${FlexDirectionProp} ${FlexWrapProp}`>;

export type FontSizeProp = Simplify<LiteralUnion<keyof typeof FontSizeClasses, string>>;

export type FontWeightProp = Simplify<keyof typeof FontWeightClasses | GlobalValue>;

export type GapProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type HeightProp = Simplify<LiteralUnion<keyof typeof HeightClasses, string>>;

export type ImageOrientationProp = string;

export type ImageRenderingProp = string;

export type JustifyContentProp = Simplify<keyof typeof JustifyContentClasses | GlobalValue>;

export type LeftProp = string;

export type LineHeightProp = Simplify<LiteralUnion<keyof typeof LineHeightClasses, string>>;

export type MarginProp = Simplify<LiteralUnion<keyof typeof MarginClasses, string>>;

export type MarginTopProp = Simplify<LiteralUnion<keyof typeof MarginTopClasses, string>>;

export type MarginBottomProp = Simplify<LiteralUnion<keyof typeof MarginBottomClasses, string>>;

export type MarginLeftProp = Simplify<LiteralUnion<keyof typeof MarginLeftClasses, string>>;

export type MarginRightProp = Simplify<LiteralUnion<keyof typeof MarginRightClasses, string>>;

export type MarginXProp = Simplify<LiteralUnion<keyof typeof MarginXClasses, string>>;

export type MarginYProp = Simplify<LiteralUnion<keyof typeof MarginYClasses, string>>;

export type MaxHeightProp = Simplify<LiteralUnion<keyof typeof MaxHeightClasses, string>>;

export type MaxWidthProp = Simplify<LiteralUnion<keyof typeof MaxWidthClasses, string>>;

export type MinHeightProp = Simplify<LiteralUnion<keyof typeof MinHeightClasses, string>>;

export type MinWidthProp = Simplify<LiteralUnion<keyof typeof MinWidthClasses, string>>;

export type ObjectFitProp = Simplify<keyof typeof ObjectFitClasses | GlobalValue>;

export type ObjectPositionProp = string;

export type OpacityProp = Simplify<keyof typeof OpacityClasses | GlobalValue>;

export type OrderProp = Simplify<number | GlobalValue>;

export type OutlineProp = Simplify<keyof typeof OutlineClasses | GlobalValue>;

export type OverflowProp = Simplify<keyof typeof OverflowClasses | GlobalValue>;

export type OverflowXProp = Simplify<keyof typeof OverflowXClasses | GlobalValue>;

export type OverflowYProp = Simplify<keyof typeof OverflowYClasses | GlobalValue>;

export type PaddingProp = Simplify<LiteralUnion<keyof typeof PaddingClasses, string>>;

export type PaddingTopProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type PaddingBottomProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type PaddingLeftProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type PaddingRightProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type PaddingXProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type PaddingYProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type PointerEventsProp = Simplify<keyof typeof PointerEventsClasses | GlobalValue>;

export type PositionProp = Simplify<keyof typeof PositionClasses | GlobalValue>;

export type ResizeProp = Simplify<keyof typeof ResizeClasses | GlobalValue>;

export type RightProp = string;

export type RowGapProp = Simplify<LiteralUnion<OrbitSpaceIncludingZero, string>>;

export type StrokeProp = Simplify<LiteralUnion<OrbitColor, string>>;

export type TextAlignProp = Simplify<keyof typeof TextAlignClasses | GlobalValue>;

export type TextDecorationProp = string;

export type TextOverflowProp = Simplify<keyof typeof TextOverflowClasses | GlobalValue>;

export type TextTransformProp = Simplify<keyof typeof TextTransformClasses | GlobalValue>;

export type TopProp = string;

export type UserSelectProp = string;

export type VerticalAlignProp = Simplify<keyof typeof VerticalAlignClasses | GlobalValue>;

export type WhiteSpaceProp = Simplify<keyof typeof WhiteSpaceClasses | GlobalValue>;

export type WidthProp = Simplify<LiteralUnion<keyof typeof WidthClasses, string>>;

export type WordBreakProp = Simplify<keyof typeof WordBreakClasses | GlobalValue>;

export type ZindexProp = string;

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
    border?: BorderProp;
    /**
     * @ignore
     */
    borderBottom?: BorderBottomProp;
    /**
     * @ignore
     */
    borderLeft?: BorderLeftProp;
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
    borderTop?: BorderTopProp;
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
    imageOrientation?: ImageOrientationProp;
    /**
     * @ignore
     */
    imageRendering?: ImageRenderingProp;
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
    objectPosition?: ObjectPositionProp;
    /**
     * @ignore
     */
    opacity?: OpacityProp;
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

class StylingContext {
    private classes: string[];
    private style: Record<string, any>;

    constructor(className?: string, style?: CSSProperties) {
        this.classes = !isNil(className) ? [className] : [];
        this.style = style ?? {};
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

function createClassesHandler<TValue extends string>(classes: Record<TValue, string>): PropHandler<TValue> {
    return (name, value, context) => {
        const className = classes[value as keyof typeof classes];

        if (!isNil(className)) {
            context.addClass(className);
        } else {
            context.addStyleValue(name, value);
        }
    };
}

const BorderWidthClasses = {
    "border": "o-ui-ba",
    "borderBottom": "o-ui-bb",
    "borderLeft": "o-ui-bl",
    "borderRight": "o-ui-br",
    "borderTop": "o-ui-bt"
} as const;

// Custom handler for borders to allow the following syntax:
// - border="sunray-10" -> className="o-ui-ba o-ui-b-sunray-10"
// - border="hsla(223, 12%, 87%, 1)" -> className="o-ui-ba" & style={{ borderColor: hsla(223, 12%, 87%, 1) }}
function borderHandler<TValue extends string>(classes: Record<TValue, string>): PropHandler<TValue> {
    return (name: keyof typeof BorderWidthClasses, value, context) => {
        const className = classes[value as keyof typeof classes];

        if (!isNil(className)) {
            context.addClass(BorderWidthClasses[name]);
            context.addClass(className);
        } else if (value.startsWith("#") || value.startsWith("rgb") || value.startsWith("rgba") || value.startsWith("hsl") || value.startsWith("hsla")) {
            context.addClass(BorderWidthClasses[name]);
            context.addStyleValue("borderColor", value);
        } else {
            context.addStyleValue(name, value);
        }
    };
}

function flexFlowHandler(name: string, value: string, context: StylingContext) {
    const parts = value.split(" ");

    if (parts.length === 2) {
        const direction = FlexDirectionClasses[parts[0] as keyof typeof FlexDirectionClasses];
        const wrap = FlexWrapClasses[parts[1] as keyof typeof FlexWrapClasses];

        if (!isNil(direction) && !isNil(wrap)) {
            context.addClass(direction);
            context.addClass(wrap);
        } else {
            context.addStyleValue(name, value);
        }
    } else {
        let className: any = FlexDirectionClasses[value as keyof typeof FlexDirectionClasses];

        if (!isNil(className)) {
            className = FlexWrapClasses[value as keyof typeof FlexWrapClasses];
        }

        if (!isNil(className)) {
            context.addClass(className);
        } else {
            context.addStyleValue(name, value);
        }
    }
}

const PropsHandlers: Record<string, PropHandler<unknown>> = {
    alignContent: createClassesHandler(AlignContentClasses),
    alignItems: createClassesHandler(AlignItemsClasses),
    alignSelf: createClassesHandler(AlignSelfClasses),
    backgroundAttachment: createClassesHandler(BackgroundAttachmentClasses),
    backgroundClip: createClassesHandler(BackgroundClipClasses),
    backgroundColor: createClassesHandler(BackgroundColorClasses),
    backgroundPosition: createClassesHandler(BackgroundPositionClasses),
    backgroundSize: createClassesHandler(BackgroundSizeClasses),
    border: borderHandler(BorderClasses),
    borderBottom: borderHandler(BorderBottomClasses),
    borderLeft: borderHandler(BorderLeftClasses),
    borderRadius: createClassesHandler(BorderRadiusClasses),
    borderRight: borderHandler(BorderRightClasses),
    borderTop: borderHandler(BorderTopClasses),
    boxShadow: createClassesHandler(BoxShadowClasses),
    boxSizing: createClassesHandler(BoxSizingClasses),
    color: createClassesHandler(ColorClasses),
    columnGap: createClassesHandler(ColumnGapClasses),
    cursor: createClassesHandler(CursorClasses),
    display: createClassesHandler(DisplayClasses),
    fill: createClassesHandler(FillClasses),
    flex: createClassesHandler(FlexClasses),
    flexBasis: createClassesHandler(FlexBasisClasses),
    flexDirection: createClassesHandler(FlexDirectionClasses),
    flexFlow: flexFlowHandler,
    flexGrow: createClassesHandler(FlexGrowClasses),
    flexShrink: createClassesHandler(FlexShrinkClasses),
    flexWrap: createClassesHandler(FlexWrapClasses),
    fontSize: createClassesHandler(FontSizeClasses),
    fontWeight: createClassesHandler(FontWeightClasses),
    gap: createClassesHandler(GapClasses),
    height: createClassesHandler(HeightClasses),
    justifyContent: createClassesHandler(JustifyContentClasses),
    lineHeight: createClassesHandler(LineHeightClasses),
    margin: createClassesHandler(MarginClasses),
    marginBottom: createClassesHandler(MarginBottomClasses),
    marginLeft: createClassesHandler(MarginLeftClasses),
    marginRight: createClassesHandler(MarginRightClasses),
    marginTop: createClassesHandler(MarginTopClasses),
    marginX: createClassesHandler(MarginXClasses),
    marginY: createClassesHandler(MarginYClasses),
    maxHeight: createClassesHandler(MaxHeightClasses),
    maxWidth: createClassesHandler(MaxWidthClasses),
    minHeight: createClassesHandler(MinHeightClasses),
    minWidth: createClassesHandler(MinWidthClasses),
    objectFit: createClassesHandler(ObjectFitClasses),
    opacity: createClassesHandler(OpacityClasses),
    outline: createClassesHandler(OutlineClasses),
    overflow: createClassesHandler(OverflowClasses),
    overflowX: createClassesHandler(OverflowXClasses),
    overflowY: createClassesHandler(OverflowYClasses),
    padding: createClassesHandler(PaddingClasses),
    paddingBottom: createClassesHandler(PaddingBottomClasses),
    paddingLeft: createClassesHandler(PaddingLeftClasses),
    paddingRight: createClassesHandler(PaddingRightClasses),
    paddingTop: createClassesHandler(PaddingTopClasses),
    paddingX: createClassesHandler(PaddingXClasses),
    paddingY: createClassesHandler(PaddingYClasses),
    pointerEvents: createClassesHandler(PointerEventsClasses),
    position: createClassesHandler(PositionClasses),
    resize: createClassesHandler(ResizeClasses),
    rowGap: createClassesHandler(RowGapClasses),
    stroke: createClassesHandler(StrokeClasses),
    textAlign: createClassesHandler(TextAlignClasses),
    textOverflow: createClassesHandler(TextOverflowClasses),
    textTransform: createClassesHandler(TextTransformClasses),
    verticalAlign: createClassesHandler(VerticalAlignClasses),
    whiteSpace: createClassesHandler(WhiteSpaceClasses),
    width: createClassesHandler(WidthClasses),
    wordBreak: createClassesHandler(WordBreakClasses)
};

export function useStyledSystem<TProps extends Record<string, any>>({
    alignContent,
    alignItems,
    alignSelf,
    appearance,
    backgroundAttachment,
    backgroundClip,
    backgroundColor,
    backgroundPosition,
    backgroundRepeat,
    backgroundSize,
    border,
    borderBottom,
    borderLeft,
    borderRadius,
    borderRight,
    borderTop,
    bottom,
    boxShadow,
    boxSizing,
    className,
    color,
    columnGap,
    cursor,
    display,
    fill,
    flex,
    flexBasis,
    flexDirection,
    flexFlow,
    flexGrow,
    flexShrink,
    flexWrap,
    fontSize,
    fontWeight,
    gap,
    height,
    imageOrientation,
    imageRendering,
    justifyContent,
    left,
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
    order,
    outline,
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
    userSelect,
    verticalAlign,
    whiteSpace,
    width,
    wordBreak,
    zIndex,
    ...rest
}: TProps) {
    const styling = useMemo(() => {
        const styleProps: StyledSystemProps = {
            alignContent,
            alignItems,
            alignSelf,
            appearance,
            backgroundAttachment,
            backgroundClip,
            backgroundColor,
            backgroundPosition,
            backgroundRepeat,
            backgroundSize,
            border,
            borderBottom,
            borderLeft,
            borderRadius,
            borderRight,
            borderTop,
            bottom,
            boxShadow,
            boxSizing,
            color,
            columnGap,
            cursor,
            display,
            fill,
            flex,
            flexBasis,
            flexDirection,
            flexFlow,
            flexGrow,
            flexShrink,
            flexWrap,
            fontSize,
            fontWeight,
            gap,
            height,
            imageOrientation,
            imageRendering,
            justifyContent,
            left,
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
            order,
            outline,
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
            position,
            resize,
            right,
            rowGap,
            stroke,
            textAlign,
            textDecoration,
            textOverflow,
            textTransform,
            top,
            userSelect,
            verticalAlign,
            whiteSpace,
            width,
            wordBreak,
            zIndex
        };

        const context = new StylingContext(className, style);

        Object.entries(styleProps).forEach(([key, value]: Entry<TProps>) => {
            if (!isNil(value)) {
                const handler = PropsHandlers[key];

                if (!isNil(handler)) {
                    handler(key, value, context);
                } else {
                    context.addStyleValue(key, value);
                }
            }
        });

        return context.computeStyling();
    }, [
        appearance,
        alignContent,
        alignItems,
        alignSelf,
        backgroundAttachment,
        backgroundClip,
        backgroundColor,
        backgroundPosition,
        backgroundRepeat,
        backgroundSize,
        border,
        borderBottom,
        borderLeft,
        borderRadius,
        borderRight,
        borderTop,
        bottom,
        boxShadow,
        boxSizing,
        className,
        color,
        columnGap,
        cursor,
        display,
        fill,
        flex,
        flexBasis,
        flexDirection,
        flexFlow,
        flexGrow,
        flexShrink,
        flexWrap,
        fontSize,
        fontWeight,
        gap,
        height,
        imageOrientation,
        imageRendering,
        justifyContent,
        left,
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
        order,
        outline,
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
        userSelect,
        verticalAlign,
        whiteSpace,
        width,
        wordBreak,
        zIndex
    ]);

    return {
        ...rest,
        className: styling.className,
        style: styling.style
    } as Omit<TProps, keyof StyledSystemProps>;
}
