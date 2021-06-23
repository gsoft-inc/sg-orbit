import { createContext, useContext } from "react";
import { isNil } from "./assertions";

type StyleContextType = Record<string, any>;

export const StyleContext = createContext<StyleContextType>(undefined);

export const StyleProvider = StyleContext.Provider;

export function useStyleContext(): StyleContextType {
    return useContext(StyleContext);
}

export function useStyleProps(key: string): [StyleContextType, boolean] {
    const context = useStyleContext();

    if (!isNil(context)) {
        const props = !isNil(key)
            ? context[key] ?? {}
            : {};

        return [props, true];
    }

    return [{}, false];
}
