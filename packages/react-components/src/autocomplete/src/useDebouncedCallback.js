import { useDebouncedCallback as useUnderlyingDebouncedCallback } from "use-debounce";

export function useDebouncedCallback(func, wait) {
    const debounced = useUnderlyingDebouncedCallback(func, wait);

    return debounced.callback;
}
