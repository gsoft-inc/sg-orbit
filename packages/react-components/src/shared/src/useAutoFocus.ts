import { FocusManager, FocusOptions } from "./useFocusManager";
import { FocusTarget } from "./focusTarget";
import { MutableRefObject, useEffect } from "react";
import { disposables } from "./useDisposables";
import { isNil } from "lodash";
import { useChainedEventCallback } from "./useChainedEventCallback";
import { useEventCallback } from "./useEventCallback";

interface AutoFocusOptions extends FocusOptions {
    target?: FocusTarget;
    isDisabled?: boolean;
    delay?: number;
}

function useAbstractAutoFocus({ isDisabled, delay, onFocus }: AutoFocusOptions): void {
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

export function useAutoFocus<T extends HTMLElement>(targetRef: MutableRefObject<T>, { isDisabled, delay, onFocus }: AutoFocusOptions = {}): void {
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

export function useAutoFocusChild(focusManager: FocusManager, { target = FocusTarget.first, isDisabled, delay, canFocus, onFocus, onNotFound }: AutoFocusOptions = {}): void {
    useAbstractAutoFocus({
        isDisabled: isDisabled,
        delay,
        onFocus: useEventCallback(() => {
            // Do not autofocus another child if there is already one focused.
            if (!focusManager.hasFocus()) {
                focusManager.focusTarget(target, { canFocus, onFocus, onNotFound });
            }
        })
    });
}


