import { SyntheticEvent, createContext, useContext } from "react";

export interface DisclosureContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
}

export const DisclosureContext = createContext<DisclosureContextType>({});

export function useDisclosureContext() {
    return useContext(DisclosureContext);
}
