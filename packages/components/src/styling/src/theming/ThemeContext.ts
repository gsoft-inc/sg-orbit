import { createContext, useContext } from "react";

import { OrbitTheme } from "./orbitTheme";
import { ThemeAccessor } from "./themeAccessor";

export interface ThemeContextType {
    theme?: OrbitTheme;
}

export const ThemeContext = createContext<ThemeContextType>({});

export function useThemeContext(): ThemeContextType & { themeAccessor: ThemeAccessor } {
    const { theme, ...rest } = useContext(ThemeContext);

    return {
        ...rest,
        theme,
        themeAccessor: new ThemeAccessor(theme)
    };
}
