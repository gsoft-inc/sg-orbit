import { cssModule, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";

export function useField({
    id,
    fluid,
    className,
    forwardedRef
}) {
    const ref = useMergedRefs(forwardedRef);

    const inputId = useId(id, id ? undefined : "o-ui-field");

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
                    fluid && "fluid"
                ),
                className
            ),
            role: "group",
            ref
        },
        inputId,
        labelId,
        messageId
    };
}
