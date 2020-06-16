import { createChainedFunction } from "./createChainedFunction";
import { useEventCallback } from "./useEventCallback";

export function useChainedEventCallback(...callbacks) {
    return useEventCallback(createChainedFunction(...callbacks));
}
