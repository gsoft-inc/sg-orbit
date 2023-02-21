import { SyntheticEvent, createContext, useContext } from "react";
import { isNil } from "../../shared";

export interface TooltipTriggerContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
}

export const TooltipTriggerContext = createContext<TooltipTriggerContextType>({});

export function useTooltipTriggerContext(): [TooltipTriggerContextType, boolean] {
    const context = useContext(TooltipTriggerContext);

    return !isNil(context)
        ? [context, true]
        : [{}, false];
}
