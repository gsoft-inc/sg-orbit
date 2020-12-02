import "./ThemeProvider.css";

import { createContext, useContext, useEffect } from "react";
import { isNil } from "lodash";
import { mergeClasses, useMediaQuery } from "../../shared";
import { oneOf, string } from "prop-types";

const ColorScheme = {
    light: "light",
    dark: "dark",
    system: "system"
};

const propTypes = {
    /**
     * The theme to use.
     */
    theme: oneOf(["apricot", "overcast", "desktop"]).isRequired,
    /**
     * The color scheme to use.
     */
    colorScheme: oneOf([ColorScheme.light, ColorScheme.dark, ColorScheme.system]).isRequired,
    /**
     * Default color scheme to use when a user prefered color scheme (system) is not available.
     */
    defaultColorScheme: string
};

const ThemeContext = createContext({});

export function useColorScheme(colorScheme, defaultColorScheme) {
    const matchesLight = useMediaQuery("(prefers-color-scheme: light)");
    const matchesDark = useMediaQuery("(prefers-color-scheme: dark)");

    useEffect(() => {
        if (colorScheme === ColorScheme.system && isNil(defaultColorScheme)) {
            throw new Error("When using a \"system\" \"colorSchema\" with the ThemeProvider you must also provide a \"defaultColorScheme\" prop in case user preference is not available.");
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

export function ThemeProvider({ theme, colorScheme, defaultColorScheme, children }) {
    colorScheme = useColorScheme(colorScheme, defaultColorScheme);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colorScheme
            }}
        >
            <div
                className={mergeClasses(
                    `o-ui-${theme}-theme`,
                    `o-ui-${colorScheme}-color-scheme`
                )}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = propTypes;

export function useTheme() {
    return useContext(ThemeContext);
}
