import { Breakpoint, Breakpoints, useMatchedBreakpoints } from "./BreakpointProvider";
import { isNil, isObject } from "../../shared";

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>> & { base?: T };

export type ResponsiveProp<T> = T | ResponsiveValue<T>;

const responsiveKeys = [...Object.keys(Breakpoints), "base"];

export function isResponsiveObject(obj: any) {
    if (!isObject(obj)) {
        return false;
    }

    const keys = Object.keys(obj);

    return keys.every(key => responsiveKeys.includes(key));
}

// The code have been inspired by https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/styleProps.ts.
// Our breakpoints strategy have been inspired by Tailwind https://tailwindcss.com/docs/responsive-design.
export function parseResponsiveValue<T>(value: T | ResponsiveValue<T>, matchedBreakpoints: Breakpoint[]) {
    if (isResponsiveObject(value)) {
        for (let i = 0; i < matchedBreakpoints.length; i++) {
            const responsiveValue = value[matchedBreakpoints[i]];

            if (!isNil(responsiveValue)) {
                return responsiveValue as T;
            }
        }

        return value["base"] as T;
    }

    return value as T;
}

export function useResponsiveValue<T>(value: T | ResponsiveValue<T>) {
    const matchedBreakpoints = useMatchedBreakpoints();

    return parseResponsiveValue(value, matchedBreakpoints);
}
