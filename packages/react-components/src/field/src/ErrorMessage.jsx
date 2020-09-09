import { FieldMessage } from "./FieldMessage";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useMessageValidationContext } from "./ValidationContext";
import { useSlotProps } from "../../shared";

const propTypes = {
    /**
     * A message can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerErrorMessage(props) {
    const {
        forwardedRef,
        as = "span",
        children,
        ...rest
    } = useSlotProps(props, "message");

    const { isError } = useMessageValidationContext();

    if (!isError) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            variant="error"
            as={as}
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
