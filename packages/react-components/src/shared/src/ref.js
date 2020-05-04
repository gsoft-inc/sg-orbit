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

    const effect = () => {
        refs.forEach(ref => {
            if (!isNil(ref)) {
                assignRef(ref, targetRef.current);
            }
        });
    };

    useEffect.apply(null, [effect, ...refs]);

    return targetRef;
}
