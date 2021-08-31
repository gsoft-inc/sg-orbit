import { FocusEvent } from "react";
import { isNil } from "./assertions";
import { useEventCallback } from "./useEventCallback";
import { useRefState } from "./useRefState";

export interface UseFocusWithinOptions {
    isDisabled?: boolean;
    onBlur?: (event: FocusEvent) => void;
    onFocus?: (event: FocusEvent) => void;
}

export function useFocusWithin({ isDisabled, onBlur, onFocus }: UseFocusWithinOptions = {}) {
    const [isFocusWithinRef, setIsFocusWithin] = useRefState(false);

    const handleFocus = useEventCallback((event: FocusEvent) => {
        // We don't want to trigger multiple onFocus when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where the focus is moving).
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
            if (!isNil(onFocus)) {
                onFocus(event);
            }

            setIsFocusWithin(true);
        }
    });

    const handleBlur = useEventCallback((event: FocusEvent) => {
        // We don't want to trigger onBlur and then immediately onFocus again when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where the focus is moving).
        if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget as Node)) {
            if (!isNil(onBlur)) {
                onBlur(event);
            }

            setIsFocusWithin(false);
        }
    });

    return isDisabled ? {} : {
        onBlur: handleBlur,
        onFocus: handleFocus
    };
}
