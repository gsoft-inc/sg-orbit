import { CancellablePromise, cancellablePromise } from "./cancellablePromise";
import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { isNil } from "lodash";
import { isPromise, useRefState } from "../../shared";

export function useAsyncSearch<T>(load: (query: string) => Promise<T[]>) {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<T[]>([]);
    const [promise, setPromise] = useRefState<CancellablePromise<T[]>>();

    const cancelRequest = useCallback(() => {
        if (!isNil(promise.current)) {
            promise.current.cancel();
            setPromise(null);
        }
    }, [promise, setPromise]);

    const search = useCallback(async (_event: SyntheticEvent, query: string) => {
        cancelRequest();
        setIsLoading(true);

        const loadPromise = load(query);

        if (!isPromise(loadPromise)) {
            throw new Error("LOad function must return a valid promise.");
        }

        const wrappedPromise = cancellablePromise<T[]>(loadPromise);

        setPromise(wrappedPromise);

        wrappedPromise.promise
            .then(result => {
                setItems(result ?? []);
                setIsLoading(false);
            })
            .catch((error: any) => {
                // To cancel a promise it must be rejected, ignore it. If it's something else, show no results.
                if (isNil(error) || error?.isCancelled !== true) {
                    setItems([]);
                    setIsLoading(false);
                }
            });
    }, [load, setIsLoading, setItems, setPromise, cancelRequest]);

    useEffect(() => {
        return () => {
            cancelRequest();
        };
    }, [cancelRequest]);

    return {
        items,
        isLoading,
        search
    };
}
