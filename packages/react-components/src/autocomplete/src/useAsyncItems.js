import { cancellablePromise } from "./cancellablePromise";
import { isNil } from "lodash";
import { isPromise, useRefState } from "../../shared";
import { useCallback, useEffect, useState } from "react";

export function useAsyncItems(fetch) {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [promise, setPromise] = useRefState();

    const cancelRequest = useCallback(() => {
        if (!isNil(promise.current)) {
            promise.current.cancel();
            setPromise(null);
        }
    }, [promise, setPromise]);

    const search = useCallback(async query => {
        cancelRequest();
        setIsLoading(true);

        const fetchPromise = fetch(query);

        if (!isPromise(fetchPromise)) {
            throw new Error("Fetch function must return a valid promise.");
        }

        const wrappedPromise = cancellablePromise(fetchPromise);

        setPromise(wrappedPromise);

        wrappedPromise.promise
            .then(result => {
                setItems(result ?? []);
                setIsLoading(false);
            })
            .catch(error => {
                // To cancel a promise it must be rejected, ignore it. If it's something else, show no results.
                if (isNil(error) || error?.isCancelled !== true) {
                    setItems([]);
                    setIsLoading(false);
                }
            });
    }, [fetch, setIsLoading, setItems, setPromise, cancelRequest]);

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
