import { cssModule, getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export function useInput({
    cssModule: module,
    value,
    placeholder,
    required,
    validationState,
    onChange,
    variant,
    type,
    autoFocus,
    autoFocusDelay,
    disabled,
    readOnly,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    className,
    wrapperProps = {},
    forwardedRef
}) {
    const inputRef = useMergedRefs(forwardedRef);

    useAutoFocus(inputRef, autoFocus, { delay: autoFocusDelay });

    return {
        wrapperProps: {
            ...wrapperProps,
            className: mergeClasses(
                module,
                cssModule(
                    "o-ui-input",
                    variant,
                    fluid && "fluid",
                    loading && "loading",
                    validationState && validationState,
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass(size)
                ),
                wrapperProps.className
            )
        },
        inputProps: {
            value,
            placeholder,
            onChange,
            className,
            type,
            disabled,
            readOnly,
            "aria-required": required,
            "aria-invalid": validationState === "invalid",
            ref: inputRef
        },
        inputRef
    };
}
