import { SyntheticEvent, createContext, useContext } from "react";
import type { SelectionMode } from "./selectionMode";

interface MenuContextType {
    onSelect?(event: SyntheticEvent, key: string): void;
    selectionMode?: SelectionMode;
    selectedKeys?: string[];
}

export const MenuContext = createContext<MenuContextType>({});

export function useMenuContext() {
    return useContext(MenuContext);
}
