import { SyntheticEvent, createContext, useContext } from "react";

export interface MenuTriggerContextType {
    isOpen?: boolean;
    open?: (event: SyntheticEvent, focusTarget: string) => void;
    close?: (event: SyntheticEvent) => void;
}

export const MenuTriggerContext = createContext<MenuTriggerContextType>({});

export function useMenuTriggerContext() {
    return useContext(MenuTriggerContext);
}
