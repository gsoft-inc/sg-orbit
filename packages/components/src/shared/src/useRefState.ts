import { RefObject, useCallback, useRef } from "react";
import { useForceRender } from "./useForceRender";

export function useRefState<T>(initialValue?: T): [RefObject<T>, (newValue: T, rerender?: boolean) => void] {
    const forceRender = useForceRender();

    const valueRef = useRef<T>(initialValue);

    const setValue = useCallback((newValue: T, rerender = false) => {
        if (valueRef.current !== newValue) {
            valueRef.current = newValue;

            if (rerender) {
                forceRender();
            }
        }
    }, [valueRef, forceRender]);

    return [valueRef, setValue];
}
