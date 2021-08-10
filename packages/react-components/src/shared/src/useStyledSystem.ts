import { LiteralUnion } from "type-fest";
import { isNil } from "./assertions";
import { useMemo } from "react";

/*
TODO:
- Unhandled style props

- Caching pour pair "propname|value" ?!?! -> vaut probablement pas la peine car c'est direct et sert à rien de prendre de la mem pour ça.
- Use a type for props?!?!
*/

// type SpacingScaleValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

// View https://github.com/microsoft/TypeScript/issues/29729
// export type LiteralUnion<T extends U, U = string> = T | (U & Record<never, never>);

export type GlobalValues =
    "inherit" |
    "initial" |
    "revert" |
    "unset";

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

const BackgroundColorClasses = {
    "current": "o-ui-bg-current",
    "transparent": "o-ui-bg-transparent",
    "white": "o-ui-bg-white",
    "black": "o-ui-bg-black",
    // Marine
    "marine-1": "o-ui-bg-marine-1",
    "marine-2": "o-ui-bg-marine-2",
    "marine-3": "o-ui-bg-marine-3",
    "marine-4": "o-ui-bg-marine-4",
    "marine-5": "o-ui-bg-marine-5",
    "marine-6": "o-ui-bg-marine-6",
    "marine-7": "o-ui-bg-marine-7",
    "marine-8": "o-ui-bg-marine-8",
    "marine-9": "o-ui-bg-marine-9",
    "marine-10": "o-ui-bg-marine-10",
    // Sunray
    "sunray-1": "o-ui-bg-sunray-1",
    "sunray-2": "o-ui-bg-sunray-2",
    "sunray-3": "o-ui-bg-sunray-3",
    "sunray-4": "o-ui-bg-sunray-4",
    "sunray-5": "o-ui-bg-sunray-5",
    "sunray-6": "o-ui-bg-sunray-6",
    "sunray-7": "o-ui-bg-sunray-7",
    "sunray-8": "o-ui-bg-sunray-8",
    "sunray-9": "o-ui-bg-sunray-9",
    "sunray-10": "o-ui-bg-sunray-10",
    // Moonstone
    "moonstone-1": "o-ui-bg-moonstone-1",
    "moonstone-2": "o-ui-bg-moonstone-2",
    "moonstone-3": "o-ui-bg-moonstone-3",
    "moonstone-4": "o-ui-bg-moonstone-4",
    "moonstone-5": "o-ui-bg-moonstone-5",
    "moonstone-6": "o-ui-bg-moonstone-6",
    "moonstone-7": "o-ui-bg-moonstone-7",
    "moonstone-8": "o-ui-bg-moonstone-8",
    "moonstone-9": "o-ui-bg-moonstone-9",
    "moonstone-10": "o-ui-bg-moonstone-10",
    // Cloud
    "cloud-1": "o-ui-bg-cloud-1",
    "cloud-2": "o-ui-bg-cloud-2",
    "cloud-3": "o-ui-bg-cloud-3",
    "cloud-4": "o-ui-bg-cloud-4",
    "cloud-5": "o-ui-bg-cloud-5",
    "cloud-6": "o-ui-bg-cloud-6",
    "cloud-7": "o-ui-bg-cloud-7",
    "cloud-8": "o-ui-bg-cloud-8",
    "cloud-9": "o-ui-bg-cloud-9",
    "cloud-10": "o-ui-bg-cloud-10",
    // Neutral
    "neutral-1": "o-ui-bg-neutral-1",
    "neutral-2": "o-ui-bg-neutral-2",
    "neutral-3": "o-ui-bg-neutral-3",
    "neutral-4": "o-ui-bg-neutral-4",
    "neutral-5": "o-ui-bg-neutral-5",
    "neutral-6": "o-ui-bg-neutral-6",
    "neutral-7": "o-ui-bg-neutral-7",
    "neutral-8": "o-ui-bg-neutral-8",
    "neutral-9": "o-ui-bg-neutral-9",
    "neutral-10": "o-ui-bg-neutral-10",
    // Neutral dark
    "neutral-dark-1": "o-ui-bg-neutral-dark-1",
    "neutral-dark-2": "o-ui-bg-neutral-dark-2",
    "neutral-dark-3": "o-ui-bg-neutral-dark-3",
    "neutral-dark-4": "o-ui-bg-neutral-dark-4",
    "neutral-dark-5": "o-ui-bg-neutral-dark-5",
    "neutral-dark-6": "o-ui-bg-neutral-dark-6",
    "neutral-dark-7": "o-ui-bg-neutral-dark-7",
    "neutral-dark-8": "o-ui-bg-neutral-dark-8",
    "neutral-dark-9": "o-ui-bg-neutral-dark-9",
    "neutral-dark-10": "o-ui-bg-neutral-dark-10",
    // Beetle
    "beetle-1": "o-ui-bg-beetle-1",
    "beetle-2": "o-ui-bg-beetle-2",
    "beetle-3": "o-ui-bg-beetle-3",
    "beetle-4": "o-ui-bg-beetle-4",
    "beetle-5": "o-ui-bg-beetle-5",
    "beetle-6": "o-ui-bg-beetle-6",
    "beetle-7": "o-ui-bg-beetle-7",
    "beetle-8": "o-ui-bg-beetle-8",
    "beetle-9": "o-ui-bg-beetle-9",
    "beetle-10": "o-ui-bg-beetle-10",
    // Botanic
    "botanic-1": "o-ui-bg-botanic-1",
    "botanic-2": "o-ui-bg-botanic-2",
    "botanic-3": "o-ui-bg-botanic-3",
    "botanic-4": "o-ui-bg-botanic-4",
    "botanic-5": "o-ui-bg-botanic-5",
    "botanic-6": "o-ui-bg-botanic-6",
    "botanic-7": "o-ui-bg-botanic-7",
    "botanic-8": "o-ui-bg-botanic-8",
    "botanic-9": "o-ui-bg-botanic-9",
    "botanic-10": "o-ui-bg-botanic-10",
    // Primary
    "primary-1": "o-ui-bg-primary-1",
    "primary-2": "o-ui-bg-primary-2",
    "primary-3": "o-ui-bg-primary-3",
    "primary-4": "o-ui-bg-primary-4",
    "primary-5": "o-ui-bg-primary-5",
    "primary-6": "o-ui-bg-primary-6",
    "primary-7": "o-ui-bg-primary-7",
    "primary-8": "o-ui-bg-primary-8",
    "primary-9": "o-ui-bg-primary-9",
    "primary-10": "o-ui-bg-primary-10",
    // Roles
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
};

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
};

const BackgroundSizeClasses = {
    "auto": "o-ui-bg-auto",
    "cover": "o-ui-bg-cover",
    "contain": "o-ui-bg-contain"
};

/*
DO BORDERS
- borderWidth
- borderStyle
- borderColor
- borderRadius
- borderTop
- borderTopWidth
- borderTopStyle
- borderTopColor
- borderBottom
- borderBottomStyle
- borderBottomWidth
- borderBottomColor
- borderLeft
- borderLeftStyle
- borderLeftWidth
- borderLeftColor
- borderRight
- borderRightStyle
- borderRightWidth
- borderRightColor
- borderVerticalStyle
- borderVerticalWidth
- borderVerticalColor
- borderHorizontalStyle
- borderVerticalWidth
- borderVerticalColor
*/

export type BackgroundColor = keyof typeof BackgroundColorClasses | CssNamedColors | ColorCode | GlobalValues;

export type BackgroundPosition = LiteralUnion<keyof typeof BackgroundPositionClasses, string> | GlobalValues;

export type BackgroundSize = LiteralUnion<keyof typeof BackgroundSizeClasses, string> | GlobalValues;

export interface StyleProps {
    backgroundColor?: BackgroundColor;
    backgroundPosition?: BackgroundPosition;
    backgroundSize?: BackgroundSize;
}

interface Context {
    classes: string[];
    style: Record<string, any>;
}

type PropHandler = (value: any, context: Context) => void;

const handleBackgroundColor: PropHandler = (value: BackgroundColor, context) => {
    const className = BackgroundColorClasses[value as keyof typeof BackgroundColorClasses];

    if (!isNil(className)) {
        context.classes.push(className);
    } else {
        context.style = {
            ...context.style,
            backgroundColor: value
        };
    }
};

const handleBackgroundPosition: PropHandler = (value: BackgroundPosition, context) => {
    const className = BackgroundPositionClasses[value as keyof typeof BackgroundPositionClasses];

    if (!isNil(className)) {
        context.classes.push(className);
    } else {
        context.style = {
            ...context.style,
            backgroundPosition: value
        };
    }
};

const handleBackgroundSize: PropHandler = (value: BackgroundSize, context) => {
    const className = BackgroundSizeClasses[value as keyof typeof BackgroundSizeClasses];

    if (!isNil(className)) {
        context.classes.push(className);
    } else {
        context.style = {
            ...context.style,
            backgroundPosition: value
        };
    }
};

const PropsHandlers: Record<string, PropHandler> = {
    backgroundColor: handleBackgroundColor,
    backgroundPosition: handleBackgroundPosition,
    backgroundSize: handleBackgroundSize
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

        Object.entries(props).forEach(x => {
            const [key, value] = x as [string, unknown];

            const handler = PropsHandlers[key];

            if (!isNil(handler)) {
                handler(value, context);
            }
        });

        return {
            className: context.classes.join(" "),
            style: context.style
        };
    }, [props]);
}
