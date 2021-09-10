import { ColorScheme } from "./ThemeProvider";
import { OrbitTheme } from "@orbit-ui/styles";
import { createContext, useContext } from "react";

export interface ThemeContextType {
    colorScheme?: ColorScheme;
    setColorScheme?: (newColorScheme: ColorScheme) => void;
    theme?: OrbitTheme;
}

export const ThemeContext = createContext<ThemeContextType>({});

export function useThemeContext() {
    return useContext(ThemeContext);
}
