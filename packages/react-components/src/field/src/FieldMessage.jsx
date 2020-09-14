import "./FieldMessage.css";

import { SIZE, cssModule, getSizeClass, mergeClasses } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useFieldContext } from "./FieldContext";

export function useFieldMessage() {
    const {
        isInField,
        messageId,
        size,
        fluid,
        validationState
    } = useFieldContext();

    return {
        isInField,
        id: messageId,
        size,
        fluid,
        validationState,
        className: cssModule("o-ui-field-message", getSizeClass(size)),
        "aria-live": "polite"
    };
}

export function getValidationProps(validationState) {
    const isValid = validationState === "valid";
    const isError = validationState === "invalid";

    return {
        isHelp: !isValid && !isError,
        isValid,
        isError
    };
}

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["neutral", "success", "error"]).isRequired,
    /**
     * A message can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
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
    as = "div",
    className,
    children,
    ...rest
}, ref) => {
    return (
        <Text
            data-testid="field-message"
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
            ref={ref}
        >
            {children}
        </Text>
    );
});

FieldMessage.propTypes = propTypes;
