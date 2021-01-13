import { cssModule, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

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

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    return {
        wrapperProps: {
            ...wrapperProps,
            className: mergeClasses(
                module,
                cssModule(
                    "o-ui-input",
                    variant,
                    validationState,
                    fluid && "fluid",
                    loading && "loading",
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
