import { Orientation } from "../../layout";
import { ReactElement, ReactNode, createContext, useContext } from "react";
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

export function useToolbarProps(): [ToolbarContextProps, boolean] {
    return useToolbarContext();
}

export interface ClearToolbarProps {
    children?: ReactNode;
}

export function ClearToolbar({ children }: ClearToolbarProps): ReactElement {
    return (
        <ToolbarContext.Provider value={null}>
            {children}
        </ToolbarContext.Provider>
    );
}
