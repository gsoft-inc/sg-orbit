import { createContext, useContext } from "react";

export const AccordionItemContext = createContext({});

export const AccordionItemProvider = AccordionItemContext.Provider;

export function useAccordionItemContext() {
    return useContext(AccordionItemContext);
}
