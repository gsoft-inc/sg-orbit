import { ForwardedRef, SyntheticEvent } from "react";
import { cssModule, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";
import { isNumber } from "lodash";

export interface UseInputProps {
    cssModule?: string,
    id?: string;
    value?: string | number;
    placeholder?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
    onChange?(event: SyntheticEvent): void
    type?: "text" | "password" | "search" | "url" | "tel" | "email" | "number";
    autoFocus?: boolean | number;
    disabled?: boolean;
    readOnly?: boolean;
    fluid?: boolean;
    loading?: boolean;
    active?: boolean;
    focus?: boolean;
    hover?: boolean;
    forwardedRef: ForwardedRef<any>
}

export function useInput({
    cssModule: module,
    id,
    value,
    placeholder,
    required,
    validationState,
    onChange,
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
}: UseInputProps) {
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
                    // TODO: remove once CSS perf improvement has been merged
                    "outline",
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
