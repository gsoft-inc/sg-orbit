import { createContext, useContext } from "react";

export const AccordionContext = createContext({});

export const AccordionProvider = AccordionContext.Provider;

export function useAccordionContext() {
    return useContext(AccordionContext);
}
