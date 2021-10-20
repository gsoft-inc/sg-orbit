import { Breakpoint, useMatchedBreakpoints } from "./BreakpointProvider";
import { isNil, isObject } from "../../shared";

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>> & { base?: T };

export type ResponsiveProp<T> = T | ResponsiveValue<T>;

// Inspired by https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/styleProps.ts
export function parseResponsiveValue<T>(value: T | ResponsiveValue<T>, matchedBreakpoints: Breakpoint[]): T {
    if (isObject(value)) {
        for (let i = 0; i < matchedBreakpoints.length; i++) {
            const responsiveValue = value[matchedBreakpoints[i]];

            if (!isNil(responsiveValue)) {
                return responsiveValue;
            }
        }

        return value["base"];
    }

    return value as T;
}

export function useResponsiveValue<T>(value: T | ResponsiveValue<T>) {
    const matchedBreakpoints = useMatchedBreakpoints();

    return parseResponsiveValue(value, matchedBreakpoints);
}
