import { TABBABLE_ELEMENT_SELECTOR } from "./createFocusableTreeWalker";
import { isFunction, isNil } from "lodash";
import { useCallback, useEffect } from "react";

function useAbstractAutoFocus(targetRef, isActive, onFocus, { delay = 0 } = {}) {
    useEffect(() => {
        let timeoutId;

        if (isActive && !targetRef.current.disabled) {
            timeoutId = setTimeout(() => {
                onFocus();
            }, delay);
        }

        return () => {
            if (!isNil(timeoutId)) {
                clearTimeout(timeoutId);
            }
        };
    }, [targetRef, isActive, onFocus, delay]);
}

export function useAutoFocus(targetRef, isActive, { delay, onFocus } = {}) {
    const handleFocus = useCallback(() => {
        if (!isNil(targetRef.current)) {
            targetRef.current.focus();

            if (isFunction(onFocus)) {
                onFocus();
            }
        }
    }, [targetRef, onFocus]);

    useAbstractAutoFocus(targetRef, isActive, handleFocus, { delay });
}

export function useAutoFocusFirstTabbableElement(rootRef, isActive, { delay, onFocus } = {}) {
    const handleFocus = useCallback(() => {
        if (!isNil(rootRef.current)) {
            const element = rootRef.current.querySelector(TABBABLE_ELEMENT_SELECTOR);

            if (!isNil(element)) {
                element.focus();
            }

            if (isFunction(onFocus)) {
                onFocus();
            }
        }
    }, [rootRef, onFocus]);

    useAbstractAutoFocus(rootRef, isActive, handleFocus, { delay });
}
