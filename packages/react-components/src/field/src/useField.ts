import { ForwardedRef } from "react";
import { MergedRef, cssModule, mergeClasses, normalizeSize, useHasChildren, useId, useMergedRefs } from "../../shared";
import type { CommonFieldContextType } from "./FieldContext";

interface UseFieldProps {
    id?: string;
    validationState?: "valid" | "invalid";
    required?: boolean;
    fluid?: boolean;
    size?: "sm" | "md";
    disabled?: boolean;
    className?: string;
    forwardedRef?: ForwardedRef<any>;
}

export interface UseFieldReturn {
    fieldProps: {
        className: string;
        role: string;
        ref: MergedRef<any>;
    };
    fieldContext: CommonFieldContextType
}

export function useField({
    id,
    validationState,
    required,
    fluid,
    size,
    disabled,
    className,
    forwardedRef
}: UseFieldProps): UseFieldReturn {
    const ref = useMergedRefs(forwardedRef);

    const inputId = useId(id, id ? null : "o-ui-field");

    const { hasLabel, hasMessage } = useHasChildren({
        hasLabel: ".o-ui-field-label",
        hasMessage: ".o-ui-field-message"
    }, ref);

    const labelId = hasLabel ? `${inputId}-label` : undefined;
    const messageId = hasMessage ? `${inputId}-message` : undefined;

    return {
        fieldProps: {
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    fluid && "fluid",
                    normalizeSize(size)
                ),
                className
            ),
            role: "group",
            ref
        },
        fieldContext: {
            inputId,
            labelId,
            messageId,
            required,
            disabled,
            size,
            fluid,
            validationState,
            hasLabel,
            hasMessage,
            labelClassName: "o-ui-field-label",
            inputClassName: "o-ui-field-input",
            messageClassName: "o-ui-field-message"
        }
    };
}
