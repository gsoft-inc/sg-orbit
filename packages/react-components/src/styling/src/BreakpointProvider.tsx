import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { isFunction, isNil } from "../../shared";
import { useDebouncedCallback } from "use-debounce";

/* eslint-disable sort-keys-fix/sort-keys-fix */
export const Breakpoints = {
    m: "(max-width: 900px)",
    l: "(min-width: 901px)"
};
/* eslint-enable sort-keys-fix/sort-keys-fix */

const DefaultBreakpoint = "l";

export type Breakpoint = keyof typeof Breakpoints;

export interface BreakpointContextType {
    breakpoint?: Breakpoint;
}

export const BreakpointContext = createContext<BreakpointContextType>({});

export interface BreakpointProvider {
    children: ReactNode;
    defaultBreakpoint?: Breakpoint;
}

export function BreakpointProvider({
    children,
    defaultBreakpoint = DefaultBreakpoint
}: BreakpointProvider) {
    const getCurrentBreakpoint = useCallback(() => {
        const supportsMatchMedia = isFunction(window?.matchMedia);

        if (supportsMatchMedia) {
            for (const [key, value] of Object.entries(Breakpoints)) {
                if (window.matchMedia(value).matches) {
                    return key as Breakpoint;
                }
            }
        }

        return defaultBreakpoint;
    },[defaultBreakpoint]);

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
