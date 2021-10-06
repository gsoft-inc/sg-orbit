import { ResponsiveValue, parseResponsiveValue, useBreakpoint } from "./BreakpointProvider";

export function useResponsiveValue<T>(value: T | ResponsiveValue<T>) {
    const breakpoint = useBreakpoint();

    return parseResponsiveValue(value, breakpoint);
}
