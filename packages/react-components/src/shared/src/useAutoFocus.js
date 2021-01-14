import { FocusTarget } from "./useFocusManager";
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
        isDisabled,
        delay,
        onFocus: useEventCallback(() => {
            focusManager.focusTarget(target, { onFocus, onNotFound });
        })
    });
}


