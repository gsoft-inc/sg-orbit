import { SyntheticEvent, createContext, useContext } from "react";

export interface TabsContextType {
    isManual?: boolean;
    onSelect?: (event: SyntheticEvent, key: string) => void;
    orientation?: "horizontal" | "vertical";
    selectedKey?: string;
}

export const TabsContext = createContext<TabsContextType>({});

export function useTabsContext() {
    return useContext(TabsContext);
}
