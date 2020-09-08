import { createContext, useContext } from "react";
import { isNil } from "lodash";
import { mergeProps } from "../../shared";

export const ToolbarContext = createContext(null);

export function useToolbarContext({ addNavigationMode = true } = {}) {
    const context = useContext(ToolbarContext);

    const { orientation } = context ?? {};

    return {
        orientation: !isNil(context) ? orientation : undefined,
        navigationMode: addNavigationMode ?
            !isNil(context) ? "toolbar" : "default"
            : undefined
    };
}

export function useToolbarProps(props, options) {
    const { orientation, navigationMode } = useToolbarContext(options);

    return mergeProps(props, {
        orientation,
        navigationMode
    });
}
