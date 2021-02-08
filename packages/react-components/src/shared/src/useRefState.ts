import { MutableRefObject, useCallback, useRef } from "react";
import { useForceRender } from "./useForceRender";

export function useRefState<T>(initialValue: T): [MutableRefObject<T>, (newValue: T, forceRender?: boolean) => void] {
    const rerender = useForceRender();

    const valueRef = useRef<T>(initialValue);

    const setValue = useCallback((newValue: T, forceRender: boolean = false) => {
        valueRef.current = newValue;

        if (forceRender) {
            rerender();
        }
    }, [valueRef, rerender]);

    return [valueRef, setValue];
}
