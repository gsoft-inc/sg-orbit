import { createContext } from "react";

interface ModalContextState {
    onClose: () => void | null;
}

export const ModalContext = createContext<ModalContextState>({ onClose: null });
