import { ForwardedRef } from "react";
import { MergedRef, cssModule, mergeClasses, normalizeSize, useHasChildren, useId, useMergedRefs } from "../../shared";
import { isNil } from "lodash";
import type { FieldContextType } from "./FieldContext";

export interface UseFieldProps {
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
    fieldId: string,
    fieldProps: {
        className: string;
        role: string;
        ref: MergedRef<any>;
        "aria-labelledby": string,
        "aria-describedby": string

    };
    fieldContext: Partial<FieldContextType>
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

    const fieldId = useId(id, id ? null : "o-ui-field");

    const { hasLabel, hasMessage, hasRadio } = useHasChildren({
        hasLabel: ".o-ui-field-label",
        hasMessage: ".o-ui-field-message",
        hasRadio: "[type=\"radio\"]"
    }, ref);

    const labelId = hasLabel ? `${fieldId}-label` : undefined;
    const inputId = hasLabel ? `${fieldId}-input` : undefined;
    const messageId = hasMessage ? `${fieldId}-message` : undefined;

    return {
        fieldId,
        fieldProps: {
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    fluid && "fluid",
                    normalizeSize(size)
                ),
                className
            ),
            role: hasRadio ? "radiogroup" : "group",
            "aria-labelledby": !isNil(labelId) ? labelId : undefined,
            "aria-describedby": !isNil(messageId) ? messageId : undefined,
            ref
        },
        fieldContext: {
            inputId,
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
