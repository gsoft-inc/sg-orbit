import { SyntheticEvent, createContext, useContext } from "react";

export interface AccordionContextType {
    expandedKeys?: string[];
    onToggle?: (event: SyntheticEvent, toggledIndex: string) => void
}

export const AccordionContext = createContext<AccordionContextType>({});

export function useAccordionContext() {
    return useContext(AccordionContext);
}
