import { createContext, useContext } from "react";

export const TooltipTriggerContext = createContext({});

export function useTooltipTriggerContext() {
    return useContext(TooltipTriggerContext);
}
