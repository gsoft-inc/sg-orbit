import "./FieldMessage.css";

import { ContentStyleProvider, cssModule, getSize, getSizeClass, mergeClasses } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSlot } from "../../icons";
import { forwardRef, useMemo } from "react";

const ADAPTED_SIZE = {
    "sm": "xs",
    "md": "sm",
    "lg": "md"
};

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
     * The style to use.
     */
    tone: oneOf(["neutral", "success", "error"]).isRequired,
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

export const FieldMessage = forwardRef(({
    tone,
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
                    tone,
                    fluid && "fluid",
                    getSizeClass(size)
                ),
                className
            )}
            as={as}
            ref={ref}
        >
            <ContentStyleProvider
                withDefaults
                styles={useMemo(() => ({
                    icon: embeddedIconSlot({
                        size
                    })
                }), [size])}

            >
                {children}
            </ContentStyleProvider>
        </Text>
    );
});

FieldMessage.propTypes = propTypes;
