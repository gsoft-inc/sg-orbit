import { isNil } from "lodash";
import { useEffect } from "react";

function useDelayedAutoFocus(autoFocus, autoFocusDelay, disabled, onFocus) {
    useEffect(() => {
        let timeoutId;

        if (!disabled) {
            if (autoFocus && !isNil(autoFocusDelay)) {
                timeoutId = setTimeout(() => {
                    onFocus();
                }, autoFocusDelay);
            }
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [autoFocus, autoFocusDelay, disabled, onFocus]);
}

export function useAutoFocus(autoFocus, autoFocusDelay, disabled, onFocus) {
    useDelayedAutoFocus(autoFocus, autoFocusDelay, disabled, onFocus);

    return {
        autoFocus: !disabled && autoFocus && isNil(autoFocusDelay)
    };
}
