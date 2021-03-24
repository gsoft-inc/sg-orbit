import { SyntheticEvent, createContext, useContext } from "react";

interface MenuContextType {
    onSelect?(event: SyntheticEvent, key: string): void;
}

export const MenuContext = createContext<MenuContextType>({});

export function useMenuContext() {
    return useContext(MenuContext);
}
