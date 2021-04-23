import { createContext, useContext } from "react";
import type { ColorScheme, Theme } from "./ThemeProvider";

export interface ThemeContextType {
    theme: Theme;
    colorScheme: ColorScheme;
    setColorScheme: (newColorScheme: ColorScheme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export function useThemeContext() {
    return useContext(ThemeContext);
}
