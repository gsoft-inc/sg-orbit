import { createContext, useContext, useEffect, useState } from "react";
import { isNil } from "./assertions";
import { isObject } from "./assertions";
import { useDebouncedCallback } from "use-debounce";

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const Breakpoints = {
    m: "(max-width: 900px)",
    l: "(min-width: 901px)"
};
/* eslint-enable sort-keys-fix/sort-keys-fix */

const DefaultBreakpoint = "l";

export type Breakpoint = keyof typeof Breakpoints;

export type ResponsiveValue<T> = Partial<Record<Breakpoint, T>> & { base?: T };

export function parseResponsiveValue<T>(value: T | ResponsiveValue<T>, breakpoint: string): T {
    if (isObject(value)) {
        const responsiveValue = value[breakpoint ?? "base"];

        return (responsiveValue ?? value["base"]) as T;
    }

    return value as T;
}

export interface BreakpointContextType {
    breakpoint?: Breakpoint;
}

export const BreakpointContext = createContext<BreakpointContextType>({});

export function BreakpointProvider({
    children
}) {
    const [breakpoint, setBreakpoint] = useState<Breakpoint>(DefaultBreakpoint);

    const handleResize = useDebouncedCallback(() => {
        console.log("handle resize");

        for (const [key, value] of Object.entries(Breakpoints)) {
            if (window.matchMedia(value).matches) {
                setBreakpoint(key as Breakpoint);

                break;
            }
        }
    }, 50);

    useEffect(() => {
        // Initialize breakpoint.
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize]);

    return (
        <BreakpointContext.Provider value={{ breakpoint }}>
            {children}
        </BreakpointContext.Provider>
    );
}

export function useBreakpointContext() {
    return useContext(BreakpointContext);
}

export function useBreakpoint() {
    const context = useContext(BreakpointContext);

    return !isNil(context) ? context.breakpoint : undefined;
}
