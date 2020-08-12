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
];

export function useForwardInputApi(inputRef) {
    return targetRef => {
        const element = targetRef.current;

        API_METHODS.forEach(x => {
            element[x] = (...args) => {
                inputRef.current[x](...args);
            };
        });

        return element;
    };
}
