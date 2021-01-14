import { createContext, useContext } from "react";

export const AccordionContext = createContext({});

export function useAccordionContext() {
    return useContext(AccordionContext);
}
