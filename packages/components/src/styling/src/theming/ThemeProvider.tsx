import { ColorScheme, ColorSchemeOrSystem, useColorScheme } from "../useColorScheme";
import { InternalProps, StyledComponentProps, mergeClasses, mergeProps } from "../../../shared";
import { ReactNode, Ref, useCallback, useState } from "react";
import { getColorSchemeClassName, getThemeClassName } from "./createThemeVars";

import { Box } from "../../../box";
import { BreakpointProvider } from "../BreakpointProvider";
import { ColorSchemeContext } from "../ColorSchemeContext";
import { OrbitTheme } from "./orbitTheme";
import { ThemeContext } from "./ThemeContext";

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
    theme: OrbitTheme;
}

export function ThemeProvider({
    as = DefaultElement,
    children,
    colorScheme,
    defaultColorScheme,
    theme,
    ...rest
}: ThemeProviderProps) {
    const [remoteColorScheme, setRemoteColorScheme] = useState();

    const computedColorScheme = useColorScheme(remoteColorScheme ?? colorScheme, defaultColorScheme);

    const setColorScheme = useCallback(newColorScheme => {
        setRemoteColorScheme(newColorScheme);
    }, [setRemoteColorScheme]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            <ColorSchemeContext.Provider
                value={{
                    colorScheme: computedColorScheme,
                    setColorScheme
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
                                    `o-ui-${computedColorScheme}`,
                                    getThemeClassName(theme.name),
                                    getColorSchemeClassName(theme.name, computedColorScheme)
                                )
                            }
                        )}
                    >
                        {children}
                    </Box>
                </BreakpointProvider>
            </ColorSchemeContext.Provider>
        </ThemeContext.Provider>
    );
}
