import { ApricotTheme } from "./apricot";
import { Box } from "../../../box";
import { BreakpointProvider } from "../BreakpointProvider";
import { ColorScheme, ColorSchemeOrSystem, useColorScheme } from "../useColorScheme";
import { InternalProps, StyledComponentProps, mergeClasses, mergeProps } from "../../../shared";
import { OrbitTheme } from "./orbitTheme";
import { ReactNode, Ref, useCallback, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { getColorSchemeClassName, getThemeClassName } from "./createThemeVars";

const DefaultElement = "div";

export interface ThemeProviderProps extends Omit<InternalProps, "forwardedRef">, Omit<StyledComponentProps<typeof DefaultElement>, "ref"> {
    /**
     * React children
     */
    children: ReactNode;
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
    ref?: Ref<any>;
    /**
     * The theme to use.
     */
    theme?: OrbitTheme;
}

export function ThemeProvider({
    as = DefaultElement,
    children,
    colorScheme,
    defaultColorScheme,
    theme: userTheme,
    ...rest
}: ThemeProviderProps) {
    const [remoteColorScheme, setRemoteColorScheme] = useState();

    colorScheme = useColorScheme(remoteColorScheme ?? colorScheme, defaultColorScheme);

    const setColorScheme = useCallback(newColorScheme => {
        setRemoteColorScheme(newColorScheme);
    }, [setRemoteColorScheme]);

    const theme = userTheme ?? ApricotTheme;

    return (
        <ThemeContext.Provider
            value={{
                colorScheme,
                setColorScheme,
                theme
            }}
        >
            <BreakpointProvider>
                <Box
                    {...mergeProps(
                        rest,
                        {
                            as,
                            className: mergeClasses(
                                "o-ui",
                                getThemeClassName(theme.name),
                                getColorSchemeClassName(theme.name, colorScheme)
                            )
                        }
                    )}
                >
                    {children}
                </Box>
            </BreakpointProvider>
        </ThemeContext.Provider>
    );
}
