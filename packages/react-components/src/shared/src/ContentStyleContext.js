import { arrayify } from "./arrayify";
import { createContext, useContext, useMemo } from "react";
import { isNil } from "lodash";
import { mergeProps } from "./mergeProps";

const DEFAULTS = {
    text: {
        size: "inherit"
    },
    p: {
        size: "inherit"
    },
    link: {
        size: "inherit",
        underline: "dotted"
    },
    list: {
        size: "inherit"
    }
};

const ALL_DEFAULTS = Object.keys(DEFAULTS);

export const ContentStyleContext = createContext(null);

export function useContentStyleContext() {
    return useContext(ContentStyleContext) || {};
}

export function useContentStyle(key) {
    const context = useContentStyleContext();

    return !isNil(key)
        ? context[key] ?? {}
        : {};
}

export function ContentStyleProvider({ styles: stylesProp, withDefaults, children }) {
    const parentContext = useContext(ContentStyleContext);

    const defaults = withDefaults
        ? Array.isArray(withDefaults) ? withDefaults : ALL_DEFAULTS
        : [];

    const value = useMemo(() => {
        const parentStyles = parentContext || {};

        const styles = defaults.reduce((acc, x) => mergeProps(acc, { [x]: DEFAULTS[x] }), stylesProp || {});

        return Object.keys(parentStyles)
            .concat(Object.keys(styles))
            .reduce((acc, key) => {
                acc[key] = {
                    ...(parentStyles[key] ?? {}),
                    ...(styles[key] ?? {})
                };

                return acc;
            }, styles);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [stylesProp, parentContext, ...defaults]);

    return (
        <ContentStyleContext.Provider value={value}>
            {children}
        </ContentStyleContext.Provider>
    );
}
