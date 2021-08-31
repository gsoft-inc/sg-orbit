import { ForwardedRef } from "react";
import { MergedRef, cssModule, isNil, mergeClasses, useHasChildren, useId, useIsInitialRender, useMergedRefs } from "../../shared";
import type { FieldContextType } from "./FieldContext";

export interface UseGroupFieldProps {
    className?: string;
    disabled?: boolean;
    fluid?: boolean;
    forwardedRef?: ForwardedRef<any>;
    id?: string;
    required?: boolean;
    validationState?: "valid" | "invalid";
}

export interface UseGroupFieldReturn {
    fieldContext: Partial<FieldContextType>;
    fieldId: string;
    fieldProps: {
        "aria-describedby": string;
        "aria-labelledby": string;
        className: string;
        id: string;
        ref: MergedRef<any>;
        role: string;

    };
}

export function useGroupField({
    id,
    validationState,
    required,
    fluid,
    disabled,
    className,
    forwardedRef
}: UseGroupFieldProps): UseGroupFieldReturn {
    const ref = useMergedRefs(forwardedRef);

    const fieldId = useId(id, "o-ui-group-field");

    const { hasLabel, hasMessage, hasRadio } = useHasChildren({
        hasLabel: ".o-ui-field-label",
        hasMessage: ".o-ui-field-message",
        hasRadio: "[type=\"radio\"]"
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
            "aria-describedby": !isNil(messageId) ? messageId : undefined,
            "aria-labelledby": !isNil(labelId) ? labelId : undefined,
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    fluid && "fluid"
                ),
                className
            ),
            id: fieldId,
            ref,
            role: hasRadio ? "radiogroup" : "group"
        }
    };
}
