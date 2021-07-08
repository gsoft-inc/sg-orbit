import {
    AutoFocusChildOptions,
    isNil,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useControllableState,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useId,
    useMergedRefs
} from "../../shared";
import { FocusEvent, SyntheticEvent, useCallback } from "react";
import { OverlayPosition, useOverlayPosition } from "./useOverlayPosition";
import { OverlayTrigger, useOverlayTrigger } from "./useOverlayTrigger";
import { isTargetParent } from "./isTargetParent";
import { usePopupLightDismiss } from "./usePopupLightDismiss";
import { useRestoreFocus } from "./useRestoreFocus";

export interface UsePopupOptions {
    id?: string;
    open?: boolean | null;
    defaultOpen?: boolean;
    onOpenChange?: (event: SyntheticEvent, newValue: boolean) => void;
    hideOnEscape?: boolean;
    hideOnLeave?: boolean;
    hideOnOutsideClick?: boolean;
    restoreFocus?: boolean;
    autoFocus?: boolean | number;
    autoFocusOptions?: AutoFocusChildOptions;
    trigger?: OverlayTrigger;
    hasArrow?: boolean;
    position?: OverlayPosition;
    offset?: number[];
    disabled?: boolean;
    allowFlip?: boolean;
    allowPreventOverflow?: boolean;
    boundaryElement?: HTMLElement;
    keyProp?: string;
}

export function usePopup(type: "menu" | "listbox" | "dialog", {
    id,
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape = true,
    hideOnLeave = true,
    hideOnOutsideClick,
    restoreFocus = true,
    autoFocus,
    autoFocusOptions = {},
    trigger = "click",
    hasArrow = false,
    position,
    offset,
    disabled,
    allowFlip = true,
    allowPreventOverflow = true,
    boundaryElement,
    keyProp
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
        trigger,
        onShow: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, true);
        }),
        onHide: useEventCallback((event: SyntheticEvent) => {
            // Prevent from closing when the focus goes to an element of the overlay on opening.
            if (!isTargetParent((event as FocusEvent).relatedTarget, overlayRef)) {
                updateIsOpen(event, false);
            }
        }),
        hideOnLeave,
        isDisabled: disabled
    });

    const { triggerRef, overlayRef: overlayPositionRef, arrowRef } = useOverlayPosition({
        position,
        offset,
        allowFlip,
        allowPreventOverflow,
        boundaryElement,
        hasArrow
    });

    const overlayRef = useMergedRefs(overlayPositionRef, setFocusRef);

    const overlayDismissProps = usePopupLightDismiss(triggerRef, overlayRef, {
        trigger,
        onHide: useEventCallback((event: SyntheticEvent) => {
            updateIsOpen(event, false);
        }),
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick
    });

    const focusManager = useFocusManager(focusScope, { keyProp });
    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });

    useAutoFocusChild(focusManager, {
        ...autoFocusOptions,
        isDisabled: !autoFocus || !isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: useEventCallback(() => {
            overlayRef.current?.focus();
        })
    });

    const overlayId = useId(id, "o-ui-overlay");

    return {
        isOpen,
        setIsOpen: updateIsOpen,
        focusScope,
        focusManager,
        triggerProps: mergeProps(
            {
                tabIndex: !restoreFocus && isOpen ? -1 : undefined,
                "aria-haspopup": type,
                "aria-expanded": isOpen,
                "aria-controls": isOpen ? overlayId : undefined,
                ref: triggerRef
            },
            triggerProps
        ),
        overlayProps: mergeProps(
            {
                id: overlayId,
                show: isOpen,
                tabIndex: -1,
                ref: overlayRef
            },
            overlayDismissProps,
            restoreFocusProps
        ),
        arrowProps: !hasArrow ? {} : {
            ref: arrowRef
        }
    };
}
