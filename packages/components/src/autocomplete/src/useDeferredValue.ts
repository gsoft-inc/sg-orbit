import { useEffect, useState } from "react";

import { useDisposables } from "../../shared";

export function useDeferredValue<T>(value: T, delay?: number, defaultValue?: T) {
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
