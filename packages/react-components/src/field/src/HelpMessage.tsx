import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { FieldMessage, getValidationProps } from "./FieldMessage";
import { forwardRef, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export interface InnerHelpMessageProps {
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

export function InnerHelpMessage(props: InnerHelpMessageProps) {
    const [{ validationState, ...messageProps }, isInField] = useFieldMessageProps();

    const { isHelp } = getValidationProps(validationState);

    const {
        forwardedRef,
        children,
        ...rest
    } = mergeProps(props, messageProps);

    if (isInField && !isHelp) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            tone="neutral"
            ref={forwardedRef}
        >
            {children}
        </FieldMessage>
    );
}

export const HelpMessage = forwardRef<InnerHelpMessageProps>((props, ref) => (
    <InnerHelpMessage {...props} forwardedRef={ref} />
));

export type HelpMessageProps = ComponentProps<typeof HelpMessage>;
