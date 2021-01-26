import { FocusTarget } from "./focusTarget";
import { disposables } from "./useDisposables";
import { isNil } from "lodash";
import { useChainedEventCallback } from "./useChainedEventCallback";
import { useEffect } from "react";
import { useEventCallback } from "./useEventCallback";

function useAbstractAutoFocus({ isDisabled, delay, onFocus }) {
    useEffect(() => {
        const d = disposables();

        if (!isDisabled) {
            if (delay) {
                d.setTimeout(() => { onFocus(); }, delay);
            } else {
                d.nextFrame(() => { onFocus(); });
            }
        }

        return () => {
            d.dispose();
        };
    }, [isDisabled, delay, onFocus]);
}

export function useAutoFocus(targetRef, { isDisabled, delay, onFocus } = {}) {
    useAbstractAutoFocus({
        isDisabled,
        delay,
        onFocus: useChainedEventCallback(onFocus, () => {
            if (!isNil(targetRef.current) && !targetRef.current.hasAttribute("disabled")) {
                targetRef.current.focus();
            }
        })
    });
}

export function useAutoFocusChild(focusManager, { target = FocusTarget.first, isDisabled, delay, onFocus, onNotFound } = {}) {
    useAbstractAutoFocus({
        isDisabled: isDisabled,
        delay,
        onFocus: useEventCallback(() => {
            // Do not autofocus another child if there is already one focused.
            if (!focusManager.hasFocus()) {
                focusManager.focusTarget(target, { onFocus, onNotFound });
            }
        })
    });
}


