import { isFunction, isNil } from "lodash";
import { useCallback, useRef } from "react";

export function useForwardRef(forwardedRef) {
    const ref = useRef();

    const setRef = useCallback(node => {
        if (!isNil(forwardedRef)) {
            if (isFunction(forwardedRef)) {
                forwardedRef(node);
            } else {
                forwardedRef.current = node;
            }
        }

        ref.current = node;
    }, [forwardedRef]);

    return [ref, setRef];
}
