import { Orientation } from "../../layout";
import { ReactNode, createContext, useContext } from "react";
import { isNil } from "../../shared";

export interface ToolbarContextType {
    disabled?: boolean;
    orientation?: Orientation;
}

export const ToolbarContext = createContext<ToolbarContextType>(null);

export function useToolbarContext(): [ToolbarContextType, boolean] {
    const context = useContext(ToolbarContext);

    if (!isNil(context)) {
        return [context, true];
    }

    return [{}, false];
}

export type UseToolbarPropsReturn = ToolbarContextType;

export function useToolbarProps(): [UseToolbarPropsReturn, boolean] {
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
