import { RefObject, SyntheticEvent, createContext, useContext } from "react";

export interface PopoverTriggerContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
    // Passing the trigger ref down to the popover through a context is not ideal at all but it's currently required to use
    // the usePopupLightDismiss hook which prevent double toggle when closing the popover by clicking on the trigger.
    triggerRef?: RefObject<HTMLElement>;
}

export const PopoverTriggerContext = createContext<PopoverTriggerContextType>({});

export function usePopoverTriggerContext() {
    return useContext(PopoverTriggerContext);
}
