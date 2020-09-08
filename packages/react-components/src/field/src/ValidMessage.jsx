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

export function InnerValidMessage(props) {
    const {
        forwardedRef,
        as = "span",
        children,
        ...rest
    } = useSlotProps(props);

    const { isValid } = useMessageValidationContext();

    if (!isValid) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            variant="valid"
            as={as}
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
