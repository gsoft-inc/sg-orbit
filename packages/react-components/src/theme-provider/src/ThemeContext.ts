import { createContext, useContext } from "react";
import type { ColorScheme } from "./ThemeProvider";

export interface ThemeContextProps {
    theme?: "apricot" | "overcast" | "desktop";
    colorScheme?: ColorScheme;
    setColorScheme?: (newColorScheme: ColorScheme) => void
}

export const ThemeContext = createContext<ThemeContextProps>({});

export function useThemeContext(): ThemeContextProps {
    return useContext(ThemeContext);
}
