import { SyntheticEvent, createContext, useContext } from "react";

export interface DisclosureContextType {
    isOpen?: boolean;
    close?: (event: SyntheticEvent) => void;
}

export const DisclosureContext = createContext<DisclosureContextType>({});

export function useDisclosureContext() {
    return useContext(DisclosureContext);
}
