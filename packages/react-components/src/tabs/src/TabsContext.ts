import { SyntheticEvent, createContext, useContext } from "react";

export interface TabsContextType {
    selectedIndex?: number;
    onSelect?(event: SyntheticEvent, newIndex: number): void;
    isManual?: boolean;
    orientation?: "horizontal" | "vertical";
}

export const TabsContext = createContext<TabsContextType>({});

export function useTabsContext() {
    return useContext(TabsContext);
}
