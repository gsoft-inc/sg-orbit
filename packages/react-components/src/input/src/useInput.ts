import { ChangeEvent, ChangeEventHandler, ForwardedRef } from "react";
import { cssModule, isNil, isNumber, mergeClasses, useAutoFocus, useEventCallback, useMergedRefs } from "../../shared";

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
    validationState?: "valid" | "invalid";
    value?: string | number;
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
