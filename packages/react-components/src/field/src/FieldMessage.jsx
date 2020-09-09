import "./FieldMessage.css";

import { SIZE, cssModule, mergeClasses } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    variant: oneOf(["neutral", "success", "error"]).isRequired,
    size: oneOf(["small", "medium", "large"]),
    as: oneOfType([string, elementType]),
    children: any.isRequired
};

const ADAPTED_SIZE = {
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
};

export const FieldMessage = forwardRef(({
    variant,
    fluid,
    size,
    className,
    as = "span",
    children,
    ...rest
}, ref) => {
    return (
        <Text
            {...rest}
            size={ADAPTED_SIZE[size ?? SIZE.medium]}
            className={mergeClasses(
                cssModule(
                    "o-ui-field-message",
                    variant,
                    fluid && "fluid"
                ),
                className
            )}
            as={as}
            aria-live="polite"
            ref={ref}
        >
            {children}
        </Text>
    );
});

FieldMessage.propTypes = propTypes;
