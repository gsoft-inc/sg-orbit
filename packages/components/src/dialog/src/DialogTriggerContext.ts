import { SyntheticEvent, createContext, useContext } from "react";

export interface DialogTriggerContextType {
    close?: (event: SyntheticEvent) => void;
    isOpen?: boolean;
}

export const DialogTriggerContext = createContext<DialogTriggerContextType>({});

export function useDialogTriggerContext() {
    return useContext(DialogTriggerContext);
}
