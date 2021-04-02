import { SyntheticEvent, createContext, useContext } from "react";

export interface TabsContextType {
    selectedKey?: string;
    onSelect?(event: SyntheticEvent, newKey: string): void;
    isManual?: boolean;
    orientation?: "horizontal" | "vertical";
}

export const TabsContext = createContext<TabsContextType>({});

export function useTabsContext() {
    return useContext(TabsContext);
}
