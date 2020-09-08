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

export function InnerHelpMessage(props) {
    const {
        forwardedRef,
        as = "span",
        children,
        ...rest
    } = useSlotProps(props);

    const { isHelp } = useMessageValidationContext();

    if (!isHelp) {
        return null;
    }

    return (
        <FieldMessage
            {...rest}
            variant="help"
            as={as}
            ref={forwardedRef}
        >
            {children}
        </FieldMessage>
    );
}

InnerHelpMessage.propTypes = propTypes;

export const HelpMessage = forwardRef((props, ref) => (
    <InnerHelpMessage {...props} forwardedRef={ref} />
));
