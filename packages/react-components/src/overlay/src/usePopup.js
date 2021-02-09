import { isNil, isNumber } from "lodash";
import { isTargetParent } from "./isTargetParent";
import { mergeProps, useAutoFocusChild, useCommittedRef, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { useCallback, useState } from "react";
import { useOverlayLightDismiss } from "./useOverlayLightDismiss";
import { useOverlayPosition } from "./useOverlayPosition";
import { useOverlayTrigger } from "./useOverlayTrigger";
import { useRestoreFocus } from "./useRestoreFocus";

export function usePopup(type, {
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
    position: positionProp,
    offset,
    allowFlip = true,
    allowPreventOverflow = true,
    boundaryElement,
    zIndex = 10000,
    keyProp
}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();
    const [arrowElement, setArrowElement] = useState();

    const [focusScope, setFocusRef] = useFocusScope();

    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const updateIsOpen = useCallback((event, newValue) => {
        if (isOpen !== newValue) {
            if (!isNil(onOpenChange)) {
                onOpenChange(event, newValue);
            }

            setIsOpen(newValue);
        }
    }, [onOpenChange, isOpen, setIsOpen]);

    const triggerProps = useOverlayTrigger({
        trigger,
        onToggle: useEventCallback(event => {
            updateIsOpen(event, !isOpen);
        }),
        onShow: useEventCallback(event => {
            updateIsOpen(event, true);
        }),
        onHide: useEventCallback(event => {
            // Prevent from closing when the focus goes to an element of the overlay when opening.
            if (!isTargetParent(overlayElement, event.relatedTarget)) {
                updateIsOpen(event, false);
            }
        })
    });

    const overlayDismissProps = useOverlayLightDismiss(useCommittedRef(overlayElement), {
        trigger,
        onHide: useEventCallback(event => {
            // Ignore events related to the trigger to prevent double toggle.
            if (event.target !== triggerElement && !isTargetParent(triggerElement, event.target) && event.relatedTarget !== triggerElement) {
                updateIsOpen(event, false);
            }
        }),
        hideOnEscape,
        hideOnLeave,
        hideOnOutsideClick
    });

    const { overlayStyles, overlayProps: overlayPositionProps, arrowStyles, position } = useOverlayPosition(triggerElement, overlayElement, {
        arrowElement: hasArrow ? arrowElement : undefined,
        position: positionProp,
        offset,
        allowFlip,
        boundaryElement,
        allowPreventOverflow
    });

    const restoreFocusProps = useRestoreFocus(focusScope, { isDisabled: !restoreFocus || !isOpen });
    const focusManager = useFocusManager(focusScope, { keyProp });

    useAutoFocusChild(focusManager, {
        ...autoFocusOptions,
        isDisabled: !autoFocus || !isOpen,
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        onNotFound: useEventCallback(() => {
            overlayElement?.focus();
        })
    });

    const overlayId = useId(id, id ? undefined : "o-ui-overlay");

    return {
        isOpen,
        setIsOpen: updateIsOpen,
        triggerElement,
        overlayElement,
        arrowElement,
        focusScope,
        focusManager,
        position,
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
        ),
        arrowProps: !hasArrow ? {} : {
            className: "o-ui-overlay-arrow",
            style: arrowStyles,
            ref: setArrowElement
        }
    };
}
