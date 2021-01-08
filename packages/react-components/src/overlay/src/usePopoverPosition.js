import { isNil } from "lodash";
import { useEventCallback, useResizeObserver } from "../../shared";
import { usePopper } from "react-popper";

export function usePopoverPosition({
    position = "bottom",
    triggerElement,
    overlayElement,
    offset,
    allowFlip,
    boundaryElement = document.body,
    allowPreventOverflow,
    pinned
}) {
    const popperModifiers = [];

    if (offset) {
        popperModifiers.push({
            name: "offset",
            options: {
                offset
            }
        });
    }

    popperModifiers.push({
        name: "flip",
        enabled: allowFlip && !pinned,
        options: {
            boundary: boundaryElement
        }
    });

    popperModifiers.push({
        name: "preventOverflow",
        enabled: allowPreventOverflow && !pinned,
        options: {
            boundary: boundaryElement
        }
    });

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
        overlayStyles: {
            ...styles.popper,
            zIndex: 100000
        },
        overlayProps: attributes.popper || {}
    };
}
