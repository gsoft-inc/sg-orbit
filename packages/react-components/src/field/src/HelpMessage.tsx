import { ComponentProps, forwardRef } from "react";
import { FieldMessage, SharedFieldMessageProps, getValidationProps } from "./FieldMessage";
import { OmitInternalProps, mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

export function InnerHelpMessage(props: SharedFieldMessageProps) {
    const [{ validationState, ...messageProps }, isInField] = useFieldMessageProps();

    const { isHelp } = getValidationProps(validationState);

    const {
        children,
        forwardedRef,
        ...rest
    } = mergeProps(props, messageProps);

    if (isInField && !isHelp) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            ref={forwardedRef}
            tone="neutral"
        >
            {children}
        </FieldMessage>
    );
}

export const HelpMessage = forwardRef<any, OmitInternalProps<SharedFieldMessageProps>>((props, ref) => (
    <InnerHelpMessage {...props} forwardedRef={ref} />
));

export type HelpMessageProps = ComponentProps<typeof HelpMessage>;
