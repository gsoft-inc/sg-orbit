import { useEffect, useState } from "react";

// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/useMediaQuery.ts
export function useMediaQuery(query: string) {
    // Ensure that matchMedia function exists. In a jest environement or in SSR, this function is not available.
    const supportsMatchMedia = typeof window !== "undefined" && typeof window.matchMedia === "function";
    const [matches, setMatches] = useState(() => supportsMatchMedia
        ? window.matchMedia(query).matches
        : false
    );

    useEffect(() => {
        if (!supportsMatchMedia) {
            return;
        }

        const mediaQueryList = window.matchMedia(query);

        const onChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        mediaQueryList.addEventListener("change", onChange);

        return () => {
            mediaQueryList.removeEventListener("change", onChange);
        };
    }, [query, supportsMatchMedia]);

    return matches;
}
