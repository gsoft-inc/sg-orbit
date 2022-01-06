import { createContext, useContext } from "react";

import { ColorScheme } from "./useColorScheme";

export interface ColorSchemeContextType {
    colorScheme?: ColorScheme;
    setColorScheme?: (newColorScheme: ColorScheme) => void;
}

export const ColorSchemeContext = createContext<ColorSchemeContextType>({});

export function useColorSchemeContext(): ColorSchemeContextType {
    return useContext(ColorSchemeContext);
}
