import "./ThemeProvider.css";

import { ElementType, ForwardedRef, ReactNode, useCallback, useState } from "react";
import { ThemeContext } from "./ThemeContext";
import { mergeClasses, mergeProps } from "../../shared";
import { useColorScheme } from "./useColorScheme";

export enum Theme {
    apricot = "apricot",
    overcast = "overcast",
    desktop = "desktop"
}

export enum ColorScheme {
    light = "light",
    dark = "dark",
    system = "system"
}

export interface ThemeProviderProps {
    /**
     * The theme to use.
     */
    theme: Theme;
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
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
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
                            `o-ui-${theme}-theme`,
                            `o-ui-${colorScheme}-color-scheme`
                        )
                    }
                )}
            >
                {children}
            </TriggerType>
        </ThemeContext.Provider>
    );
}
