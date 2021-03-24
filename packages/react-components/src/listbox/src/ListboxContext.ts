import { FocusManager } from "../../shared";
import { SyntheticEvent, createContext, useContext } from "react";

export interface ListboxContextType {
    selectedKeys?: string[];
    onSelect?(event: SyntheticEvent, key: string): void;
    onFocus?(event: SyntheticEvent, key: string | string[], activeElement: HTMLElement): void
    focusManager?: FocusManager;
    focusOnHover?: boolean;
}

export const ListboxContext = createContext<ListboxContextType>({});

export function useListboxContext() {
    return useContext(ListboxContext);
}
