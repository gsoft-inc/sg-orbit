import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { FieldMessage, getValidationProps } from "./FieldMessage";
import { forwardRef, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export interface InnerErrorMessageProps {
    /**
     * A message can vary in size.
     */
    size?: "sm" | "md";
    /**
     * An HTML element type or a custom React element type to render as.
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

export const ErrorMessage = forwardRef<InnerErrorMessageProps>((props, ref) => (
    <InnerErrorMessage {...props} forwardedRef={ref} />
));

export type ErrorMessageProps = ComponentProps<typeof ErrorMessage>;

ErrorMessage.displayName = "ErrorMessage";
