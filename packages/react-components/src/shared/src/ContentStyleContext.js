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

export function ContentStyleProvider({ styles: stylesProp, defaults = [], children }) {
    const parentContext = useContext(ContentStyleContext);

    const value = useMemo(() => {
        const parentStyles = parentContext || {};

        const styles = arrayify(defaults).reduce((acc, x) => {
            return mergeProps(acc, x === "all"
                ? DEFAULTS
                : { [x]: DEFAULTS[x] }
            );
        }, stylesProp || {});

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
    }, [stylesProp, parentContext, ...arrayify(defaults)]);

    return (
        <ContentStyleContext.Provider value={value}>
            {children}
        </ContentStyleContext.Provider>
    );
}
