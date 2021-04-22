import { isNil, useMediaQuery } from "../../shared";
import { useEffect } from "react";
import type { ColorScheme, ColorSchemeOrSystem } from "./ThemeProvider";

export function useColorScheme(colorScheme: ColorSchemeOrSystem, defaultColorScheme: ColorScheme): ColorScheme {
    const matchesLight = useMediaQuery("(prefers-color-scheme: light)");
    const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");

    useEffect(() => {
        if (colorScheme === "system" && isNil(defaultColorScheme)) {
            throw new Error("When using a \"system\" \"colorScheme\" with the ThemeProvider you must also provide a \"defaultColorScheme\" prop in case user preference is not available.");
        }
    }, [colorScheme, defaultColorScheme]);

    if (colorScheme === "system") {
        if (matchesLight) {
            return "light";
        }

        if (matchesDark) {
            return "dark";
        }

        return defaultColorScheme;
    }

    return colorScheme;
}
