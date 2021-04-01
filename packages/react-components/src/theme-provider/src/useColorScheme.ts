import { ColorScheme } from "./ThemeProvider";
import { isNil } from "lodash";
import { useEffect } from "react";
import { useMediaQuery } from "../../shared";

export function useColorScheme(colorScheme: ColorScheme, defaultColorScheme: ColorScheme.dark | ColorScheme.light): ColorScheme {
    const matchesLight = useMediaQuery("(prefers-color-scheme: light)");
    const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");

    useEffect(() => {
        if (colorScheme === ColorScheme.system && isNil(defaultColorScheme)) {
            throw new Error("When using a \"system\" \"colorScheme\" with the ThemeProvider you must also provide a \"defaultColorScheme\" prop in case user preference is not available.");
        }
    }, [colorScheme, defaultColorScheme]);

    if (colorScheme === ColorScheme.system) {
        if (matchesLight) {
            return ColorScheme.light;
        }

        if (matchesDark) {
            return ColorScheme.dark;
        }

        return defaultColorScheme;
    }

    return colorScheme;
}
