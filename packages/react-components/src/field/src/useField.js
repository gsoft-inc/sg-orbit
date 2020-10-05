import { cssModule, getSizeClass, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";

export function useField({
    id,
    validationState,
    required,
    fluid,
    size,
    disabled,
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
                    fluid && "fluid",
                    getSizeClass(size)
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
