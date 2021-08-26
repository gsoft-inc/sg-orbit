import { ComponentProps, ReactNode, forwardRef } from "react";
import { FieldMessage, FieldMessageProps, getValidationProps } from "./FieldMessage";
import { InternalProps, OmitInternalProps, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export interface InnerErrorMessageProps extends InternalProps, Omit<FieldMessageProps, "children"> {
    /**
     * @ignore
     */
    children?: ReactNode;
}

export function InnerErrorMessage(props: InnerErrorMessageProps) {
    const [{ validationState, ...messageProps }, isInField] = useFieldMessageProps();

    const { isError } = getValidationProps(validationState);

    const {
        forwardedRef,
        children,
        ...rest
    } = mergeProps(props, messageProps);

    if (isInField && !isError) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            tone="error"
            ref={forwardedRef}
        >
            {children}
        </FieldMessage>
    );
}

export const ErrorMessage = forwardRef<any, OmitInternalProps<InnerErrorMessageProps>>((props, ref) => (
    <InnerErrorMessage {...props} forwardedRef={ref} />
));

export type ErrorMessageProps = ComponentProps<typeof ErrorMessage>;

ErrorMessage.displayName = "ErrorMessage";
