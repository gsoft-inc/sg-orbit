import { useDisposables } from "../../shared";
import { useEffect, useState } from "react";

export function useDeferredValue(value, delay, defaultValue) {
    const [deferredValue, setDeferredValue] = useState(defaultValue);

    const disposables = useDisposables();

    useEffect(() => {
        disposables.dispose();

        disposables.setTimeout(() => {
            setDeferredValue(value);
        }, delay);

    }, [value, delay, disposables]);

    return deferredValue;
}
