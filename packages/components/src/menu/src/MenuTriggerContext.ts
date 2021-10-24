import { SyntheticEvent, createContext, useContext } from "react";

export interface MenuTriggerContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
    open?: (event: SyntheticEvent, focusTarget: string) => void;
}

export const MenuTriggerContext = createContext<MenuTriggerContextType>({});

export function useMenuTriggerContext() {
    return useContext(MenuTriggerContext);
}
