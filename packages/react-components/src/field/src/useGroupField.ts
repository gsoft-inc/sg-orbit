import { ForwardedRef } from "react";
import { MergedRef, cssModule, isNil, mergeClasses, useHasChildren, useId, useIsInitialRender, useMergedRefs } from "../../shared";
import type { FieldContextType } from "./FieldContext";

export interface UseGroupFieldProps {
    id?: string;
    validationState?: "valid" | "invalid";
    required?: boolean;
    fluid?: boolean;
    disabled?: boolean;
    className?: string;
    forwardedRef?: ForwardedRef<any>;
}

export interface UseGroupFieldReturn {
    fieldId: string;
    fieldProps: {
        className: string;
        role: string;
        ref: MergedRef<any>;
        "aria-labelledby": string;
        "aria-describedby": string;

    };
    fieldContext: Partial<FieldContextType>;
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
        fieldId,
        fieldProps: {
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    fluid && "fluid"
                ),
                className
            ),
            role: hasRadio ? "radiogroup" : "group",
            "aria-labelledby": !isNil(labelId) ? labelId : undefined,
            "aria-describedby": !isNil(messageId) ? messageId : undefined,
            ref
        },
        fieldContext: {
            id: fieldId,
            inputId,
            labelId,
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
