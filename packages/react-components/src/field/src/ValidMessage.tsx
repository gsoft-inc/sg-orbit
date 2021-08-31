import { ComponentProps, ReactNode, forwardRef } from "react";
import { FieldMessage, getValidationProps } from "./FieldMessage";
import { InternalProps, OmitInternalProps, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export interface InnerValidMessageProps extends InternalProps {
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerValidMessage(props: InnerValidMessageProps) {
    const [{ validationState, ...messageProps }, isInField] = useFieldMessageProps();

    const { isValid } = getValidationProps(validationState);

    const {
        children,
        forwardedRef,
        ...rest
    } = mergeProps(props, messageProps);

    if (isInField && !isValid) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            ref={forwardedRef}
            tone="success"
        >
            {children}
        </FieldMessage>
    );
}

export const ValidMessage = forwardRef<any, OmitInternalProps<InnerValidMessageProps>>((props, ref) => (
    <InnerValidMessage {...props} forwardedRef={ref} />
));

export type ValidMessageProps = ComponentProps<typeof ValidMessage>;
