import { Orientation } from "../../layout";
import { ReactNode, createContext, useContext } from "react";
import { isNil } from "lodash";

export interface ToolbarContextProps {
    orientation?: Orientation;
    disabled?: boolean;
}

export const ToolbarContext = createContext<ToolbarContextProps>(null);

export function useToolbarContext(): [ToolbarContextProps, boolean] {
    const context = useContext(ToolbarContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [{}, false];
}

export function useToolbarProps() {
    return useToolbarContext();
}

export interface ClearToolbarProps {
    children?: ReactNode;
}

export function ClearToolbar({ children }: ClearToolbarProps) {
    return (
        <ToolbarContext.Provider value={null}>
            {children}
        </ToolbarContext.Provider>
    );
}
