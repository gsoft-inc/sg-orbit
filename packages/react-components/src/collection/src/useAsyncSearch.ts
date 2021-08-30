import { SyntheticEvent, useCallback, useEffect, useState } from "react";
import { isNil, isPromise, useRefState } from "../../shared";

export function useAsyncSearch<T>(load: (query: string, signal: AbortSignal) => Promise<T[]>) {
    const [isLoading, setIsLoading] = useState(false);
    const [items, setItems] = useState<T[]>([]);
    const [abortController, setAbortController] = useRefState<AbortController>();

    const cancelRequest = useCallback(() => {
        if (!isNil(abortController.current)) {
            abortController.current.abort();
            setAbortController(null);
        }
    }, [abortController, setAbortController]);

    const search = useCallback(async (event: SyntheticEvent, query: string) => {
        cancelRequest();
        setAbortController(new AbortController());

        setIsLoading(true);

        const loadPromise = load(query, abortController.current.signal);

        if (!isPromise(loadPromise)) {
            throw new Error("Load function must return a valid promise.");
        }

        loadPromise
            .then(result => {
                setItems(result ?? []);
                setIsLoading(false);
            })
            .catch((error: Error) => {
                // Do not handle cancelled request.
                if (isNil(error) || error?.name !== "AbortError") {
                    setItems([]);
                    setIsLoading(false);
                }
            });
    }, [load, setIsLoading, setItems, abortController, setAbortController, cancelRequest]);

    useEffect(() => {
        return () => {
            cancelRequest();
        };
    }, [cancelRequest]);

    return {
        isLoading,
        items,
        search
    };
}
