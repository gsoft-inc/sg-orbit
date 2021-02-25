import { useCallback } from "react";
import { useDisposables } from "../../../dist/shared/src";

export function useDeferredCallback(callback, delay, deps) {
    const disposables = useDisposables();

    const deferredCallback = useCallback((...args) => {
        disposables.dispose();

        disposables.setTimeout(() => {
            callback(...args);
        }, delay);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    const instantCallback = useCallback((...args) => {
        callback(...args);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return [deferredCallback, instantCallback];
}
