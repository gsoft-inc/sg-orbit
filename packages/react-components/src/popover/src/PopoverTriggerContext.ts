import { SyntheticEvent, createContext, useContext } from "react";

export interface PopoverTriggerContextType {
    isOpen?: boolean;
    close?: (event: SyntheticEvent) => void;
}

export const PopoverTriggerContext = createContext<PopoverTriggerContextType>({});

export function usePopoverTriggerContext() {
    return useContext(PopoverTriggerContext);
}
