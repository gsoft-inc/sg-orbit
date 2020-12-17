import { createContext, useContext } from "react";

export const AccordionItemContext = createContext({});

export function useAccordionItemContext() {
    return useContext(AccordionItemContext);
}
