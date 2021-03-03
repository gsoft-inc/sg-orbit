import { useDebouncedCallback as useUnderlyingDebouncedCallback } from "use-debounce";

export function useDebouncedCallback(func, wait) {
    // Without the "leading" option the previous results will be display until the debounce "trigger".
    const debounced = useUnderlyingDebouncedCallback(func, wait, { leading: true });

    return debounced.callback;
}
