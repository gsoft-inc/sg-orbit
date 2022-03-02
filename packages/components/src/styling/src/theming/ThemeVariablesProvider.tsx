import { OrbitTheme } from "./orbitTheme";
import { ReactNode, useEffect } from "react";
import { toThemeVars } from "./createThemeVars";

export interface ThemeVariablesProviderProps {
    themes: OrbitTheme[];
    children: ReactNode;
}

// TODO AA: Should we add a new property on the ThemeProvider like "availableThemes"? We could do this useEffect inside the ThemeProvider instead and
// delete this component
export function ThemeVariablesProvider({ themes, children }: ThemeVariablesProviderProps) {
    useEffect(() => {
        // TODO AA: Should we ensure that the style ids are not duplicated?
        toThemeVars(themes).forEach(({ scope, bucket }) => {
            const element = document.createElement("style");

            element.setAttribute("id", scope);
            element.innerText = `.o-ui.${scope} { ${bucket.join(" ")} }`;

            document.head.appendChild(element);
        });
    }, [themes]);

    return children;
}
