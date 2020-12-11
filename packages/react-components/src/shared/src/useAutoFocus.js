import { TABBABLE_ELEMENT_SELECTOR } from "./focusableTreeWalker";
import { disposables } from "./useDisposables";
import { isNil } from "lodash";
import { useCallback, useEffect } from "react";

function useAbstractAutoFocus({ isDisabled, delay = 0, onFocus }) {
    useEffect(() => {
        const d = disposables();

        if (!isDisabled) {
            d.setTimeout(() => { onFocus(); }, delay);
        }

        return () => {
            d.dispose();
        };
    }, [isDisabled, onFocus, delay]);
}

export function useAutoFocus({ targetRef, isDisabled, delay, onFocus }) {
    const handleFocus = useCallback(() => {
        if (!isNil(targetRef.current) && !targetRef.current.hasAttribute("disabled")) {
            targetRef.current.focus();

            if (!isNil(onFocus)) {
                onFocus();
            }
        }
    }, [targetRef, onFocus]);

    useAbstractAutoFocus({ isDisabled, delay, onFocus: handleFocus });
}

export function useAutoFocusFirstTabbableElement({ rootRef, isDisabled, delay, onFocus, onNotFound }) {
    const handleFocus = useCallback(() => {
        if (!isNil(rootRef.current)) {
            const element = rootRef.current.querySelector(TABBABLE_ELEMENT_SELECTOR);

            if (!isNil(element)) {
                element.focus();

                if (!isNil(onFocus)) {
                    onFocus();
                }
            } else {
                if (!isNil(onNotFound)) {
                    onNotFound();
                }
            }
        }
    }, [rootRef, onFocus, onNotFound]);

    useAbstractAutoFocus({ isDisabled, delay, onFocus: handleFocus });
}
