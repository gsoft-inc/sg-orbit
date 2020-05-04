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

/**
 * @param {...Function|Object} refs - Refs to combine.
 * @returns {Function} - A callback ref.
 * @example
 * const combinedRef = useCombinedRefs(forwardedRef);
 *
 * return <div ref={combinedRef}>...</div>
 */
export function useCombinedRefs(...refs) {
    const combinedRef = useCallback(current => {
        // Support using the returned callback function has a ref.
        combinedRef.current = current;

        refs.forEach(ref => {
            if (!isNil(ref)) {
                assignRef(ref, current);
            }
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, refs);

    return combinedRef;
}
