import { createContext, useContext } from "react";
import { isNil } from "lodash";

export const ToolbarContext = createContext(null);

export const ToolbarProvider = ToolbarContext.Provider;

export function useToolbarContext() {
    const context = useContext(ToolbarContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [{}, false];
}

export function useToolbarProps() {
    return useToolbarContext();
}

export function ClearToolbar({ children }) {
    return (
        <ToolbarProvider value={null}>
            {children}
        </ToolbarProvider>
    );
}
