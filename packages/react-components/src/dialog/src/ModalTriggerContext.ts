import { SyntheticEvent, createContext, useContext } from "react";

export interface ModalTriggerContextType {
    isOpen?: boolean;
    open?(event: SyntheticEvent): void;
    close?(event: SyntheticEvent): void;
}

export const ModalTriggerContext = createContext<ModalTriggerContextType>({});

export function useModalTriggerContext() {
    return useContext(ModalTriggerContext);
}
