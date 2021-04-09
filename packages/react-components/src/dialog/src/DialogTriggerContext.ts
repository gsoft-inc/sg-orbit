import { SyntheticEvent, createContext, useContext } from "react";

export interface DialogTriggerContextType {
    isOpen?: boolean;
    open?(event: SyntheticEvent): void;
    close?(event: SyntheticEvent): void;
}

export const DialogTriggerContext = createContext<DialogTriggerContextType>({});

export function useDialogTriggerContext() {
    return useContext(DialogTriggerContext);
}
