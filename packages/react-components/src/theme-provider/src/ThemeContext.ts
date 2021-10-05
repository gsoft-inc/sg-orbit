import { ColorScheme, OrbitTheme, ThemeAccessor } from "@orbit-ui/styles";
import { createContext, useContext } from "react";

export interface ThemeContextType {
    colorScheme?: ColorScheme;
    setColorScheme?: (newColorScheme: ColorScheme) => void;
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
