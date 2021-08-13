import { createContext, useContext } from "react";
import type { ColorScheme } from "./ThemeProvider";

export interface ThemeContextType {
    theme?: string;
    colorScheme?: ColorScheme;
    setColorScheme?: (newColorScheme: ColorScheme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({});

export function useThemeContext() {
    return useContext(ThemeContext);
}
