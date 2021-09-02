import { ApricotTheme } from "@orbit-ui/styles";
import { Box } from "../../box";
import { ElementType, ReactNode, useCallback, useState } from "react";
import { StyledComponentProps, mergeClasses, mergeProps } from "../../shared";
import { ThemeContext, useThemeContext } from "./ThemeContext";
import { useColorScheme } from "./useColorScheme";

export type ColorScheme = "light" | "dark";

export type ColorSchemeOrSystem = ColorScheme | "system";

const DefaultElement = "div";

export interface ThemeProviderProps extends Omit<StyledComponentProps<typeof DefaultElement>, "ref"> {
    /**
     * @ignore
     */
    as?: ElementType;
    /**
    * @ignore
    */
    children?: ReactNode;
    /**
     * The color scheme to use.
     */
    colorScheme: ColorSchemeOrSystem;
    /**
     * Default color scheme to use when a user prefered color scheme (system) is not available.
     */
    defaultColorScheme?: ColorScheme;
    /**
     * The theme to use.
     */
    theme?: string;
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
                colorScheme,
                setColorScheme,
                theme
            }}
        >
            <Box
                {...mergeProps(
                    rest,
                    {
                        as,
                        className: mergeClasses(
                            "o-ui",
                            `o-ui-${theme}`,
                            `o-ui-${theme}-${colorScheme}`
                        )
                    }
                )}
            >
                {children}
            </Box>
        </ThemeContext.Provider>
    );
}
