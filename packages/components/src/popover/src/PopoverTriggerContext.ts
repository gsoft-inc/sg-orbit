import { SyntheticEvent, createContext, useContext } from "react";
import { isNil } from "../../shared";

export interface PopoverTriggerContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
}

export const PopoverTriggerContext = createContext<PopoverTriggerContextType>(null);

export function usePopoverTriggerContext(): [PopoverTriggerContextType, boolean] {
    // return useContext(PopoverTriggerContext);

    const context = useContext(PopoverTriggerContext);

    return !isNil(context)
        ? [context, true]
        : [{}, false];
}
