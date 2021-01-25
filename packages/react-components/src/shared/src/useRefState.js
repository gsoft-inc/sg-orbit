import { useCallback, useRef } from "react";
import { useForceRender } from "./useForceRender";

export function useRefState(initialValue) {
    const rerender = useForceRender();

    const valueRef = useRef(initialValue);

    const setValue = useCallback((newValue, forceRender = false) => {
        valueRef.current = newValue;

        if (forceRender) {
            rerender();
        }
    }, [valueRef, rerender]);

    return [valueRef, setValue];
}
