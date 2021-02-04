// Copied from https://github.com/react-bootstrap/react-bootstrap/blob/master/src/createChainedFunction.js.

import { useEventCallback } from "./useEventCallback";

export function createChainedFunction<T extends (...args: any[]) => void>(...funcs: (T | false)[]) {
    return (...args: any[]) => {
        (funcs
            .filter(Boolean) as T[])
            .forEach(x => {
                x(...args);
            });
    };
}

export function useChainedEventCallback<T extends (...args: any[]) => void>(...callbacks: (T | false)[]) {
    return useEventCallback(createChainedFunction(...callbacks));
}
