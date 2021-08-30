import { createContext, useContext } from "react";
import type { ColorScheme } from "./ThemeProvider";

export interface ThemeContextType {
    colorScheme?: ColorScheme;
    setColorScheme?: (newColorScheme: ColorScheme) => void;
    theme?: string;
}

export const ThemeContext = createContext<ThemeContextType>({});

export function useThemeContext() {
    return useContext(ThemeContext);
}
