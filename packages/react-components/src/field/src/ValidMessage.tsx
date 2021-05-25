import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { FieldMessage, getValidationProps } from "./FieldMessage";
import { forwardRef, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export interface InnerValidMessageProps {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerValidMessage(props: InnerValidMessageProps) {
    const [{ validationState, ...messageProps }, isInField] = useFieldMessageProps();

    const { isValid } = getValidationProps(validationState);

    const {
        forwardedRef,
        children,
        ...rest
    } = mergeProps(props, messageProps);

    if (isInField && !isValid) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            tone="success"
            ref={forwardedRef}
        >
            {children}
        </FieldMessage>
    );
}

export const ValidMessage = forwardRef<InnerValidMessageProps>((props, ref) => (
    <InnerValidMessage {...props} forwardedRef={ref} />
));

export type ValidMessageProps = ComponentProps<typeof ValidMessage>;

ValidMessage.displayName = "ValidMessage";
