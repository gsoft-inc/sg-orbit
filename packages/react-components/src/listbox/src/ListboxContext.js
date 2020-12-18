import { createContext, useContext } from "react";

export const ListboxContext = createContext({});

export function useListboxContext() {
    return useContext(ListboxContext);
}
