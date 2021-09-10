import { createContext, useContext } from "react";
import { isNil } from "./assertions";

type StyleContextType = Record<string, any>;

export const StyleContext = createContext<StyleContextType>(undefined);

export const StyleProvider = StyleContext.Provider;

export function useStyleContext() {
    return useContext(StyleContext);
}

// Do not remove the TS return type otherwise it will infer to any[] and do not emit any warnings.
export function useStyleProps<TReturn>(key: string): [TReturn, boolean] {
    const context = useStyleContext();

    if (!isNil(context)) {
        const props = !isNil(key)
            ? context[key] ?? {}
            : {};

        return [props, true];
    }

    return [{} as TReturn, false];
}
