import { OverlayPosition, useOverlayPosition } from "./useOverlayPosition";
import { PopupType, usePopupAriaProps } from "./usePopupAriaProps";
import { SyntheticEvent, useCallback } from "react";
import { isNil, mergeProps, mergeRefs, useControllableState, useEventCallback, useFocusManager, useFocusScope, useMergedRefs } from "../../shared";

import { ResponsiveProp } from "../../styling";
import { usePopupLightDismiss } from "./usePopupLightDismiss";
import { usePopupTrigger } from "./usePopupTrigger";
import { useRestoreFocus } from "./useRestoreFocus";

export type PopupAlignment = "start" | "end";
export type PopupDirection = "top" | "bottom";
export type PopupPosition = OverlayPosition;

export type PopupAlignmentProp = ResponsiveProp<PopupAlignment>;
export type PopupDirectionProp = ResponsiveProp<PopupDirection>;
export type PopupPositionProp = ResponsiveProp<PopupPosition>;

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
    zIndex?: number;
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

export function usePopup(type: PopupType, {
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

    const overlayRef = useMergedRefs(setFocusRef);

    const updateIsOpen = useCallback((event: SyntheticEvent, newValue: boolean) => {
        if (isOpen !== newValue) {
            setIsOpen(newValue);

            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = usePopupTrigger(isOpen, overlayRef, {
        hideOnLeave,
        isDisabled: disabled,
        onHide: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, false);
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

    const overlayDismissProps = usePopupLightDismiss(triggerRef, focusScope, {
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick,
        onHide: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, false);
        }),
        trigger
    });

    const { overlayProps: overlayAriaProps, triggerProps: triggerAriaProps } = usePopupAriaProps(isOpen, type, { id });

    const focusManager = useFocusManager(focusScope, { keyProp });
    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });

    return {
        arrowProps: !hasArrow ? {} : {
            ref: arrowRef
        },
        focusManager,
        focusScope,
        isOpen,
        overlayProps: mergeProps(
            {
                ref: mergeRefs(overlayRef, overlayPositionRef),
                show: isOpen
            },
            overlayDismissProps,
            overlayAriaProps,
            restoreFocusProps
        ),
        setIsOpen: updateIsOpen,
        triggerProps: mergeProps(
            {
                ref: triggerRef,
                tabIndex: !restoreFocus && isOpen ? -1 : undefined
            },
            triggerProps,
            triggerAriaProps
        )
    };
}
