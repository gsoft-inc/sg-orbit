import { isNil } from "lodash";
import { useEffect } from "react";

function useDelayedAutofocus(autofocus, autofocusDelay, disabled, onFocus) {
    useEffect(() => {
        let timeoutId;

        if (!disabled) {
            if (autofocus && !isNil(autofocusDelay)) {
                timeoutId = setTimeout(() => {
                    onFocus();
                }, autofocusDelay);
            }
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autofocus, autofocusDelay, disabled, onFocus]);
}

export function useAutofocus(autofocus, autofocusDelay, disabled, onFocus) {
    useDelayedAutofocus(autofocus, autofocusDelay, disabled, onFocus);

    return {
        autoFocus: !disabled && autofocus && isNil(autofocusDelay)
    };
}
