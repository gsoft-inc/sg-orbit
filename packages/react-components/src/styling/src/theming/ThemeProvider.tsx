import { BreakpointProvider } from "../BreakpointProvider";
import { ColorScheme, ColorSchemeOrSystem, useColorScheme } from "../useColorScheme";
import { ComponentProps, ReactNode, Ref, useCallback, useState } from "react";
import { InternalProps, mergeClasses, mergeProps } from "../../../shared";
import { OrbitTheme } from "./orbitTheme";
import { ThemeContext } from "./ThemeContext";
import { getColorSchemeClassName, getThemeClassName } from "./createThemeVars";

const DefaultElement = "div";

export interface ThemeProviderProps extends Omit<InternalProps, "forwardedRef">, Omit<ComponentProps<typeof DefaultElement>, "ref"> {
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
        <ThemeContext.Provider
            value={{
                colorScheme: computedColorScheme,
                setColorScheme,
                theme
            }}
        >
            <BreakpointProvider>
                <div
                    {...mergeProps(
                        rest,
                        {
                            as,
                            className: mergeClasses(
                                "o-ui",
                                getThemeClassName(theme.name),
                                getColorSchemeClassName(theme.name, computedColorScheme)
                            )
                        }
                    )}
                >
                    {children}
                </div>
            </BreakpointProvider>
        </ThemeContext.Provider>
    );
}
