import { debounce } from "lodash";
import { useCallback } from "react";

export function useDebounceCallback(callback, delay, deps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return useCallback(debounce(callback, delay), deps);
}
