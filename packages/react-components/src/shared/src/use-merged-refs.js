import { mergeRefs } from "./merge-refs";
import { useCallback } from "react";

/**
 * @param {...Function|Object} refs - Refs to combine.
 * @returns {Function} - A callback ref.
 * @example
 * const combinedRef = useMergedRefs(forwardedRef);
 *
 * return <div ref={combinedRef}>...</div>
 */
export function useMergedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(mergeRefs(...refs), refs);
}
