import { isFunction } from "lodash";
import { useEffect, useState } from "react";

// Copied from https://github.com/adobe/react-spectrum/blob/main/packages/%40react-spectrum/utils/src/useMediaQuery.ts
export function useMediaQuery(query: string): boolean {
    const supportsMatchMedia = isFunction(window?.matchMedia);

    const [matches, setMatches] = useState(() =>
        supportsMatchMedia
            ? window.matchMedia(query).matches
            : false
    );

    useEffect(() => {
        if (!supportsMatchMedia) {
            return;
        }

        const mediaQueryList = window.matchMedia(query);

        const onChange = (event: MediaQueryListEvent): void => {
            setMatches(event.matches);
        };

        mediaQueryList.addListener(onChange);

        return (): void => {
            mediaQueryList.removeListener(onChange);
        };
    }, [supportsMatchMedia, query]);

    return matches;
}
