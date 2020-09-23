import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const ToolbarContext = createContext(null);

export function useToolbarContext() {
    const context = useContext(ToolbarContext);

    if (!isNil(context)) {
        return {
            isInToolbar: true,
            ...context
        };
    }

    return {
        isInToolbar: false
    };
}

// export function useToolbarContext() {
//     const context = useContext(ToolbarContext);

//     if (!isNil(context)) {
//         return [context, true];
//     }

//     return [{}, false];
// }

export function useToolbar() {
    // eslint-disable-next-line no-unused-vars
    const { isInToolbar, ...rest } = useToolbarContext();

    return rest;
}

export function ClearToolbarContext({ children }) {
    return (
        <ToolbarContext.Provider value={null}>
            {children}
        </ToolbarContext.Provider>
    );
}
