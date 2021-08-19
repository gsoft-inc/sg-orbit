import { Box } from "../../box";
import { ComponentProps, ElementType, ReactNode, useCallback, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { mergeClasses, mergeProps } from "../../shared";
import { useColorScheme } from "./useColorScheme";

export type Theme = "apricot" | "desktop";
export type ColorScheme = "light" | "dark";
export type ColorSchemeOrSystem = ColorScheme | "system";

const defaultElement = "div";

export interface ThemeProviderProps extends Omit<ComponentProps<typeof defaultElement>, "ref"> {
    /**
     * The theme to use.
     */
    theme?: Theme;
    /**
     * The color scheme to use.
     */
    colorScheme: ColorSchemeOrSystem;
    /**
     * Default color scheme to use when a user prefered color scheme (system) is not available.
     */
    defaultColorScheme?: ColorScheme;
    /**
     * @ignore
     */
    as?: ElementType;
    /**
    * @ignore
    */
    children?: ReactNode;
}

export function ThemeProvider({
    theme = "apricot",
    colorScheme,
    defaultColorScheme,
    children,
    as = defaultElement,
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
            <Box
                {...mergeProps(
                    rest,
                    {
                        className: mergeClasses(
                            "o-ui",
                            `o-ui-${theme}`,
                            `o-ui-${colorScheme}`
                        ),
                        as
                    }
                )}
            >
                {children}
            </Box>
        </ThemeContext.Provider>
    );
}
