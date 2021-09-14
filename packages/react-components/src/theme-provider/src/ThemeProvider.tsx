import { ApricotTheme, OrbitTheme } from "@orbit-ui/styles";
import { Box } from "../../box";
import { InternalProps, StyledComponentProps, mergeClasses, mergeProps } from "../../shared";
import { Ref, useCallback, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { useColorScheme } from "./useColorScheme";

export type ColorScheme = "light" | "dark";

export type ColorSchemeOrSystem = ColorScheme | "system";

const DefaultElement = "div";

export interface ThemeProviderProps extends Omit<InternalProps, "forwardedRef">, Omit<StyledComponentProps<typeof DefaultElement>, "ref"> {
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
    ref?: Ref<typeof DefaultElement>;
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
            <Box
                {...mergeProps(
                    rest,
                    {
                        as,
                        className: mergeClasses(
                            `${theme.name}`,
                            `${theme.name}-${colorScheme}`
                        ),
                        id: "o-ui"
                    }
                )}
            >
                {children}
            </Box>
        </ThemeContext.Provider>
    );
}
