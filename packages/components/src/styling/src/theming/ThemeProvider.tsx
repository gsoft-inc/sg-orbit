import { ColorScheme, ColorSchemeOrSystem, useColorScheme } from "../useColorScheme";
import { InternalProps, StyledComponentProps, mergeClasses, mergeProps, OmitInternalProps } from "../../../shared";
import { ComponentProps, forwardRef, ReactNode, useCallback, useState } from "react";
import { getColorSchemeClassName, getThemeClassName } from "./createThemeVars";

import { Box } from "../../../box";
import { BreakpointProvider } from "../BreakpointProvider";
import { ColorSchemeContext } from "../ColorSchemeContext";
import { OrbitTheme } from "./orbitTheme";
import { ThemeContext } from "./ThemeContext";

const DefaultElement = "div";

export interface InnerThemeProviderProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children
     */
    children: ReactNode;
    /**
     * The color scheme to use.
     */
    colorScheme: ColorSchemeOrSystem;
    /**
     * Default color scheme to use when a user preferred color scheme (system) is not available.
     */
    defaultColorScheme?: ColorScheme;
    /**
     * The theme to use.
     */
    theme: OrbitTheme;
}

export function InnerThemeProvider({
    as = DefaultElement,
    children,
    colorScheme,
    defaultColorScheme,
    theme,
    forwardedRef,
    ...rest
}: InnerThemeProviderProps) {
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
                                ref: forwardedRef,
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

InnerThemeProvider.defaultElement = DefaultElement;

/**
 * Container used to define the theme and color scheme to use.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/theme-provider--page)
*/

export const ThemeProvider = forwardRef<any, OmitInternalProps<InnerThemeProviderProps>>((props, ref) => (
    <InnerThemeProvider {...props} forwardedRef={ref} />
));

export type ThemeProviderProps = ComponentProps<typeof ThemeProvider>;
