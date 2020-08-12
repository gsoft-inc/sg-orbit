import { isFunction, isNil } from "lodash";
import { useCallback } from "react";

export function assignRef(ref, node) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export function mergeRefs(...refs) {
    const mergedRef = current => {
        // Resulting callback function can be used has a ref.
        mergedRef.current = current;

        refs.forEach(ref => {
            if (!isNil(ref)) {
                assignRef(ref, current);
            }
        });
    };

    return mergedRef;
}

export function useMergedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs(...refs), refs);
}
