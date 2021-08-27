import { ApricotTheme } from "@orbit-ui/styles";
import { Box } from "../../box";
import { ComponentProps, ElementType, ReactNode, useCallback, useState } from "react";
import { StyleProps, mergeClasses, mergeProps } from "../../shared";
import { ThemeContext, useThemeContext } from "./ThemeContext";
import { useColorScheme } from "./useColorScheme";

export type ColorScheme = "light" | "dark";

export type ColorSchemeOrSystem = ColorScheme | "system";

const DefaultElement = "div";

export interface ThemeProviderProps extends StyleProps, Omit<ComponentProps<typeof DefaultElement>, "ref"> {
    /**
     * The theme to use.
     */
    theme?: string;
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
    theme: userTheme,
    colorScheme,
    defaultColorScheme,
    children,
    as = DefaultElement,
    ...rest
}: ThemeProviderProps) {
    const parentTheme = useThemeContext();

    const [remoteColorScheme, setRemoteColorScheme] = useState();

    colorScheme = useColorScheme(remoteColorScheme ?? colorScheme ?? parentTheme.colorScheme, defaultColorScheme);

    const setColorScheme = useCallback(newColorScheme => {
        setRemoteColorScheme(newColorScheme);
    }, [setRemoteColorScheme]);

    const theme = userTheme ?? parentTheme.theme ?? ApricotTheme.name;

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
                            `o-ui-${theme}-${colorScheme}`
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
