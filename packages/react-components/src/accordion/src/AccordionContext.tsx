import { SyntheticEvent, createContext, useContext } from "react";

export interface AccordionContextType {
    selectedIndexes?: number[];
    onToggle?: (event: SyntheticEvent, toggledIndex: number) => void
}

export const AccordionContext = createContext<AccordionContextType>({});

export function useAccordionContext() {
    return useContext(AccordionContext);
}
