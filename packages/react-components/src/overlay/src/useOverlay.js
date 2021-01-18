import { Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useFocusWithin } from "./useFocusWithin";
import { useInteractOutside } from "./useInteractOutside";

export function useOverlay({
    onHide,
    hideOnEscape,
    hideOnBlur,
    hideOnOutsideClick,
    canHide,
    overlayRef
}) {
    const hide = event => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    };

    const handleKeyDown = event => {
        if (event.keyCode === Keys.esc) {
            event.preventDefault();
            hide(event);
        }
    };

    const handleBlurWithin = useEventCallback(event => {
        if (isNil(canHide) || canHide(event.relatedTarget)) {
            hide(event);
        }
    });

    const onInteractOutside = useEventCallback(event => {
        if (isNil(canHide) || canHide(event.target)) {
            hide(event);
        }
    });

    useInteractOutside(overlayRef, {
        onInteractOutside,
        isDisabled: !hideOnOutsideClick
    });

    const focusWithinProps = useFocusWithin({ onBlurWithin: handleBlurWithin, isDisabled: !hideOnBlur });

    return {
        overlayProps: {
            ...focusWithinProps,
            onKeyDown: hideOnEscape ? handleKeyDown : undefined,
            tabIndex: "-1"
        }
    };
}
