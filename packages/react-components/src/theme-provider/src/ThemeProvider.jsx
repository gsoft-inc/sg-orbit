import "./ThemeProvider.css";

import { createContext, useContext } from "react";
import { mergeClasses } from "../../shared";
import { oneOf } from "prop-types";

/*
TODO:
    - system
*/

const propTypes = {
    theme: oneOf(["apricot", "overcast", "desktop"]).isRequired,
    colorScheme: oneOf(["light", "dark"]).isRequired
};

const ThemeContext = createContext({});

export function ThemeProvider({ theme, colorScheme, children }) {
    return (
        <ThemeContext.Provider
            value={{
                theme,
                colorScheme
            }}
        >
            <div
                className={mergeClasses(
                    `o-ui-${theme}-theme`,
                    `o-ui-${colorScheme}-color-scheme`
                )}
            >
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

ThemeProvider.propTypes = propTypes;

export function useTheme() {
    return useContext(ThemeContext);
}
