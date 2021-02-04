import { MutableRefObject } from "react";

const API_METHODS = [
    "blur",
    "focus",
    "click",
    "select",
    "setRangeText",
    "setSelectionRange",
    "checkValidity",
    "reportValidity",
    "setCustomValidity"
] as const;

export function useForwardInputApi<T extends Record<string, any>>(inputRef: MutableRefObject<T | undefined>) {
    return (targetRef: MutableRefObject<any | undefined>) => {
        const element = targetRef.current;

        API_METHODS.forEach(x => {
            element[x] = (...args: any[]) => {
                inputRef.current[x](...args);
            };
        });

        return element;
    };
}
