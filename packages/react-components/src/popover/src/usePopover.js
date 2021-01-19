import { isNil } from "lodash";
import { mergeProps, useCommittedRef, useControllableState, useEventCallback } from "../../shared";
import { useCallback } from "react";
import { useOverlay } from "../../overlay";
import { usePopoverPosition } from "./usePopoverPosition";
import { usePopoverTrigger } from "./usePopoverTrigger";

export function usePopover(triggerElement, overlayElement, type, {
    show,
    defaultShow,
    onVisibilityChange,
    hideOnEscape,
    hideOnBlur,
    hideOnOutsideClick,
    position,
    offset,
    allowFlip,
    allowPreventOverflow,
    pinned,
    boundaryElement,
    zIndex = 10000
}) {
    const [isVisible, setIsVisible] = useControllableState(show, defaultShow, false);

    const overlayRef = useCommittedRef(overlayElement);

    const setVisibility = useCallback((event, newVisibility) => {
        if (!isNil(onVisibilityChange)) {
            onVisibilityChange(event, newVisibility);
        }

        setIsVisible(newVisibility);
    }, [onVisibilityChange, setIsVisible]);

    const { overlayProps } = useOverlay(overlayRef, {
        isVisible,
        onHide: useEventCallback(event => {
            setVisibility(event, false);
        }),
        hideOnEscape,
        hideOnBlur,
        hideOnOutsideClick,
        canHide: useCallback(target => target !== triggerElement, [triggerElement])
    });

    const { triggerProps, overlayProps: overlayTriggerProps } = usePopoverTrigger(isVisible, type, {
        onToggle: useEventCallback(event => {
            setVisibility(event, !isVisible);
        })
    });

    const { overlayStyles, overlayProps: overlayPositionProps } = usePopoverPosition(triggerElement, overlayElement, {
        position,
        offset,
        allowFlip,
        boundaryElement,
        allowPreventOverflow,
        pinned
    });

    return {
        isVisible,
        setVisibility,
        triggerProps,
        overlayProps: mergeProps(
            overlayProps,
            overlayTriggerProps,
            overlayPositionProps,
            {
                style: {
                    ...overlayStyles,
                    zIndex
                }
            }
        )
    };
}
