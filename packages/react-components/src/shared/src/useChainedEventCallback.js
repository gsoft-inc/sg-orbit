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

    // return funcs
    //     .filter(Boolean)
    //     .reduce((acc, func) => {
    //         if (isNil(acc)) {
    //             return func;
    //         }

    //         return (...args) => {
    //             acc.apply(this, args);
    //             func.apply(this, args);
    //         };
    //     }, null);
}

export function useChainedEventCallback(...callbacks) {
    return useEventCallback(createChainedFunction(...callbacks));
}
