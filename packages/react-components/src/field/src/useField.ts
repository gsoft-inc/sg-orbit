import { ForwardedRef } from "react";
import { MergedRef, cssModule, mergeClasses, useHasChildren, useId, useIsInitialRender, useMergedRefs } from "../../shared";
import type { FieldContextType } from "./FieldContext";

export interface UseFieldProps {
    className?: string;
    disabled?: boolean;
    fluid?: boolean;
    forwardedRef?: ForwardedRef<any>;
    id?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
}

export interface UseFieldReturn {
    fieldContext: Partial<FieldContextType>;
    fieldId: string;
    fieldProps: {
        className: string;
        id: string;
        ref: MergedRef<any>;

    };
}

export function useField({
    className,
    disabled,
    fluid,
    forwardedRef,
    id,
    required,
    validationState
}: UseFieldProps): UseFieldReturn {
    const ref = useMergedRefs(forwardedRef);

    const fieldId = useId(id, "o-ui-field");

    const { hasLabel, hasMessage } = useHasChildren({
        hasLabel: ".o-ui-field-label",
        hasMessage: ".o-ui-field-message"
    }, ref);

    // HACK: We are always rendering the ids on the first render since we can only assert if there are specific children on the second re-render
    // which can break the constraints of some components (like a TextInput).
    const isInitialRender = useIsInitialRender();

    const labelId = hasLabel || isInitialRender ? `${fieldId}-label` : undefined;
    const inputId = hasLabel || isInitialRender ? `${fieldId}-input` : undefined;
    const messageId = hasMessage || isInitialRender ? `${fieldId}-message` : undefined;

    return {
        fieldContext: {
            disabled,
            fluid,
            hasLabel,
            hasMessage,
            id: fieldId,
            inputClassName: "o-ui-field-input",
            inputId,
            labelClassName: "o-ui-field-label",
            labelId,
            messageClassName: "o-ui-field-message",
            messageId,
            required,
            validationState
        },
        fieldId,
        fieldProps: {
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    fluid && "fluid"
                ),
                className
            ),
            id: fieldId,
            ref
        }
    };
}
