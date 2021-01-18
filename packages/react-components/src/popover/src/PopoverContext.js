import { createContext, useContext } from "react";

export const PopoverContext = createContext({});

export function usePopoverContext() {
    return useContext(PopoverContext);
}
