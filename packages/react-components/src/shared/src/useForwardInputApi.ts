import { MutableRefObject } from "react";

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

export function useForwardInputApi(inputRef: MutableRefObject<HTMLInputElement>) {
    return (targetRef: MutableRefObject<HTMLInputElement>): HTMLInputElement => {
        const element = targetRef.current;

        ApiMethods.forEach((x: string) => {
            (element as Record<string, any>)[x] = ((...args: any[]) => {
                // We know the args passed here will match the one needed.
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                inputRef.current[x](...args);
            });
        });

        return element;
    };
}
