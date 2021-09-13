import { SyntheticEvent, createContext, useContext } from "react";

export type TabsOrientation = "horizontal" | "vertical";

export interface TabsContextType {
    isManual?: boolean;
    onSelect?: (event: SyntheticEvent, key: string) => void;
    orientation?: TabsOrientation;
    selectedKey?: string;
}

export const TabsContext = createContext<TabsContextType>({});

export function useTabsContext() {
    return useContext(TabsContext);
}
