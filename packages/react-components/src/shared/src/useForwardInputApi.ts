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

export function useForwardInputApi(inputRef: MutableRefObject<HTMLInputElement>) {
    return (targetRef: MutableRefObject<HTMLInputElement>) => {
        const element = targetRef.current;

        API_METHODS.forEach(x => {
            element[x] = ((...args: any[]) => {
                // we know the args passed here will match the one needed. Disable TS check
                // @ts-ignore
                inputRef.current[x](...args);
            }) as any;
        });

        return element;
    };
}
