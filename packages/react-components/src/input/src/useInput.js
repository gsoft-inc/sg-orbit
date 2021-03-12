import { cssModule, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

export function useInput({
    cssModule: module,
    id,
    value,
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
    forwardedRef
}) {
    const inputRef = useMergedRefs(forwardedRef);

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus || disabled || readOnly,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    return {
        wrapperProps: {
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
                )
            ),
            role: "presentation"
        },
        inputProps: {
            id,
            value,
            placeholder,
            onChange,
            type,
            disabled,
            readOnly,
            "aria-required": required ? true : undefined,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            ref: inputRef
        },
        inputRef
    };
}
