import { createContext, useContext } from "react";

export const TabsContext = createContext({});

export const TabsProvider = TabsContext.Provider;

export function useTabsContext() {
    return useContext(TabsContext);
}

