import { BorderRadiusPrefix, BoxShadowPrefix, ColorPrefix, FontSizePrefix, LineHeightPrefix, SpacePrefix, normalizeVariable } from "./createCss";
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

export const SpacingScale2 = [
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

export const Colors = [
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

export const BackgroundColorAliases = [
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

export const BorderColorAliases = [
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


export const IconColorAliases = [
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

export const BorderRadiusScale = [
    0,
    1,
    2,
    3,
    4,
    "100%",
    "pill"
] as const;

export const BoxShadowScale = [
    1,
    2,
    3,
    4
] as const;

export const BoxShadowAliases = [
    "alias-floating",
    "alias-lifted",
    "alias-raised",
    "alias-skim"
] as const;

export const FontSizeScale = [
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

export const FontWeightScale = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9
] as const;

export const LineHeightScale = [
    1,
    2,
    3,
    4,
    5,
    6,
    "normal"
] as const;

// TODO: add TS typing to generate intellisense.
function createValuesMapping(values, prefix) {
    const mapping: Record<string | number, string> = {};

    values.reduce((acc, x) => {
        acc[x] = `var(${normalizeVariable(x, prefix)})`;

        return acc;
    }, mapping);

    return mapping;
}

export const BackgroundColorValues = createValuesMapping([...Colors, ...BackgroundColorAliases], ColorPrefix);

// TODO: fix typings
export type BackgroundColorProp2 = Simplify<LiteralUnion<typeof BackgroundColorValues[string | number], string>>;

export interface StyledSystemProps2 {
    /**
     * @ignore
     */
    backgroundColor?: BackgroundColorProp2 | ResponsiveValue<BackgroundColorProp2>;
    // /**
    //  * @ignore
    //  */
    // width?: WidthProp;
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

function tryAddKnownValue<T extends Record<string | number, string>>(name: string, value: keyof T, knownValues: T, context: StylingContext) {
    const knownValue = knownValues[value as keyof typeof knownValues];

    if (!isNil(knownValue)) {
        context.addStyleValue(name, knownValue);

        return true;
    }

    return false;
}

function createHandler<TValue extends string>(knownValues?: Record<TValue, string>): PropHandler<TValue> {
    const knownValuesHandler = (name, value, context: StylingContext) => {
        if (tryAddKnownValue(name, value, knownValues, context)) {
            return;
        }

        const parsedValue = parsePropValue(value, context.breakpoint);

        if (!tryAddKnownValue(name, parsedValue, knownValues, context)) {
            context.addStyleValue(name, parsedValue);
        }
    };

    const passThroughHandler = (name, value, context: StylingContext) => {
        const responsiveValue = parsePropValue(value, context.breakpoint);

        context.addStyleValue(name, !isNil(responsiveValue) ? responsiveValue : value);
    };

    return !isNil(knownValues) ? knownValuesHandler : passThroughHandler;
}

function createPseudoHandler<TValue extends string>(pseudoClassName, pseudoVariable, knownValues?: Record<TValue, string>): PropHandler<TValue> {
    const knownValuesHandler = (name, value, context: StylingContext) => {
        context.addClass(pseudoClassName);

        if (tryAddKnownValue(pseudoVariable, value, knownValues, context)) {
            return;
        }

        const parsedValue = parsePropValue(value, context.breakpoint);

        if (!tryAddKnownValue(pseudoVariable, parsedValue, knownValues, context)) {
            context.addStyleValue(pseudoVariable, parsedValue);
        }
    };

    const passThroughHandler = (name, value, context: StylingContext) => {
        const responsiveValue = parsePropValue(value, context.breakpoint);

        context.addClass(pseudoClassName);
        context.addStyleValue(pseudoVariable, !isNil(responsiveValue) ? responsiveValue : value);
    };

    return !isNil(knownValues) ? knownValuesHandler : passThroughHandler;
}

const PropsHandlers: Record<string, PropHandler<unknown>> = {
    backgroundColor: createHandler(BackgroundColorValues),
    backgroundColorHover: createPseudoHandler("o-ui-bg-hover", "--o-ui-bg-hover", BackgroundColorValues)
};

export function useStyledSystem2<TProps extends Record<string, any>>(props: TProps) {
    const {
        backgroundColor,
        backgroundColorHover,
        className,
        style,
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
        breakpoint
    ]);
    /* eslint-enable react-hooks/exhaustive-deps */

    return {
        ...rest,
        className: styling.className,
        style: styling.style
    } as Omit<TProps, keyof StyledSystemProps2>;

}
