import { DialogTriggerContextType, useDialogTriggerContext } from "../../dialog";

export type ModalTriggerContextType = DialogTriggerContextType;

export function useModalTriggerContext() {
    return useDialogTriggerContext() as DialogTriggerContextType;
}
