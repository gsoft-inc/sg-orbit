import { Keys, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useFocusWithin } from "./useFocusWithin";
import { useInteractOutside } from "./useInteractOutside";

export function useOverlay({
    onHide,
    hideOnEscape,
    hideOnBlur,
    hideOnOutsideClick,
    canHideOnBlur,
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
        if (isNil(canHideOnBlur) || canHideOnBlur(event.relatedTarget)) {
            hide(event);
        }
    });

    const onInteractOutside = useEventCallback(event => {
        hide(event);
    });

    useInteractOutside(overlayRef, { onInteractOutside, isDisabled: !hideOnOutsideClick });

    const focusWithinProps = useFocusWithin({ onBlurWithin: handleBlurWithin, isDisabled: !hideOnBlur });

    return {
        overlayProps: {
            ...focusWithinProps,
            onKeyDown: hideOnEscape ? handleKeyDown : undefined,
            tabIndex: "-1"
        }
    };
}
