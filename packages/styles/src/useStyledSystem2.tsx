import { BorderRadiusPrefix, BoxShadowPrefix, ColorPrefix, FontSizePrefix, FontWeightPrefix, LineHeightPrefix, SpacePrefix, normalizeVariable } from "./createCss";
import { CSSProperties, useMemo } from "react";
import { LiteralUnion, Simplify } from "type-fest";
import { isNil, isObject } from "./assertions";
import { useBreakpoint } from "./BreakpointProvider";

/*
CASES:

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

export interface ResponsiveValue<T> {
    base?: T;
    l?: T;
    m?: T;
    s?: T;
}

export type GlobalValue2 =
    "inherit" |
    "initial" |
    "revert" |
    "unset";

export type ColorKeyword =
    "currentColor" |
    "transparent";

export type SpacingKeyword =
    "max-content" |
    "min-content" |
    "fit-content" |
    `fit-content(${string})` |
    "auto";

export type NoneKeyword = "none";

const ColorExpressionTypes = [
    "#",
    "rgb",
    "rgba",
    "hsl",
    "hsla"
];

const SpacingScale2 = [
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

const LineHeightScale = [
    1,
    2,
    3,
    4,
    5,
    6
] as const;

// TODO: add TS typing to generate intellisense.
// Would be nice if the string | number would be infered from keys of the values.
function createValuesMapping(values: Record<string | number, any>, template: (value: string) => string) {
    const mapping: Record<string | number, string> = {};

    values.reduce((acc, x) => {
        acc[x] = template(x);

        return acc;
    }, mapping);

    return mapping;
}

function composePrefixes(...rest) {
    return rest.reduce((acc, prefix) => {
        return !isNil(prefix) ? `${acc}-${prefix}` : acc;
    }, "");
}

function createPrefixedValueTemplate(prefix: string) {
    return (value: string) => `var(${normalizeVariable(value, prefix)})`;
}

export const SpacingMapping = createValuesMapping(SpacingScale2, createPrefixedValueTemplate(SpacePrefix));

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

export const FontWeightMapping = createValuesMapping(FontWeightScale, createPrefixedValueTemplate(FontWeightPrefix));

export const IconMapping = {
    ...createValuesMapping(IconColorAliases, createPrefixedValueTemplate(composePrefixes(ColorPrefix, "icon"))),
    ...ColorMapping
};

// TODO: fix typings
export type BackgroundColorValue = Simplify<LiteralUnion<keyof typeof BackgroundColorMapping, string> | ColorKeyword | GlobalValue2>;
export type BorderValue = Simplify<LiteralUnion<keyof typeof BorderMapping, string> | ColorKeyword | GlobalValue2>;
export type BorderRadiusValue = Simplify<LiteralUnion<keyof typeof BorderRadiusMapping, string> | GlobalValue2>;
export type BoxShadowValue = Simplify<LiteralUnion<keyof typeof BoxShadowMapping, string> | NoneKeyword | GlobalValue2>;
export type FontSizeValue = Simplify<LiteralUnion<keyof typeof FontSizeMapping, string> | GlobalValue2>;
export type FontWeightValue = Simplify<LiteralUnion<keyof typeof FontWeightMapping, string> | GlobalValue2>;
export type IconValue = Simplify<LiteralUnion<keyof typeof IconMapping, string> | ColorKeyword | GlobalValue2>;
export type WidthValue = Simplify<LiteralUnion<keyof typeof SpacingMapping, string> | SpacingKeyword | GlobalValue2>;

export type BackgroundColorProp2 = BackgroundColorValue | ResponsiveValue<BackgroundColorValue>;
export type BorderProp2 = BorderValue | ResponsiveValue<BorderValue>;
export type BorderBottomProp2 = BorderProp2;
export type BorderLeftProp2 = BorderProp2;
export type BorderRightProp2 = BorderProp2;
export type BorderTopProp2 = BorderProp2;
export type BorderRadiusProp2 = BorderRadiusValue | ResponsiveValue<BorderRadiusValue>;
export type BorderBottomLeftRadiusProp2 = BorderRadiusProp2;
export type BorderBottomRightRadiusProp2 = BorderRadiusProp2;
export type BorderTopLeftRadiusProp2 = BorderRadiusProp2;
export type BorderTopRightRadiusProp2 = BorderRadiusProp2;
export type BoxShadowProp2 = BoxShadowValue | ResponsiveValue<BoxShadowValue>;
export type FillProp2 = IconValue | ResponsiveValue<IconValue>;
export type FontSizeProp2 = FontSizeValue | ResponsiveValue<FontSizeValue>;
export type FontWeightProp2 = FontWeightValue | ResponsiveValue<FontWeightValue>;
export type StrokeProp2 = IconValue | ResponsiveValue<IconValue>;
export type WidthProp2 = WidthValue | ResponsiveValue<WidthValue>;

export interface StyledSystemProps2 {
    /**
     * @ignore
     */
    backgroundColor?: BackgroundColorProp2;
    /**
     * @ignore
     */
    backgroundColorHover?: BackgroundColorProp2;
    /**
     * @ignore
     */
    border?: BorderProp2;
    /**
     * @ignore
     */
    borderBottom?: BorderBottomProp2;
    /**
     * @ignore
     */
    borderBottomHover?: BorderBottomProp2;
    /**
     * @ignore
     */
    borderBottomLeftRadius?: BorderRadiusProp2;
    /**
     * @ignore
     */
    borderBottomRightRadius?: BorderRadiusProp2;
    /**
     * @ignore
     */
    borderHover?: BorderProp2;
    /**
     * @ignore
     */
    borderLeft?: BorderLeftProp2;
    /**
     * @ignore
     */
    borderLeftHover?: BorderLeftProp2;
    /**
     * @ignore
     */
    borderRadius?: BorderRadiusProp2;
    /**
     * @ignore
     */
    borderRight?: BorderRightProp2;
    /**
     * @ignore
     */
    borderRightHover?: BorderRightProp2;
    /**
     * @ignore
     */
    borderTop?: BorderTopProp2;
    /**
     * @ignore
     */
    borderTopHover?: BorderTopProp2;
    /**
     * @ignore
     */
    borderTopLeftRadius?: BorderRadiusProp2;
    /**
     * @ignore
     */
    borderTopRightRadius?: BorderRadiusProp2;
    /**
     * @ignore
     */
    boxShadow?: BoxShadowProp2;
    /**
     * @ignore
     */
    boxShadowHover?: BoxShadowProp2;
    /**
     * @ignore
     */
    fill?: FillProp2;
    /**
     * @ignore
     */
    fillHover?: FillProp2;
    /**
     * @ignore
     */
    fontSize?: FontSizeProp2;
    /**
     * @ignore
     */
    fontWeight?: FontWeightProp2;
    /**
     * @ignore
     */
    stroke?: StrokeProp2;
    /**
     * @ignore
     */
    width?: WidthProp2;
}

class StylingContext {
    private classes: string[];
    private style: Record<string, any>;
    breakpoint: string;

    constructor(className: string, style: CSSProperties, breakpoint: string) {
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

function parsePropValue<T>(value: T | ResponsiveValue<T>, breakpoint: string): T {
    if (isObject(value)) {
        const responsiveValue = value[breakpoint ?? "base"];

        return (responsiveValue ?? value["base"]) as T;
    }

    return value as T;
}

function tryAddSystemValue<T extends Record<string | number, string>>(name: string, value: keyof T, systemValues: T, context: StylingContext) {
    const systemValue = systemValues[value as keyof typeof systemValues];

    if (!isNil(systemValue)) {
        context.addStyleValue(name, systemValue);

        return true;
    }

    return false;
}

function createHandler<TValue extends string | number>(systemValues?: Record<TValue, string>): PropHandler<TValue> {
    const systemValuesHandler = (name, value, context: StylingContext) => {
        // Trying to hit a system value before parsing for a responsive value.
        if (tryAddSystemValue(name, value, systemValues, context)) {
            return;
        }

        const parsedValue = parsePropValue(value, context.breakpoint);

        if (!isNil(parsedValue)) {
            if (!tryAddSystemValue(name, parsedValue, systemValues, context)) {
                context.addStyleValue(name, parsedValue);
            }
        }
    };

    const passThroughHandler = (name, value, context: StylingContext) => {
        const responsiveValue = parsePropValue(value, context.breakpoint);

        if (!isNil(responsiveValue)) {
            context.addStyleValue(name, !isNil(responsiveValue) ? responsiveValue : value);
        }
    };

    return !isNil(systemValues) ? systemValuesHandler : passThroughHandler;
}

function createPseudoHandler<TValue extends string | number>(pseudoClassName, pseudoVariable, systemValues?: Record<TValue, string>): PropHandler<TValue> {
    const systemValuesHandler = (name, value, context: StylingContext) => {
        context.addClass(pseudoClassName);

        // Trying to hit a system value before parsing for a responsive value.
        if (tryAddSystemValue(pseudoVariable, value, systemValues, context)) {
            return;
        }

        const parsedValue = parsePropValue(value, context.breakpoint);

        if (!isNil(parsedValue)) {
            if (!tryAddSystemValue(pseudoVariable, parsedValue, systemValues, context)) {
                context.addStyleValue(pseudoVariable, parsedValue);
            }
        }
    };

    const passThroughHandler = (name, value, context: StylingContext) => {
        const responsiveValue = parsePropValue(value, context.breakpoint);

        if (!isNil(responsiveValue)) {
            context.addClass(pseudoClassName);
            context.addStyleValue(pseudoVariable, !isNil(responsiveValue) ? responsiveValue : value);
        }
    };

    return !isNil(systemValues) ? systemValuesHandler : passThroughHandler;
}

type BorderProp =
    "border" |
    "borderBottom" |
    "borderLeft" |
    "borderRight" |
    "borderTop";

// Custom handler for borders to allow the following syntax:
// - border="sunray-10" -> style="1px solid var(--o-ui-sunray-10)"
// - border="hsla(223, 12%, 87%, 1)" -> style="1px solid hsla(223, 12%, 87%, 1)"
function borderHandler<TValue extends string>(systemValues: Record<TValue, string>): PropHandler<TValue> {
    return (name: BorderProp, value, context) => {
        // Trying to hit a system value before parsing for a responsive value.
        if (tryAddSystemValue(name, value, systemValues, context)) {
            return;
        }

        const parsedValue = parsePropValue(value, context.breakpoint);

        if (!isNil(parsedValue)) {
            if (!tryAddSystemValue(name, parsedValue, systemValues, context)) {
                if (ColorExpressionTypes.some(x => parsedValue.startsWith(x))) {
                    context.addStyleValue(name, `${BorderWidthAndStyle} ${parsedValue}`);
                }
                else {
                    context.addStyleValue(name, parsedValue);
                }
            }
        }
    };
}

function borderHandlerPseudo<TValue extends string>(pseudoClassName, pseudoVariable, systemValues: Record<TValue, string>): PropHandler<TValue> {
    return (name: BorderProp, value, context) => {
        context.addClass(pseudoClassName);

        // Trying to hit a system value before parsing for a responsive value.
        if (tryAddSystemValue(pseudoVariable, value, systemValues, context)) {
            return;
        }

        const parsedValue = parsePropValue(value, context.breakpoint);

        if (!isNil(parsedValue)) {
            if (!tryAddSystemValue(pseudoVariable, parsedValue, systemValues, context)) {
                if (ColorExpressionTypes.some(x => parsedValue.startsWith(x))) {
                    context.addStyleValue(pseudoVariable, `${BorderWidthAndStyle} ${parsedValue}`);
                }
                else {
                    context.addStyleValue(pseudoVariable, parsedValue);
                }
            }
        }
    };
}

function fontWeightHandler(name: string, value: string, context: StylingContext) {
    context.addStyleValue("fontVariationSettings", `'wght' ${value}`);
    context.addStyleValue("fontWeight", "400");
}

const PropsHandlers: Record<string, PropHandler<unknown>> = {
    backgroundColor: createHandler(BackgroundColorMapping),
    backgroundColorHover: createPseudoHandler("o-ui-bg-hover", "--o-ui-bg-hover", BackgroundColorMapping),
    border: borderHandler(BorderMapping),
    borderBottom: borderHandler(BorderMapping),
    borderBottomHover: borderHandlerPseudo("o-ui-bb-hover", "--o-ui-bb-hover", BorderMapping),
    borderBottomLeftRadius: createHandler(BorderRadiusMapping),
    borderBottomRightRadius: createHandler(BorderRadiusMapping),
    borderHover: borderHandlerPseudo("o-ui-b-hover", "--o-ui-b-hover", BorderMapping),
    borderLeft: borderHandler(BorderMapping),
    borderLeftHover: borderHandlerPseudo("o-ui-bl-hover", "--o-ui-bl-hover", BorderMapping),
    borderRadius: createHandler(BorderRadiusMapping),
    borderRight: borderHandler(BorderMapping),
    borderRightHover: borderHandlerPseudo("o-ui-br-hover", "--o-ui-br-hover", BorderMapping),
    borderTop: borderHandler(BorderMapping),
    borderTopHover: borderHandlerPseudo("o-ui-bt-hover", "--o-ui-bt-hover", BorderMapping),
    borderTopLeftRadius: createHandler(BorderRadiusMapping),
    borderTopRightRadius: createHandler(BorderRadiusMapping),
    boxShadow: createHandler(BoxShadowMapping),
    boxShadowHover: createPseudoHandler("o-ui-bs-hover", "--o-ui-bs-hover", BoxShadowMapping),
    fill: createHandler(IconMapping),
    fillHover: createPseudoHandler("o-ui-f-hover", "--o-ui-f-hover", BorderMapping),
    fontSize: createHandler(FontSizeMapping),
    fontWeight: fontWeightHandler,
    stroke: createHandler(IconMapping),
    width: createHandler(SpacingMapping)
};

export function useStyledSystem2<TProps extends Record<string, any>>(props: TProps) {
    const {
        backgroundColor,
        backgroundColorHover,
        border,
        borderBottom,
        borderBottomHover,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderHover,
        borderLeft,
        borderLeftHover,
        borderRadius,
        borderRight,
        borderRightHover,
        borderTop,
        borderTopHover,
        borderTopLeftRadius,
        borderTopRightRadius,
        boxShadow,
        boxShadowHover,
        className,
        fill,
        fillHover,
        fontSize,
        fontWeight,
        stroke,
        style,
        width,
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
        backgroundColor,
        backgroundColorHover,
        border,
        borderBottom,
        borderBottomHover,
        borderLeft,
        borderLeftHover,
        borderRight,
        borderRightHover,
        borderTop,
        borderTopHover,
        borderHover,
        borderRadius,
        borderBottomLeftRadius,
        borderBottomRightRadius,
        borderTopLeftRadius,
        borderTopRightRadius,
        boxShadow,
        boxShadowHover,
        breakpoint,
        fill,
        fillHover,
        fontSize,
        fontWeight,
        stroke,
        width
    ]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return {
        ...rest,
        className: styling.className,
        style: styling.style
    } as Omit<TProps, keyof StyledSystemProps2>;

}
