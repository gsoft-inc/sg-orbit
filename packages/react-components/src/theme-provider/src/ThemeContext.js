import { createContext, useContext } from "react";

export const ThemeContext = createContext({});

export function useThemeContext() {
    return useContext(ThemeContext);
}
