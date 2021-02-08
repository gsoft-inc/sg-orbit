import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const StyleContext = createContext<Record<string, any>>();

export const StyleProvider = StyleContext.Provider;

export function useStyleContext() {
    return useContext(StyleContext);
}

export function useStyleProps(key: string): [any, boolean] {
    const context = useStyleContext();

    if (!isNil(context)) {
        const props = !isNil(key)
            ? context[key] ?? {}
            : {};

        return [props, true];
    }

    return [{}, false];
}
