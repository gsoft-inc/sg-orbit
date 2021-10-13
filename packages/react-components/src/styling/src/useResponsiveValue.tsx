import { Breakpoint, useBreakpoint } from "./BreakpointProvider";
import { isObject } from "../../shared";

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>> & { base?: T };

export type ResponsiveProp<T> = T | ResponsiveValue<T>;

export function parseResponsiveValue<T>(value: T | ResponsiveValue<T>, breakpoint: string): T {
    if (isObject(value)) {
        const responsiveValue = value[breakpoint ?? "base"];

        return (responsiveValue ?? value["base"]) as T;
    }

    return value as T;
}

export function useResponsiveValue<T>(value: T | ResponsiveValue<T>) {
    const breakpoint = useBreakpoint();

    return parseResponsiveValue(value, breakpoint);
}
