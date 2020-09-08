import { cssModule, getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";

export function useInput({
    cssModule: module,
    value,
    placeholder,
    required,
    validationState,
    onChange,
    variant,
    type,
    autoFocus,
    autoFocusDelay,
    disabled,
    readOnly,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    className,
    wrapperProps = {},
    forwardedRef
}) {
    const inputRef = useMergedRefs(forwardedRef);

    useAutoFocus(inputRef, autoFocus, { delay: autoFocusDelay });

    return {
        wrapperProps: {
            ...wrapperProps,
            className: mergeClasses(
                module,
                cssModule(
                    "o-ui-input",
                    variant,
                    fluid && "fluid",
                    loading && "loading",
                    validationState && validationState,
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass(size)
                ),
                wrapperProps.className
            )
        },
        inputProps: {
            value,
            placeholder,
            onChange,
            className,
            type,
            disabled,
            readOnly,
            "aria-required": required,
            "aria-invalid": validationState === "invalid",
            ref: inputRef
        },
        inputRef
    };
}


// import { cssModule, getSizeClass, mergeClasses, useAutoFocus, useId, useMergedRefs } from "../../shared";
// import { useInputMessage } from "./InputMessage";

// export function useInput({
//     cssModule: module,
//     id,
//     value,
//     placeholder,
//     label,
//     required,
//     description,
//     helpMessage,
//     invalidMessage,
//     validMessage,
//     validationState,
//     onChange,
//     variant,
//     type,
//     autoFocus,
//     autoFocusDelay,
//     disabled,
//     readOnly,
//     fluid,
//     loading,
//     size,
//     active,
//     focus,
//     hover,
//     className,
//     wrapperProps = {},
//     inputRef: inputRefProp,
//     forwardedRef
// }) {
//     const inputRef = useMergedRefs(inputRefProp, forwardedRef);

//     const inputId = useId(id, id ?? "o-ui-input");
//     const messageProps = useInputMessage(helpMessage, invalidMessage, validMessage, validationState, size);

//     useAutoFocus(inputRef, autoFocus, { delay: autoFocusDelay });

//     return {
//         wrapperProps: {
//             ...wrapperProps,
//             className: mergeClasses(
//                 module,
//                 cssModule(
//                     "o-ui-input",
//                     variant,
//                     label && "has-label",
//                     messageProps && "has-message",
//                     fluid && "fluid",
//                     loading && "loading",
//                     validationState && validationState,
//                     active && "active",
//                     focus && "focus",
//                     hover && "hover",
//                     getSizeClass(size)
//                 ),
//                 wrapperProps.className
//             )
//         },
//         inputProps: {
//             id: inputId,
//             value,
//             placeholder,
//             onChange,
//             className,
//             type,
//             disabled,
//             readOnly,
//             "aria-required": required,
//             "aria-invalid": validationState === "invalid",
//             ref: inputRef
//         },
//         labelProps: label && {
//             htmlFor: inputId,
//             required,
//             description,
//             size,
//             children: label
//         },
//         messageProps
//     };
// }
