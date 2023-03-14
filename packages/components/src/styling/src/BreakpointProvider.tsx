import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { isNil } from "../../shared";
import { supportsMatchMedia } from "./useMediaQuery";
import { useDebouncedCallback } from "use-debounce";

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const Breakpoints = {
    xs: "(min-width: 40rem)",
    sm: "(min-width: 48rem)",
    md: "(min-width: 64rem)",
    lg: "(min-width: 80rem)",
    xl: "(min-width: 96rem)"
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
    }, [unsupportedMatchMediaBreakpoint]);

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
    }, [handleResize]);

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
