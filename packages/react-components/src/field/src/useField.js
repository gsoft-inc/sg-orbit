import { cssModule, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";

// export function useField({
//     id,
//     required,
//     fluid,
//     size,
//     disabled,
//     className,
//     forwardedRef
// }) {
//     const ref = useMergedRefs(forwardedRef);

//     const fieldId = useId(id, id ? undefined : "o-ui-field");

//     const { hasLabel, hasMessage } = useHasChildren({
//         hasLabel: ".o-ui-field-label",
//         hasMessage: ".o-ui-field-message"
//     }, ref);

//     const labelId = hasLabel ? `${fieldId}-label` : undefined;
//     const messageId = hasMessage ? `${fieldId}-message` : undefined;

//     return {
//         fieldId,
//         fieldProps: {
//             className: mergeClasses(
//                 cssModule(
//                     "o-ui-field",
//                     // TODO: Might not need?
//                     // hasLabel && "has-label",
//                     // hasMessage && "has-message",
//                     fluid && "fluid"
//                 ),
//                 className
//             ),
//             role: "group",
//             ref
//         },
//         labelProps: {
//             id: labelId,
//             required,
//             size,
//             className: "o-ui-field-label"
//         },
//         inputProps: {
//             id: fieldId,
//             required,
//             disabled,
//             fluid,
//             size,
//             className: "o-ui-field-input",
//             "aria-labelledby": labelId,
//             "aria-describedby": messageId
//         },
//         messageProps: {
//             id: messageId,
//             size,
//             fluid,
//             className: "o-ui-field-message",
//             "aria-live": "polite"
//         }
//     };
// }

// return {
//     isInField: true,
//     isGroup,
//     inputId,
//     labelId,
//     messageId,
//     required,
//     disabled,
//     size,
//     fluid,
//     validationState
// };

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
