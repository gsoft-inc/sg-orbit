// Copied from https://github.com/react-bootstrap/react-bootstrap/blob/master/src/createChainedFunction.js.

import { useEventCallback } from "./useEventCallback";

type ChainableFunction = (...args: any[]) => void;

export function createChainedFunction<T extends ChainableFunction>(...funcs: (T | false)[]) {
    return (...args: any[]) => {
        (funcs
            .filter(Boolean) as T[])
            .forEach(x => {
                x(...args);
            });
    };
}

export function useChainedEventCallback<T extends ChainableFunction>(...callbacks: (T | false)[]): ChainableFunction {
    return useEventCallback(createChainedFunction(...callbacks));
}
