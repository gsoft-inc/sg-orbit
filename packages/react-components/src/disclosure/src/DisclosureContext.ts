import { createContext, useContext } from "react";

export interface DisclosureContextProps {
    isOpen?: boolean;
}

export const DisclosureContext = createContext<DisclosureContextProps>({});

export function useDisclosureContext(): DisclosureContextProps {
    return useContext(DisclosureContext);
}
