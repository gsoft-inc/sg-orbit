import { FieldMessage, getValidationProps } from "./FieldMessage";
import { elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useFieldMessageProps } from "./FieldContext";

const propTypes = {
    /**
     * A message can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerErrorMessage(props) {
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

InnerErrorMessage.propTypes = propTypes;

export const ErrorMessage = forwardRef((props, ref) => (
    <InnerErrorMessage {...props} forwardedRef={ref} />
));

ErrorMessage.displayName = "ErrorMessage";
