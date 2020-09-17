// Copied from https://github.com/react-bootstrap/react-bootstrap/blob/master/src/createChainedFunction.js.

import { useEventCallback } from "./useEventCallback";

export function createChainedFunction(...funcs) {
    return (...args) => {
        funcs
            .filter(Boolean)
            .forEach(x => {
                x(...args);
            });
    };
}

export function useChainedEventCallback(...callbacks) {
    return useEventCallback(createChainedFunction(...callbacks));
}
