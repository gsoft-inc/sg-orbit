import { FocusEvent, SyntheticEvent, useCallback } from "react";
import { isNil, mergeProps, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { isTargetParent } from "./isTargetParent";
import { useOverlayPosition } from "./useOverlayPosition";
import { useOverlayTrigger } from "./useOverlayTrigger";
import { usePopupLightDismiss } from "./usePopupLightDismiss";
import { useRestoreFocus } from "./useRestoreFocus";

export type PopupAlignment = "start" | "end";

export type PopupDirection = "top" | "bottom" | "left" | "right";

export type PopupPosition = PopupDirection | `${PopupDirection}-${PopupAlignment}`;

export type PopupTrigger = "none" | "click";

export interface UsePopupOptions {
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
    defaultOpen?: boolean;
    disabled?: boolean;
    hasArrow?: boolean;
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean;
    id?: string;
    keyProp?: string;
    offset?: number[];
    onOpenChange?: (event: SyntheticEvent, newValue: boolean) => void;
    open?: boolean | null;
    position?: PopupPosition;
    restoreFocus?: boolean;
    trigger?: PopupTrigger;
}

export function usePopup(type: "menu" | "listbox" | "dialog", {
    allowFlip = true,
    allowPreventOverflow = true,
    boundaryElement,
    defaultOpen,
    disabled,
    hasArrow,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick,
    id,
    keyProp,
    offset,
    onOpenChange,
    open,
    position,
    restoreFocus = true,
    trigger = "click"
}: UsePopupOptions = {}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);

    const [focusScope, setFocusRef] = useFocusScope();

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        if (isOpen !== newValue) {
            setIsOpen(newValue);

            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = useOverlayTrigger(isOpen, {
        hideOnLeave,
        isDisabled: disabled,
        onHide: useEventCallback((event: SyntheticEvent) => {
            // Prevent from closing when the focus goes to an element of the overlay on opening.
            if (!isTargetParent((event as FocusEvent).relatedTarget, overlayRef)) {
                updateIsOpen(event, false);
            }
        }),
        onShow: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, true);
        }),
        trigger
    });

    const { arrowRef, overlayRef: overlayPositionRef, triggerRef } = useOverlayPosition({
        allowFlip,
        allowPreventOverflow,
        boundaryElement,
        hasArrow,
        offset,
        position
    });

    const overlayRef = useMergedRefs(overlayPositionRef, setFocusRef);

    const overlayDismissProps = usePopupLightDismiss(triggerRef, overlayRef, {
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick,
        onHide: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, false);
        }),
        trigger
    });

    const focusManager = useFocusManager(focusScope, { keyProp });
    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });

    const overlayId = useId(id, "o-ui-overlay");

    return {
        arrowProps: !hasArrow ? {} : {
            ref: arrowRef
        },
        focusManager,
        focusScope,
        isOpen,
        overlayProps: mergeProps(
            {
                id: overlayId,
                ref: overlayRef,
                show: isOpen
            },
            overlayDismissProps,
            restoreFocusProps
        ),
        setIsOpen: updateIsOpen,
        triggerProps: mergeProps(
            {
                "aria-controls": isOpen ? overlayId : undefined,
                "aria-expanded": isOpen,
                "aria-haspopup": type,
                ref: triggerRef,
                tabIndex: !restoreFocus && isOpen ? -1 : undefined
            },
            triggerProps
        )
    };
}
