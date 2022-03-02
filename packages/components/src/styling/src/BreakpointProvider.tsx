import { ReactNode, createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { isFunction } from "../../shared";
import { isNil } from "../../shared";
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
    matchedBreakpoints?: Breakpoint[];
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
    // Ensure that matchMedia function exists. In a jest environement or in SSR, this function is not available.
    const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
    // Took from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/BreakpointProvider.tsx
    // Our breakpoints strategy have been inspired by how Tailwind does it https://tailwindcss.com/docs/responsive-design.
    const getBreakpointHandler = useCallback((): Breakpoint[] => {
        if (supportsMatchMedia) {
            const matched: Breakpoint[] = [];

            for (const [key, value] of ReversedBreakpoints) {
                if (window.matchMedia(value).matches) {
                    matched.push(key);
                }
            }

            return matched;
        }

        return [unsupportedMatchMediaBreakpoint];
    }, [unsupportedMatchMediaBreakpoint, supportsMatchMedia]);

    const [matchedBreakpoints, setMatchedBreakpoints] = useState<Breakpoint[]>(getBreakpointHandler);

    const handleResize = useDebouncedCallback(() => {
        setMatchedBreakpoints(getBreakpointHandler());
    }, 50);

    useEffect(() => {
        if (!supportsMatchMedia) {
            return;
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [handleResize, supportsMatchMedia]);

    return (
        <BreakpointContext.Provider value={{ matchedBreakpoints }}>
            {children}
        </BreakpointContext.Provider>
    );
}

export function useBreakpointContext() {
    return useContext(BreakpointContext);
}

export function useMatchedBreakpoints() {
    const context = useContext(BreakpointContext);

    return !isNil(context) ? context.matchedBreakpoints : [];
}
