import "./FieldMessage.css";

import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSize, getSizeClass, mergeClasses } from "../../shared";
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

const ADAPTED_SIZE = {
    "sm": "xs",
    "md": "sm",
    "lg": "md"
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
            size={ADAPTED_SIZE[getSize(size)]}
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
