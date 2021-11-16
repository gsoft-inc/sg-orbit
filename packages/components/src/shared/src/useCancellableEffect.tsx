import { DependencyList, useEffect }from "react";

export const useCancellableEffect = (effect: (isCancelled: () => boolean) => void, deps?: DependencyList) => {
    useEffect(() => {
        const cancellationSignal = {
            cancel: () => {
                cancellationSignal.isCancelled = true;
            },
            isCancelled: false
        };

        effect(() => cancellationSignal.isCancelled);

        return cancellationSignal.cancel;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [deps]);
};
