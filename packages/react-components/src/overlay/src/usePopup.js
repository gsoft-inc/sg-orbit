import { isNil, isNumber } from "lodash";
import { mergeProps, useAutoFocusChild, useCommittedRef, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { useCallback, useState } from "react";
import { useOverlayLightDismiss } from "./useOverlayLightDismiss";
import { useOverlayPosition } from "./useOverlayPosition";
import { useOverlayTrigger } from "./useOverlayTrigger";
import { useRestoreFocus } from "./useRestoreFocus";

export function usePopup(type, {
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape = true,
    hideOnBlur = true,
    hideOnOutsideClick,
    restoreFocus = true,
    autoFocus = true,
    trigger = "click",
    position,
    offset,
    allowFlip = true,
    allowPreventOverflow = true,
    boundaryElement,
    zIndex = 10000
}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();

    const [focusScope, setFocusRef] = useFocusScope();

    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const overlayId = useId(null, "o-ui-overlay");

    const updateIsOpen = useCallback((event, newValue, options) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue, options);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = useOverlayTrigger(trigger, {
        onToggle: useEventCallback(event => {
            updateIsOpen(event, !isOpen);
        }),
        onShow: useEventCallback((event, options) => {
            updateIsOpen(event, true, options);
        }),
        onHide: useEventCallback(event => {
            // Prevent from closing when the focus goes to an element of the overlay when opening.
            if (event.target !== overlayElement && event.relatedTarget !== overlayElement) {
                updateIsOpen(event, false);
            }
        })
    });

    const overlayDismissProps = useOverlayLightDismiss(useCommittedRef(overlayElement), {
        onHide: useEventCallback(event => {
            // Ignore events related to the trigger to prevent double toggle.
            if (event.target !== triggerElement && event.relatedTarget !== triggerElement) {
                updateIsOpen(event, false);
            }
        }),
        hideOnEscape,
        hideOnBlur,
        hideOnOutsideClick
    });

    const { overlayStyles, overlayProps: overlayPositionProps } = useOverlayPosition(triggerElement, overlayElement, {
        position,
        offset,
        allowFlip,
        boundaryElement,
        allowPreventOverflow
    });

    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });
    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(
        focusManager,
        {
            isDisabled: !autoFocus || !isOpen,
            delay: isNumber(autoFocus) ? autoFocus : undefined
        });

    return {
        isOpen,
        setIsOpen: updateIsOpen,
        triggerElement,
        overlayElement,
        focusScope,
        focusManager,
        triggerProps: mergeProps(
            triggerProps,
            {
                "aria-haspopup": type,
                "aria-expanded": isOpen,
                "aria-controls": overlayId,
                ref: setTriggerElement
            }
        ),
        overlayProps: mergeProps(
            overlayDismissProps,
            overlayPositionProps,
            restoreFocusProps,
            {
                id: overlayId,
                show: isOpen,
                style: {
                    ...overlayStyles,
                    zIndex
                },
                tabIndex: "-1",
                ref: overlayRef
            }
        )
    };
}
