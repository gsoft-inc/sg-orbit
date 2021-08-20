import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { FieldMessage, FieldMessageProps, getValidationProps } from "./FieldMessage";
import { mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export interface InnerErrorMessageProps extends Omit<FieldMessageProps, "children"> {
    /**
     * @ignore
     */
    as?: ElementType;
    /**
     * @ignore
     */
    children?: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
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

export const ErrorMessage = forwardRef<any, Omit<InnerErrorMessageProps, "forwardedRef">>((props, ref) => (
    <InnerErrorMessage {...props} forwardedRef={ref} />
));

export type ErrorMessageProps = ComponentProps<typeof ErrorMessage>;

ErrorMessage.displayName = "ErrorMessage";
