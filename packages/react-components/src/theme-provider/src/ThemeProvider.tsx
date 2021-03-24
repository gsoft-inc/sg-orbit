import { ElementType, ReactNode, useCallback, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { isNil } from "lodash";
import { mergeClasses, mergeProps, useMediaQuery } from "../../shared";

export enum ColorScheme {
    light = "light",
    dark = "dark",
    system = "system"
}

export interface ThemeProviderProps {
    /**
     * The theme to use.
     */
    theme: "apricot" | "overcast" | "desktop";
    /**
     * The color scheme to use.
     */
    colorScheme: ColorScheme
    /**
     * Default color scheme to use when a user prefered color scheme (system) is not available.
     */
    defaultColorScheme?: ColorScheme.dark | ColorScheme.light
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    children?: ReactNode;
}

export function useColorScheme(colorScheme: ColorScheme, defaultColorScheme: ColorScheme.dark | ColorScheme.light): ColorScheme {
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

export function ThemeProvider({
    theme,
    colorScheme,
    defaultColorScheme,
    children,
    as: TriggerType = "div",
    ...rest
}: ThemeProviderProps) {
    const [remoteColorScheme, setRemoteColorScheme] = useState();

    colorScheme = useColorScheme(remoteColorScheme ?? colorScheme, defaultColorScheme);

    const setColorScheme = useCallback(newColorScheme => {
        setRemoteColorScheme(newColorScheme);
    }, [setRemoteColorScheme]);

    return (
        <ThemeContext.Provider
            value={{
                theme,
                colorScheme,
                setColorScheme
            }}
        >
            <TriggerType
                {...mergeProps(
                    rest,
                    {
                        className: mergeClasses(
                            "o-ui",
                            `o-ui-${theme}`,
                            `o-ui-${colorScheme}`
                        )
                    }
                )}
            >
                {children}
            </TriggerType>
        </ThemeContext.Provider>
    );
}
