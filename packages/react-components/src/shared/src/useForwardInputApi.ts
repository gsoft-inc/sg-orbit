import { RefObject } from "react";

const ApiMethods = [
    "blur",
    "focus",
    "click",
    "select",
    "setRangeText",
    "setSelectionRange",
    "checkValidity",
    "reportValidity",
    "setCustomValidity"
];

export function useForwardInputApi(inputRef: RefObject<HTMLInputElement>) {
    return (targetRef: RefObject<HTMLInputElement>): HTMLInputElement => {
        const element = targetRef.current;

        ApiMethods.forEach((x: string) => {
            (element as Record<string, any>)[x] = ((...args: any[]) => {
                // We know the args passed here will match the one needed.
                // @ts-ignore
                inputRef.current[x](...args);
            });
        });

        return element;
    };
}
