import { createContext, useContext } from "react";

export const TooltipContext = createContext({});

export function useTooltipContext() {
    return useContext(TooltipContext);
}
