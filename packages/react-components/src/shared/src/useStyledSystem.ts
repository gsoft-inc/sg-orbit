import { Entry, LiteralUnion } from "type-fest";
import { isNil } from "./assertions";
import { useMemo } from "react";

/*
TODO:
- Unhandled style props
- Interpolation
*/

export type GlobalValues =
    "inherit" |
    "initial" |
    "revert" |
    "unset";

const OrbitSpacing = [
    0,
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

function createOrbitSpacingClasses(section: string) {
    return OrbitSpacing.reduce((acc, x) => {
        acc[x] = `o-ui-${section}-${x}`;

        return acc;
    }, {} as Record<typeof OrbitSpacing[number], string>);
}

export type CssNamedColors =
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

export type HexColor = `#${string}`;

export type RgbColor = `rgb${string}`;

export type RgbaColor = `rgba${string}`;

export type HslColor = `hsl${string}`;

export type HslaColor = `hsla${string}`;

export type ColorCode =
    HexColor |
    RgbColor |
    RgbaColor |
    HslColor |
    HslaColor;

const OrbitColors = [
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
    "cloud-9",
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

function createOrbitColorClasses(section?: string) {
    const template = isNil(section) ? (x: string) => `o-ui-${x}` : (x: string) => `o-ui-${section}-${x}`;

    return OrbitColors.reduce((acc, x) => {
        acc[x] = template(x);

        return acc;
    }, {} as Record<typeof OrbitColors[number], string>);
}

const BackgroundColorClasses = {
    ...createOrbitColorClasses("bg"),
    "background-1": "o-ui-background-1",
    "background-2": "o-ui-background-2",
    "background-3": "o-ui-background-3",
    "background-4": "o-ui-background-4",
    "background-5": "o-ui-background-5",
    "background-6": "o-ui-background-6",
    "background-primary-1": "o-ui-primary-1",
    "background-primary-2": "o-ui-primary-2",
    "background-negative-1": "o-ui-negative-1",
    "background-negative-2": "o-ui-negative-2",
    "background-warning-1": "o-ui-warning-1",
    "background-warning-2": "o-ui-warning-2",
    "background-positive-1": "o-ui-positive-1",
    "background-positive-2": "o-ui-positive-2",
    "background-info-1": "o-ui-info-1"
} as const;

const BackgroundPositionClasses = {
    "top": "o-ui-bg-top",
    "bottom": "o-ui-bg-bottom",
    "left": "o-ui-bg-left",
    "right": "o-ui-bg-right",
    "center": "o-ui-bgp-center",
    "left-top": "o-ui-bg-left-top",
    "left-bottom": "o-ui-bg-left-bottom",
    "right-top": "o-ui-bg-right-top",
    "right-bottom": "o-ui-bg-right-bottom"
} as const;

const BackgroundSizeClasses = {
    "auto": "o-ui-bg-auto",
    "cover": "o-ui-bg-cover",
    "contain": "o-ui-bg-contain"
} as const;

const BorderColorClasses = {
    ...createOrbitColorClasses("b"),
    "border-1": "o-ui-border-1",
    "border-2": "o-ui-border-2",
    "border-3": "o-ui-border-3",
    "border-4": "o-ui-border-4",
    "border-primary-1": "o-ui-primary-1",
    "border-primary-1-translucent": "o-ui-primary-1-translucent",
    "border-negative-1": "o-ui-negative-1",
    "border-negative-1-translucent": "o-ui-negative-1-translucent",
    "border-negative-2": "o-ui-negative-2",
    "border-warning-1": "o-ui-warning-1",
    "border-positive-1": "o-ui-positive-1"
} as const;

const BorderRadiusClasses = {
    0: "o-ui-br-0",
    1: "o-ui-br-1",
    2: "o-ui-br-2",
    3: "o-ui-br-3",
    4: "o-ui-br-4",
    100: "o-ui-br-100",
    "pill": "o-ui-pill"
} as const;

const BorderStyleClasses = {
    "solid": "o-ui-b-solid",
    "dashed": "o-ui-b-dashed",
    "dotted": "o-ui-b-dotted",
    "double": "o-ui-b-double",
    "none": "o-ui-b-none"
} as const;

const BorderWidthClasses = createOrbitSpacingClasses("ba");

const BorderTopWidthClasses = createOrbitSpacingClasses("bt");

const BorderBottomWidthClasses = createOrbitSpacingClasses("bb");

const BorderLeftWidthClasses = createOrbitSpacingClasses("bl");

const BorderRightWidthClasses = createOrbitSpacingClasses("br");

const BorderVerticalWidthClasses = createOrbitSpacingClasses("bv");

const BorderHorizontalWidthClasses = createOrbitSpacingClasses("bh");

const BoxShadowClasses = {
    1: "o-ui-bs-1",
    2: "o-ui-bs-2",
    3: "o-ui-bs-3",
    4: "o-ui-bs-4"
} as const;

const ColorClasses = {
    ...createOrbitColorClasses(),
    "text-1": "o-ui-text-1",
    "text-2": "o-ui-text-2",
    "text-3": "o-ui-text-3",
    "text-4": "o-ui-text-4",
    "text-primary-1": "o-ui-text-primary-1",
    "text-negative-1": "o-ui-text-negative-1",
    "text-negative-2": "o-ui-text-negative-2",
    "text-info-1": "o-ui-text-info-1",
    "text-positive-1": "o-ui-text-positive-1",
    "text-positive-2": "o-ui-text-positive-2",
    "text-warning-1": "o-ui-text-warning-1",
    "text-warning-2": "o-ui-text-warning-2",
    "text-input-selection": "o-ui-text-input-selection",
    "text-input-placeholder": "o-ui-text-input-placeholder"
} as const;

const FillClasses = {
    ...createOrbitColorClasses("fill"),
    "icon-1": "icon-1",
    "icon-2": "icon-2",
    "icon-primary-1": "icon-primary-1",
    "icon-negative-1": "icon-negative-1",
    "icon-negative-2": "icon-negative-2",
    "icon-positive-1": "icon-positive-1",
    "icon-positive-2": "icon-positive-2",
    "icon-warning-1": "icon-warning-1",
    "icon-warning-2": "icon-warning-2",
    "icon-info-1": "icon-info-1"
} as const;

const FontSizeClasses = {
    1: "o-ui-fs-1",
    2: "o-ui-fs-2",
    3: "o-ui-fs-3",
    4: "o-ui-fs-4",
    5: "o-ui-fs-5",
    6: "o-ui-fs-6",
    7: "o-ui-fs-7",
    8: "o-ui-fs-8",
    9: "o-ui-fs-9",
    "subheadline": "o-ui-fs-subheadline",
    "headline": "o-ui-fs-headline"
} as const;

const FontWeightClasses = {
    1: "o-i-fw-1",
    2: "o-i-fw-2",
    3: "o-i-fw-3",
    4: "o-i-fw-4",
    5: "o-i-fw-5",
    6: "o-i-fw-6",
    7: "o-i-fw-7",
    8: "o-i-fw-8",
    9: "o-i-fw-9"
} as const;

const HeightClasses = {
    ...createOrbitSpacingClasses("h"),
    100: "o-ui-h-100",
    "screen": "o-ui-h-screen",
    "auto": "o-ui-h-auto"
} as const;

const LineHeightClasses = {
    1: "o-ui-lh-1",
    2: "o-ui-lh-2",
    3: "o-ui-lh-3",
    4: "o-ui-lh-4",
    5: "o-ui-lh-5",
    6: "o-ui-lh-6"
};

const MarginClasses = createOrbitSpacingClasses("ma");

const MarginTopClasses = createOrbitSpacingClasses("mt");

const MarginBottomClasses = createOrbitSpacingClasses("mb");

const MarginLeftClasses = createOrbitSpacingClasses("ml");

const MarginRightClasses = createOrbitSpacingClasses("mr");

const MarginVerticalClasses = createOrbitSpacingClasses("mv");

const MarginHorizontalClasses = createOrbitSpacingClasses("mh");

export type BackgroundColor = keyof typeof BackgroundColorClasses | CssNamedColors | ColorCode | GlobalValues;

export type BackgroundPosition = LiteralUnion<keyof typeof BackgroundPositionClasses, string> | GlobalValues;

export type BackgroundSize = LiteralUnion<keyof typeof BackgroundSizeClasses, string> | GlobalValues;

export type BorderColor = keyof typeof BorderColorClasses | CssNamedColors | ColorCode | GlobalValues;

export type BorderRadius = keyof typeof BorderRadiusClasses | GlobalValues;

export type BorderStyle = keyof typeof BorderStyleClasses | GlobalValues;

export type BorderWidth = LiteralUnion<keyof typeof BorderWidthClasses, string> | GlobalValues;

export type BorderTopWidth = LiteralUnion<keyof typeof BorderTopWidthClasses, string> | GlobalValues;

export type BorderBottomWidth = LiteralUnion<keyof typeof BorderBottomWidthClasses, string> | GlobalValues;

export type BorderLeftWidth = LiteralUnion<keyof typeof BorderLeftWidthClasses, string> | GlobalValues;

export type BorderRightWidth = LiteralUnion<keyof typeof BorderRightWidthClasses, string> | GlobalValues;

export type BorderVerticalWidth = LiteralUnion<keyof typeof BorderVerticalWidthClasses, string> | GlobalValues;

export type BorderHorizontalWidth = LiteralUnion<keyof typeof BorderHorizontalWidthClasses, string> | GlobalValues;

export type BoxShadow = LiteralUnion<keyof typeof BoxShadowClasses, string> | GlobalValues;

export type Color = keyof typeof BackgroundColorClasses | CssNamedColors | ColorCode | GlobalValues;

export type Fill = keyof typeof FillClasses | CssNamedColors | ColorCode | GlobalValues;

export type FontSize = LiteralUnion<keyof typeof FontSizeClasses, string> | GlobalValues;

export type FontWeight = keyof typeof FontWeightClasses | GlobalValues;

export type Height = LiteralUnion<keyof typeof HeightClasses, string> | GlobalValues;

export type LineHeight = LiteralUnion<keyof typeof LineHeightClasses, string> | GlobalValues;

export type Margin = LiteralUnion<keyof typeof MarginClasses, string> | GlobalValues;

export type MarginTop = LiteralUnion<keyof typeof MarginTopClasses, string> | GlobalValues;

export type MarginBottom = LiteralUnion<keyof typeof MarginBottomClasses, string> | GlobalValues;

export type MarginLeft = LiteralUnion<keyof typeof MarginLeftClasses, string> | GlobalValues;

export type MarginRight = LiteralUnion<keyof typeof MarginRightClasses, string> | GlobalValues;

export type MarginVertical = LiteralUnion<keyof typeof MarginVerticalClasses, string> | GlobalValues;

export type MarginHorizontal = LiteralUnion<keyof typeof MarginHorizontalClasses, string> | GlobalValues;

export interface StyleProps {
    backgroundColor?: BackgroundColor;
    backgroundPosition?: BackgroundPosition;
    backgroundSize?: BackgroundSize;
    border?: string;
    borderColor?: BorderColor;
    borderRadius?: BorderRadius;
    borderStyle?: BorderStyle;
    borderWidth?: BorderWidth;
    borderTop?: string;
    borderTopWidth?: BorderTopWidth;
    borderBottom?: string;
    borderBottomWidth?: BorderBottomWidth;
    borderLeft?: string;
    borderLeftWidth?: BorderLeftWidth;
    borderRight?: string;
    borderRightWidth?: BorderRightWidth;
    borderVerticalWidth?: BorderVerticalWidth;
    borderHorizontalWidth?: BorderHorizontalWidth;
    boxShadow?: BoxShadow;
    color?: Color;
    fill?: Fill;
    fontSize?: FontSize;
    fontWeight?: FontWeight;
    height?: Height;
    lineHeight?: LineHeight;
    margin?: Margin;
    marginTop?: MarginTop;
    marginBottom?: MarginBottom;
    marginLeft?: MarginLeft;
    marginRight?: MarginRight;
    marginVertical?: MarginVertical;
    marginHorizontal?: MarginHorizontal;
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

const PropsHandlers: Record<string, PropHandler<unknown>> = {
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
    boxShadow: createPropHandler(BoxShadowClasses),
    color: createPropHandler(ColorClasses),
    fill: createPropHandler(FillClasses),
    fontSize: createPropHandler(FontSizeClasses),
    fontWeight: createPropHandler(FontWeightClasses),
    height: createPropHandler(HeightClasses),
    lineHeight: createPropHandler(LineHeightClasses),
    margin: createPropHandler(MarginClasses),
    marginTop: createPropHandler(MarginTopClasses),
    marginBottom: createPropHandler(MarginBottomClasses),
    marginLeft: createPropHandler(MarginLeftClasses),
    marginRight: createPropHandler(MarginRightClasses),
    marginVertical: createPropHandler(MarginVerticalClasses),
    marginHorizontal: createPropHandler(MarginHorizontalClasses)
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
        const context: Context = {
            classes: [],
            style: []
        };

        Object.entries(props).forEach((x: Entry<StyleProps>) => {
            const [key, value] = x;

            const handler = PropsHandlers[key];

            if (!isNil(handler)) {
                handler(key, value, context);
            } else {
                context.style[key] = value;
            }
        });

        return {
            className: context.classes.join(" "),
            style: context.style
        };
    }, [props]);
}
