import { ForwardedRef, MutableRefObject, RefCallback, RefObject, useCallback } from "react";
import { isFunction, isNil } from "./assertions";

export function assignRef<T>(ref: ForwardedRef<T>, node: T) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export type MergedRef<T> = RefCallback<T> & RefObject<T>;

export function mergeRefs<T>(...refs: ForwardedRef<T>[]) {
    const mergedRef = ((current: T) => {
        (mergedRef as MutableRefObject<T>).current = current;
        refs
            .filter(Boolean)
            .forEach(ref => {
                assignRef(ref, current);
            });
    }) as MergedRef<T>;

    return mergedRef;
}

export function useMergedRefs<T>(...refs: ForwardedRef<T>[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs(...refs), refs);
}
