import { isFunction, isNil } from "lodash";
import { useEffect, useRef } from "react";

export function assignRef(ref, node) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export function useCombinedRefs(...refs) {
    const targetRef = useRef();

    useEffect(() => {
        refs.forEach(ref => {
            assignRef(ref, targetRef.current);
        });
    }, [refs]);

    return targetRef;
}
