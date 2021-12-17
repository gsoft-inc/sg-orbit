import { FocusEvent, RefObject, SyntheticEvent } from "react";
import { UseOverlayTriggerOptions, useOverlayTrigger } from "./useOverlayTrigger";
import { isNil, useEventCallback } from "../../shared";

import { isTargetParent } from "./isTargetParent";

export type UsePopupTriggerOptions = UseOverlayTriggerOptions;

export function usePopupTrigger(isOpen: boolean, overlayRef: RefObject<HTMLElement>, { hideOnLeave, isDisabled, onHide, onShow, trigger }: UsePopupTriggerOptions) {
    return useOverlayTrigger(isOpen, {
        hideOnLeave,
        isDisabled: isDisabled,
        onHide: useEventCallback((event: SyntheticEvent) => {
            // Prevent from closing when the focus goes to an element of the overlay on opening.
            if (!isTargetParent((event as FocusEvent).relatedTarget, overlayRef)) {
                if (!isNil(onHide)) {
                    onHide(event);
                }
            }
        }),
        onShow,
        trigger
    });
}
