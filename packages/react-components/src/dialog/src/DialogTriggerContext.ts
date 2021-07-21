import { SyntheticEvent, createContext, useContext } from "react";

export interface DialogTriggerContextType {
    isOpen?: boolean;
    close?: (event: SyntheticEvent) => void;
}

export const DialogTriggerContext = createContext<DialogTriggerContextType>({});

export function useDialogTriggerContext() {
    return useContext(DialogTriggerContext);
}
