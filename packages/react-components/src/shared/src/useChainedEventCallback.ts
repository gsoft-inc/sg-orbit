// Copied from https://github.com/react-bootstrap/react-bootstrap/blob/master/src/createChainedFunction.js.

import { useEventCallback } from "./useEventCallback";

export function createChainedFunction<T extends (...args: any[]) => void>(...funcs: T[]) {
    return (...args: any[]) => {
        funcs
            .filter(Boolean)
            .forEach(x => {
                x(...args);
            });
    };
}

export function useChainedEventCallback<T extends (...args: any[]) => void>(...callbacks: T[]) {
    return useEventCallback(createChainedFunction(...callbacks));
}
