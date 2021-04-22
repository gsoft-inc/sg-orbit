import { createContext, useContext } from "react";
import type { ColorScheme, ColorSchemeOrSystem, Theme } from "./ThemeProvider";

export interface ThemeContextType {
    theme: Theme;
    colorScheme: ColorScheme;
    setColorScheme: (newColorScheme: ColorSchemeOrSystem) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function useThemeContext() {
    return useContext(ThemeContext);
}
