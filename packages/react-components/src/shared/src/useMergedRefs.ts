import { ForwardedRef, MutableRefObject, RefCallback, RefObject, useCallback } from "react";
import { isFunction, isNil } from "lodash";

export function assignRef<T>(ref: ForwardedRef<T>, node: T): void {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export type MergedRef<T> = RefCallback<T> & RefObject<T>;

export function mergeRefs<T>(...refs: ForwardedRef<T>[]): MergedRef<T> {
    const mergedRef = ((current: T): void => {
        (mergedRef as MutableRefObject<T>).current = current;
        refs
            .filter(Boolean)
            .forEach(ref => {
                assignRef(ref, current);
            });
    }) as MergedRef<T>;

    return mergedRef;
}

export function useMergedRefs<T>(...refs: ForwardedRef<T>[]): MergedRef<T> {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs(...refs), refs);
}
