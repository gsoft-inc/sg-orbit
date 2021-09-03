import { ComponentProps, forwardRef } from "react";
import { FieldMessage, SharedFieldMessageProps, getValidationProps } from "./FieldMessage";
import { OmitInternalProps, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export function InnerErrorMessage(props: SharedFieldMessageProps) {
    const [{ validationState, ...messageProps }, isInField] = useFieldMessageProps();

    const { isError } = getValidationProps(validationState);

    const {
        children,
        forwardedRef,
        ...rest
    } = mergeProps(props, messageProps);

    if (isInField && !isError) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            ref={forwardedRef}
            tone="error"
        >
            {children}
        </FieldMessage>
    );
}

export const ErrorMessage = forwardRef<any, OmitInternalProps<SharedFieldMessageProps>>((props, ref) => (
    <InnerErrorMessage {...props} forwardedRef={ref} />
));

export type ErrorMessageProps = ComponentProps<typeof ErrorMessage>;
