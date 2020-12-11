import { KEYS, useEventCallback } from "../../shared";
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

    const onKeyDown = event => {
        if (event.keyCode === KEYS.esc) {
            event.preventDefault();
            hide(event);
        }
    };

    const onBlurWithin = useEventCallback(event => {
        if (isNil(canHideOnBlur) || canHideOnBlur(event.relatedTarget)) {
            hide(event);
        }
    });

    const onInteractOutside = useEventCallback(event => {
        hide(event);
    });

    useInteractOutside({ targetRef: overlayRef, onInteractOutside, isDisabled: !hideOnOutsideClick });

    const focusWithinProps = useFocusWithin({ onBlurWithin, isDisabled: !hideOnBlur });

    return {
        overlayProps: {
            ...focusWithinProps,
            onKeyDown: hideOnEscape ? onKeyDown : undefined,
            tabIndex: "-1"
        }
    };
}
