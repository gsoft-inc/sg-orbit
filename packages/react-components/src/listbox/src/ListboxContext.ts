import { createContext, useContext } from "react";

export interface ListboxContextType {
    selectedKeys?: any;
    onSelect?: any;
    onFocus?: any;
    focusManager?: any;
    focusOnHover?: any;
}

export const ListboxContext = createContext<ListboxContextType>({});

export function useListboxContext() {
    return useContext(ListboxContext);
}
