import { isFunction, isNil } from "lodash";
import { useCallback, useRef } from "react";

export function assignRef(node, ref) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export function useForwardRef(forwardedRef) {
    const ref = useRef();

    const setRef = useCallback(node => {
        assignRef(node, forwardedRef);
        assignRef(ref, node);
    }, [forwardedRef]);

    return [ref, setRef];
}
