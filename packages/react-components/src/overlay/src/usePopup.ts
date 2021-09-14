import { FocusEvent, SyntheticEvent, useCallback } from "react";
import { OverlayPosition, useOverlayPosition } from "./useOverlayPosition";
import { ZindexProp, isNil, mergeProps, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { isTargetParent } from "./isTargetParent";
import { useOverlayTrigger } from "./useOverlayTrigger";
import { usePopupLightDismiss } from "./usePopupLightDismiss";
import { useRestoreFocus } from "./useRestoreFocus";

export type PopupAlignment = "start" | "end";

export type PopupDirection = "top" | "bottom";

export type PopupPosition = OverlayPosition;

export type PopupTrigger = "none" | "click";

export interface PopupProps {
    /**
     * The horizontal alignment of the popup relative to the trigger.
     */
    align?: PopupAlignment;
    /**
     * Whether or not the popup can flip when it will overflow it's boundary area.
     */
    allowFlip?: boolean;
    /**
     * Whether or not the popup position can change to prevent it from being cut off so that it stays visible within its boundary area.
     */
    allowPreventOverflow?: boolean;
    /**
     * The initial value of open when in auto controlled mode.
     */
    defaultOpen?: boolean;
    /**
     * The direction the open will open relative to the trigger.
     */
    direction?: PopupDirection;
    /**
     * Called when the open state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {boolean} isOpen - Indicate if the popup is visible.
     * @returns {void}
     */
    onOpenChange?: (event: SyntheticEvent, isOpen: boolean) => void;
    /**
     * Whether or not to show the popup.
     */
    open?: boolean;
    /**
     * The z-index of the menu.
     */
    zIndex?: ZindexProp;
}

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
