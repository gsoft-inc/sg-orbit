import { FocusEvent } from "react";
import { isNil, useEventCallback, useRefState } from "../../shared";

export interface UseFocusWithinOptions {
    onFocus?: (event: FocusEvent) => void;
    onBlur?: (event: FocusEvent) => void;
    isDisabled?: boolean;
}

export function useFocusWithin({ onFocus, onBlur, isDisabled }: UseFocusWithinOptions = {}) {
    const [isFocusWithinRef, setIsFocusWithin] = useRefState(false);

    const handleFocus = useEventCallback((event: FocusEvent) => {
        if (!isNil(onFocus)) {
            onFocus(event);
        }

        setIsFocusWithin(true);
    });

    const handleBlur = useEventCallback((event: FocusEvent) => {
        // We don't want to trigger onBlur and then immediately onFocus again when moving focus inside the element. Only trigger if the currentTarget doesn't
        // include the relatedTarget (where focus is moving).
        if (isFocusWithinRef.current && !event.currentTarget.contains(event.relatedTarget as Node)) {
            if (!isNil(onBlur)) {
                onBlur(event);
            }

            setIsFocusWithin(false);
        }
    });

    return isDisabled ? {} : {
        onFocus: handleFocus,
        onBlur: handleBlur
    };
}
