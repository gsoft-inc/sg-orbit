import { createContext, useContext } from "react";

export const MenuTriggerContext = createContext({});

export function useMenuTriggerContext() {
    return useContext(MenuTriggerContext);
}
