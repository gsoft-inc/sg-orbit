import { createContext, useContext } from "react";

export const MenuContext = createContext({});

export function useMenuContext() {
    return useContext(MenuContext);
}
