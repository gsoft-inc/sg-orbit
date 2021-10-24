import { FocusManager } from "../../shared";
import { SyntheticEvent, createContext, useContext } from "react";

export interface ListboxContextType {
    focusManager?: FocusManager;
    focusOnHover?: boolean;
    onFocus?: (event: SyntheticEvent, key: string, activeElement: HTMLElement) => void;
    onSelect?: (event: SyntheticEvent, key: string) => void;
    selectedKeys?: string[];
}

export const ListboxContext = createContext<ListboxContextType>({});

export function useListboxContext() {
    return useContext(ListboxContext);
}
