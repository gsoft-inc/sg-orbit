import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { isNil } from "./assertions";

/* eslint-disable sort-keys-fix/sort-keys-fix */
const Breakpoints = {
    s: "(max-width: 991px)",
    m: "(min-width: 992px) and (max-width: 1199px)",
    l: "(min-width: 1200px)"
};
/* eslint-enable sort-keys-fix/sort-keys-fix */

const DefaultBreakpoint = "l";

export interface BreakpointContextType {
    breakpoint?: string;
}

export const BreakpointContext = createContext<BreakpointContextType>({});

export function BreakpointProvider({
    children
}) {
    const [breakpoint, setBreakpoint] = useState<string>(DefaultBreakpoint);

    // TODO: Debounce
    const handleResize = useCallback(() => {
        for (const [key, value] of Object.entries(Breakpoints)) {
            if (window.matchMedia(value).matches) {
                setBreakpoint(key);

                break;
            }
        }
    }, []);

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
