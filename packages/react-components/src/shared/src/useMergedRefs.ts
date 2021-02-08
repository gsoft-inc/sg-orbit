import { ForwardedRef, useCallback } from "react";
import { isFunction, isNil } from "lodash";

export function assignRef<T>(ref: ForwardedRef<T>, node: T) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
    const mergedRef = (current: T) => {
        // Resulting callback function can be used has a ref.
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        mergedRef.current = current;

        refs
            .filter(Boolean)
            .forEach(ref => {
                assignRef(ref, current);
            });
    };

    return mergedRef;
}

export function useMergedRefs<T>(...refs: ForwardedRef<T>[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs(...refs), refs);
}
