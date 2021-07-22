import { useDisposables } from "../../shared";
import { useEffect, useState } from "react";

export function useDeferredValue<T>(value: T, delay?: number, defaultValue?: T) {
    const [deferredValue, setDeferredValue] = useState(defaultValue);

    const disposables = useDisposables();

    useEffect(() => {
        disposables.dispose();

        // setTimeout(() => {
        //     setDeferredValue(value);
        // }, delay);

        disposables.setTimeout(() => {
            setDeferredValue(value);
        }, delay);

    }, [value, delay, disposables]);

    return deferredValue;
}
