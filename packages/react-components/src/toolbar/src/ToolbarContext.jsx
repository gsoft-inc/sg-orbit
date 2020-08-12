import { createContext, useContext } from "react";
import { isNil } from "lodash";
import { mergeProps } from "../../shared";

export const ToolbarContext = createContext(null);

export function useToolbarContext() {
    return useContext(ToolbarContext) ?? {};
}

export function useToolbarProps(props, { addNavigationMode = true } = {}) {
    const context = useContext(ToolbarContext);

    return mergeProps(props, {
        orientation: !isNil(context) ? context.orientation : undefined,
        navigationMode: addNavigationMode ?
            !isNil(context) ? "toolbar" : "default"
            : undefined
    });
}
