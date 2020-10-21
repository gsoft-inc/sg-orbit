import { createContext, useContext } from "react";

export const TabsContext = createContext({});

export function useTabsContext() {
    return useContext(TabsContext);
}
