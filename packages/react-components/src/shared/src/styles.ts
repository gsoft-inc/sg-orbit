import { createContext, useContext } from "react";
import { isNil } from "lodash";

type StyleContextProps = Record<string, any>;

export const StyleContext = createContext<StyleContextProps>(undefined);

export const StyleProvider = StyleContext.Provider;

export function useStyleContext(): StyleContextProps {
    return useContext(StyleContext);
}

export function useStyleProps(key: string): [StyleContextProps, boolean] {
    const context = useStyleContext();

    if (!isNil(context)) {
        const props = !isNil(key)
            ? context[key] ?? {}
            : {};

        return [props, true];
    }

    return [{}, false];
}
