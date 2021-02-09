import { isNil } from "lodash";
import { useEventCallback, useResizeObserver } from "../../shared";
import { usePopper } from "react-popper";

export function useOverlayPosition(triggerElement, overlayElement, {
    arrowElement,
    position: positionProp = "bottom",
    offset,
    allowFlip = false,
    allowPreventOverflow = false,
    boundaryElement = document.body
}) {
    const popperModifiers = [];

    if (!isNil(offset)) {
        popperModifiers.push({
            name: "offset",
            options: {
                offset
            }
        });
    }

    popperModifiers.push({
        name: "flip",
        enabled: allowFlip,
        options: {
            boundary: boundaryElement
        }
    });

    popperModifiers.push({
        name: "preventOverflow",
        enabled: allowPreventOverflow,
        options: {
            boundary: boundaryElement
        }
    });

    if (!isNil(arrowElement)) {
        popperModifiers.push({
            name: "arrow",
            options: {
                element: arrowElement
            }
        });
    }

    const { styles, attributes, update, state } = usePopper(triggerElement, overlayElement, {
        placement: positionProp,
        modifiers: popperModifiers
    });

    let position = positionProp;

    if (!isNil(state)) {
        position = state.placement;
    }

    const handleOverlayElementResize = useEventCallback(() => {
        if (!isNil(update)) {
            update();
        }
    });

    useResizeObserver(overlayElement, handleOverlayElementResize);

    return {
        overlayStyles: styles.popper,
        overlayProps: attributes.popper || {},
        arrowStyles: styles.arrow,
        position
    };
}
