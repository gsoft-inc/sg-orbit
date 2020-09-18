import { FieldMessage, getValidationProps, useFieldMessage } from "./FieldMessage";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

const propTypes = {
    /**
     * A message can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerValidMessage(props) {
    const { isInField, validationState, ...messageProps } = useFieldMessage();
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
            variant="success"
            ref={forwardedRef}
        >
            {children}
        </FieldMessage>
    );
}

InnerValidMessage.propTypes = propTypes;

export const ValidMessage = forwardRef((props, ref) => (
    <InnerValidMessage {...props} forwardedRef={ref} />
));
