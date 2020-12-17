import { cssModule, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export function useInput({
    cssModule: module,
    value,
    id,
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
    active,
    focus,
    hover,
    className,
    wrapperProps = {},
    forwardedRef
}) {
    const inputRef = useMergedRefs(forwardedRef);

    useAutoFocus(inputRef, { isDisabled: !autoFocus, delay: autoFocusDelay });

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
                    hover && "hover"
                ),
                wrapperProps.className
            )
        },
        inputProps: {
            id,
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
