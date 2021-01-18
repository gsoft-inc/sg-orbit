import { isNil } from "lodash";
import { useEventCallback } from "../../shared";
import { useRef } from "react";

export function useFocusWithin({ onFocusWithin, onBlurWithin, isDisabled }) {
    const isFocusWithinRef = useRef();

    const onFocus = useEventCallback(event => {
        if (!isNil(onFocusWithin)) {
            onFocusWithin(event);
        }

        isFocusWithinRef.current = true;
    });

    const onBlur = useEventCallback(event => {

        // We don't want to trigger onBlurWithin and then immediately onFocusWithin again when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where focus is moving).
        if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget)) {
            if (!isNil(onBlurWithin)) {
                onBlurWithin(event);
            }

            isFocusWithinRef.current = false;
        }
    });

    return isDisabled ? {} : {
        onFocus,
        onBlur
    };
}
