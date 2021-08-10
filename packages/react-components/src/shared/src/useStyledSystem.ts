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

const OrbitSpacing = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13] as const;

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

function createOrbitColorClasses(section: string) {
    return OrbitColors.reduce((acc, x) => {
        acc[x] = `o-ui-${section}-${x}`;

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

const BorderWidthClasses = {
    ...createOrbitSpacingClasses("ba"),
    0: "o-ui-ba-0"
} as const;

const BorderTopWidthClasses = {
    ...createOrbitSpacingClasses("bt"),
    0: "o-ui-bt-0"
} as const;

const BorderBottomWidthClasses = {
    ...createOrbitSpacingClasses("bb"),
    0: "o-ui-bb-0"
} as const;

const BorderLeftWidthClasses = {
    ...createOrbitSpacingClasses("bl"),
    0: "o-ui-bl-0"
} as const;
const BorderRightWidthClasses = {
    ...createOrbitSpacingClasses("br"),
    0: "o-ui-br-0"
} as const;

const BorderVerticalWidthClasses = {
    ...createOrbitSpacingClasses("bv"),
    0: "o-ui-bv-0"
} as const;

const BorderHorizontalWidthClasses = {
    ...createOrbitSpacingClasses("bh"),
    0: "o-ui-bh-0"
} as const;

export type BackgroundColor = keyof typeof BackgroundColorClasses | CssNamedColors | ColorCode | GlobalValues;

export type BackgroundPosition = LiteralUnion<keyof typeof BackgroundPositionClasses, string> | GlobalValues;

export type BackgroundSize = LiteralUnion<keyof typeof BackgroundSizeClasses, string> | GlobalValues;

export type BorderColor = LiteralUnion<keyof typeof BorderColorClasses, string> | GlobalValues;

export type BorderRadius = keyof typeof BorderRadiusClasses | GlobalValues;

export type BorderStyle = keyof typeof BorderStyleClasses | GlobalValues;

export type BorderWidth = LiteralUnion<keyof typeof BorderWidthClasses, string> | GlobalValues;

export type BorderTopWidth = LiteralUnion<keyof typeof BorderTopWidthClasses, string> | GlobalValues;

export type BorderBottomWidth = LiteralUnion<keyof typeof BorderBottomWidthClasses, string> | GlobalValues;

export type BorderLeftWidth = LiteralUnion<keyof typeof BorderLeftWidthClasses, string> | GlobalValues;

export type BorderRightWidth = LiteralUnion<keyof typeof BorderRightWidthClasses, string> | GlobalValues;

export type BorderVerticalWidth = LiteralUnion<keyof typeof BorderVerticalWidthClasses, string> | GlobalValues;

export type BorderHorizontalWidth = LiteralUnion<keyof typeof BorderHorizontalWidthClasses, string> | GlobalValues;

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
    borderHorizontalWidth: createPropHandler(BorderHorizontalWidthClasses)
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
