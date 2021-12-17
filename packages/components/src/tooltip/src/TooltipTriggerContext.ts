import { SyntheticEvent, createContext, useContext } from "react";

export interface TooltipTriggerContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
}

export const TooltipTriggerContext = createContext<TooltipTriggerContextType>({});

export function useTooltipTriggerContext() {
    return useContext(TooltipTriggerContext);
}
