import { isNil } from "lodash";
import { useEventCallback, useResizeObserver } from "../../shared";
import { usePopper } from "react-popper";

const createPopperModifier = (name, options) => ({ name, options });

export function usePopoverPosition({
    position = "bottom",
    triggerElement,
    overlayElement,
    offset,
    canFlip,
    boundaryElement = document.body,
    canUpdatePosition,
    pinned
}) {
    const popperModifiers = [];

    if (offset) {
        popperModifiers.push(createPopperModifier("offset", { offset }));
    }

    if (canFlip && !pinned) {
        popperModifiers.push(createPopperModifier("flip", { boundary: boundaryElement }));
    }

    if (canUpdatePosition && !pinned) {
        popperModifiers.push(createPopperModifier("preventOverflow", { boundary: boundaryElement }));
    }

    const { styles, attributes, update: updatePopper } = usePopper(triggerElement, overlayElement, {
        placement: position,
        modifiers: popperModifiers
    });

    const handleOverlayElementResize = useEventCallback(() => {
        if (!isNil(updatePopper)) {
            updatePopper();
        }
    });

    useResizeObserver(overlayElement, handleOverlayElementResize);

    return {
        popoverPositionStyles: styles.popper,
        ...attributes
    };
}
