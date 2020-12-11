import { createContext, useContext } from "react";

export const PopoverContext = createContext({});

export const PopoverProvider = PopoverContext.Provider;

export function usePopoverContext() {
    return useContext(PopoverContext);
}
