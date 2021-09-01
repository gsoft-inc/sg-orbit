import { ChangeEvent, ChangeEventHandler, ForwardedRef } from "react";
import { cssModule, isNil, isNumber, mergeClasses, useAutoFocus, useEventCallback, useMergedRefs } from "../../shared";

export type ValidationState = "valid" | "invalid";

export interface UseInputProps {
    active?: boolean;
    autoFocus?: boolean | number;
    cssModule?: string;
    disabled?: boolean;
    fluid?: boolean;
    focus?: boolean;
    forwardedRef: ForwardedRef<any>;
    hover?: boolean;
    id?: string;
    loading?: boolean;
    onChange?: ChangeEventHandler;
    placeholder?: string;
    readOnly?: boolean;
    required?: boolean;
    type?: "text" | "password" | "search" | "url" | "tel" | "email" | "number";
    validationState?: ValidationState;
    value?: string | number;
}

export function useInput({
    active,
    autoFocus,
    cssModule: module,
    disabled,
    fluid,
    focus,
    forwardedRef,
    hover,
    id,
    loading,
    onChange,
    placeholder,
    readOnly,
    required,
    type,
    validationState,
    value
}: UseInputProps) {
    const inputRef = useMergedRefs(forwardedRef);

    const handleChange = useEventCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (!isNil(onChange)) {
            onChange(event);
        }
    });

    useAutoFocus(inputRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus || disabled || readOnly
    });

    return {
        inputProps: {
            "aria-invalid": validationState === "invalid" ? true : undefined,
            "aria-required": required ? true : undefined,
            disabled,
            id,
            onChange: handleChange,
            placeholder,
            readOnly,
            ref: inputRef,
            type,
            value: value ?? ""
        },
        inputRef,
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
        }
    };
}
