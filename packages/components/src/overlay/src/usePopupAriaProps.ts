import { useId } from "../../shared";

export type PopupType = "menu" | "listbox" | "dialog";

export interface UsePopupAriaPropsOptions {
    id?: string;
}

export function usePopupAriaProps(isOpen: boolean, popupType: PopupType, { id } : UsePopupAriaPropsOptions = {}) {
    const overlayId = useId(id, "o-ui-overlay");

    return {
        overlayId,
        overlayProps: {
            id: overlayId
        },
        triggerProps: {
            "aria-controls": isOpen ? overlayId : undefined,
            "aria-expanded": isOpen,
            "aria-haspopup": popupType
        }
    };
}
