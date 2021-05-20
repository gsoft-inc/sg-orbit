import { MutableRefObject, RefCallback, RefObject, SetStateAction, useCallback } from "react";
import { isFunction, isNil } from "./assertions";

export type AssignableRef<T> = MutableRefObject<T> | RefCallback<T>;

export function assignRef<T>(ref: AssignableRef<T>, node: T) {
    if (!isNil(ref)) {
        if (isFunction(ref)) {
            ref(node);
        } else {
            ref.current = node;
        }
    }
}

export type UnwrapStateType<T> = T extends SetStateAction<infer U> ? U : T;

export type MergedRef<T> = RefCallback<T> & RefObject<T>;

export function mergeRefs<T>(...refs: AssignableRef<T>[]) {
    const mergedRef = ((current: T) => {
        (mergedRef as MutableRefObject<T>).current = current;

        refs
            .filter(Boolean)
            .forEach(ref => {
                assignRef<T>(ref, current);
            });
    }) as MergedRef<UnwrapStateType<T>>;

    return mergedRef;
}

export function useMergedRefs<T>(...refs: AssignableRef<T>[]) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs<T>(...refs), refs);
}
