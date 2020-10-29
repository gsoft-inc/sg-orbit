import { FieldMessage, getValidationProps } from "./FieldMessage";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

const propTypes = {
    /**
     * A message can vary in size.
     */
    size: oneOf(["md", "lg"]),
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

InnerValidMessage.propTypes = propTypes;

export const ValidMessage = forwardRef((props, ref) => (
    <InnerValidMessage {...props} forwardedRef={ref} />
));
