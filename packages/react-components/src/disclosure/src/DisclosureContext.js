import { createContext, useContext } from "react";

export const DisclosureContext = createContext({});

export const DisclosureProvider = DisclosureContext.Provider;

export function useDisclosureContext() {
    return useContext(DisclosureContext);
}
