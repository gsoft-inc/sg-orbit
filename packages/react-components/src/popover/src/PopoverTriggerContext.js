import { createContext, useContext } from "react";

export const PopoverTriggerContext = createContext({});

export function usePopoverTriggerContext() {
    return useContext(PopoverTriggerContext);
}
