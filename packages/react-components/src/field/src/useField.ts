import { ForwardedRef } from "react";
import { MergedRef, cssModule, mergeClasses, useHasChildren, useId, useIsInitialRender, useMergedRefs } from "../../shared";
import type { FieldContextType } from "./FieldContext";

export interface UseFieldProps {
    id?: string;
    validationState?: "valid" | "invalid";
    required?: boolean;
    fluid?: boolean;
    disabled?: boolean;
    className?: string;
    forwardedRef?: ForwardedRef<any>;
}

export interface UseFieldReturn {
    fieldId: string;
    fieldProps: {
        className: string;
        ref: MergedRef<any>;

    };
    fieldContext: Partial<FieldContextType>;
}

export function useField({
    id,
    validationState,
    required,
    fluid,
    disabled,
    className,
    forwardedRef
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
        fieldId,
        fieldProps: {
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    fluid && "fluid"
                ),
                className
            ),
            ref
        },
        fieldContext: {
            id: fieldId,
            labelId,
            inputId,
            messageId,
            required,
            disabled,
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
