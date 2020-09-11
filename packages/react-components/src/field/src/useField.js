import { cssModule, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";

export function useField({
    id,
    required,
    fluid,
    size,
    disabled,
    className,
    forwardedRef
}) {
    const ref = useMergedRefs(forwardedRef);

    const fieldId = useId(id, id ? undefined : "o-ui-field");

    const { hasLabel, hasMessage } = useHasChildren({
        hasLabel: ".o-ui-field-label",
        hasMessage: ".o-ui-field-message"
    }, ref);

    const labelId = hasLabel ? `${fieldId}-label` : undefined;
    const messageId = hasMessage ? `${fieldId}-message` : undefined;

    return {
        fieldId,
        fieldProps: {
            className: mergeClasses(
                cssModule(
                    "o-ui-field",
                    hasLabel && "has-label",
                    hasMessage && "has-message",
                    fluid && "fluid"
                ),
                className
            ),
            role: "group",
            ref
        },
        labelProps: {
            id: labelId,
            required,
            size,
            className: "o-ui-field-label"
        },
        inputProps: {
            id: fieldId,
            required,
            disabled,
            fluid,
            size,
            className: "o-ui-field-input",
            "aria-labelledby": labelId,
            "aria-describedby": messageId
        },
        messageProps: {
            id: messageId,
            size,
            fluid,
            className: "o-ui-field-message",
            "aria-live": "polite"
        }
    };
}
