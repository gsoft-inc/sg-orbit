import { createContext, useContext } from "react";

export interface DisclosureContextType {
    isOpen?: boolean;
}

export const DisclosureContext = createContext<DisclosureContextType>({});

export function useDisclosureContext() {
    return useContext(DisclosureContext);
}
