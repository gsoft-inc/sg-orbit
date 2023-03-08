import { SyntheticEvent, createContext, useContext } from "react";
import type { MenuSelectionMode } from "./Menu";

export interface MenuContextType {
    onSelect?: (event: SyntheticEvent, key: string) => void;
    selectedKeys?: string[];
    selectionMode?: MenuSelectionMode;
}

export const MenuContext = createContext<MenuContextType>({});

export function useMenuContext() {
    return useContext(MenuContext);
}
