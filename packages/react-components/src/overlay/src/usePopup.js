import { Trigger, useOverlayTrigger } from "./useOverlayTrigger";
import { isNil, isNumber } from "lodash";
import { mergeProps, useAutoFocusChild, useCommittedRef, useControllableState, useEventCallback, useFocusManager, useFocusScope, useId, useMergedRefs } from "../../shared";
import { useCallback, useState } from "react";
import { useOverlayLightDismiss } from "./useOverlayLightDismiss";
import { useOverlayPosition } from "./useOverlayPosition";
import { useRestoreFocus } from "./useRestoreFocus";

export function usePopup(type, {
    open,
    defaultOpen,
    onOpenChange,
    hideOnEscape,
    hideOnBlur,
    hideOnOutsideClick,
    autoFocus,
    restoreFocus,
    trigger = Trigger.click,
    position,
    offset,
    allowFlip,
    allowPreventOverflow,
    pinned,
    boundaryElement,
    zIndex = 10000
}) {
    const [isOpen, setIsOpen] = useControllableState(open, defaultOpen, false);
    const [triggerElement, setTriggerElement] = useState();
    const [overlayElement, setOverlayElement] = useState();

    const [focusScope, setFocusRef] = useFocusScope();

    const overlayRef = useMergedRefs(setOverlayElement, setFocusRef);

    const overlayId = useId(null, "o-ui-overlay");

    const updateIsOpen = useCallback((event, newValue) => {
        if (!isNil(onOpenChange)) {
            onOpenChange(event, newValue);
        }

        setIsOpen(newValue);
    }, [onOpenChange, setIsOpen]);


    const triggerProps = useOverlayTrigger(trigger, {
        onToggle: useEventCallback(event => {
            updateIsOpen(event, !isOpen);
        })
    });

    const overlayDismissProps = useOverlayLightDismiss(useCommittedRef(overlayElement), {
        onHide: useEventCallback(event => {
            updateIsOpen(event, false);
        }),
        hideOnEscape,
        hideOnBlur,
        hideOnOutsideClick,
        shouldHide: useCallback(target => target !== triggerElement, [triggerElement])
    });

    const { overlayStyles, overlayProps: overlayPositionProps } = useOverlayPosition(triggerElement, overlayElement, {
        position,
        offset,
        allowFlip,
        boundaryElement,
        allowPreventOverflow,
        pinned
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
