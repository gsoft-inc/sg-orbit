import { SyntheticEvent, createContext, useContext } from "react";

export interface PopoverTriggerContextType {
    close?(event: SyntheticEvent): void;
    isOpen?: boolean;
}

export const PopoverTriggerContext = createContext<PopoverTriggerContextType>({});

export function usePopoverTriggerContext() {
    return useContext(PopoverTriggerContext);
}
