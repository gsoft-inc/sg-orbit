import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { isNil } from "../../shared";
import { supportsMatchMedia } from "./useMediaQuery";
import { useDebouncedCallback } from "use-debounce";

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const Breakpoints = {
    xs: "(min-width: 640px)",
    sm: "(min-width: 768px)",
    md: "(min-width: 1024px)",
    lg: "(min-width: 1280px)",
    xl: "(min-width: 1536px)"
};
/* eslint-enable sort-keys-fix/sort-keys-fix */

export type Breakpoint = keyof typeof Breakpoints;

export interface BreakpointContextType {
    breakpoint?: Breakpoint;
}

export const BreakpointContext = createContext<BreakpointContextType>({});

export interface BreakpointProvider {
    children: ReactNode;
    unsupportedMatchMediaBreakpoint?: Breakpoint;
}

// Reversing breakpoints to resolve from higher to lower.
const ReversedBreakpoints = Object.entries(Breakpoints).reduce((acc, entry) => {
    acc.unshift(entry);

    return acc;
}, []);

export function BreakpointProvider({
    children,
    unsupportedMatchMediaBreakpoint = "lg"
}: BreakpointProvider) {
    const getCurrentBreakpoint = useCallback(() => {
        if (supportsMatchMedia) {
            for (const [key, value] of ReversedBreakpoints) {
                if (window.matchMedia(value).matches) {
                    return key as Breakpoint;
                }
            }

            return undefined;
        }

        return unsupportedMatchMediaBreakpoint;
    }, [unsupportedMatchMediaBreakpoint]);

    const [breakpoint, setBreakpoint] = useState<Breakpoint>(getCurrentBreakpoint);

    const handleResize = useDebouncedCallback(() => {
        setBreakpoint(getCurrentBreakpoint());
    }, 50);

    useEffect(() => {
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
