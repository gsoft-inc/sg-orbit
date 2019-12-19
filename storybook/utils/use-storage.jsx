import { useCallback, useEffect, useState } from "react";

function useStorage(storage, key, initialValue = "") {
    const [value, setValue] = useState(
        () => storage.getItem(key) || initialValue
    );

    const setItem = newValue => {
        setValue(newValue);
        storage.setItem(key, newValue);
    };

    useEffect(() => {
        const newValue = storage.getItem(key);
        if (value !== newValue) {
            setValue(newValue || initialValue);
        }
    }, [key, value, initialValue, storage]);

    const handleStorage = useCallback(
        event => {
            if (event.key === key && event.newValue !== value) {
                setValue(event.newValue || initialValue);
            }
        },
        [initialValue, key, value]
    );

    useEffect(() => {
        window.addEventListener("storage", handleStorage);

        return () => window.removeEventListener("storage", handleStorage);
    }, [handleStorage]);

    return [value, setItem];
}

export const useLocalStorage = (key, value) => useStorage(window.localStorage, key, value);
export const useSessionStorage = (key, value) => useStorage(window.sessionStorage, key, value);
