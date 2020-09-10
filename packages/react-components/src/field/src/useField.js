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
            className: "o-ui-field-input"
        },
        messageProps: {
            size,
            fluid,
            className: "o-ui-field-message"
        }
    };
}
