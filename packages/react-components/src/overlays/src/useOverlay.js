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
    const onKeyDown = event => {
        if (event.keyCode === KEYS.escape) {
            event.preventDefault();

            if (!isNil(onHide)) {
                onHide(event);
            }
        }
    };

    const onBlurWithin = useEventCallback(event => {
        if (isNil(canHideOnBlur) || canHideOnBlur(event.relatedTarget )) {
            if (!isNil(onHide)) {
                onHide(event);
            }
        }
    });

    const onInteractOutside = useEventCallback(event => {
        if (!isNil(onHide)) {
            onHide(event);
        }
    });

    useInteractOutside({ targetRef: overlayRef, onInteractOutside, isDisabled: !hideOnOutsideClick });

    const focusWithinProps = useFocusWithin({ onBlurWithin, isDisabled: !hideOnBlur });

    return {
        ...focusWithinProps,
        onKeyDown: hideOnEscape ? onKeyDown : undefined
        // tabIndex: "-1"
    };
}
