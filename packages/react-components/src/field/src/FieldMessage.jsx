import "./FieldMessage.css";

import { StyleProvider, createSizeAdapter, cssModule, mergeClasses, normalizeSize } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSize } from "../../icons";
import { forwardRef } from "react";

export function getValidationProps(validationState) {
    const isValid = validationState === "valid";
    const isError = validationState === "invalid";

    return {
        isHelp: !isValid && !isError,
        isValid,
        isError
    };
}

const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm",
    "lg": "md"
});

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
            {...rest}
            size={textSize(size)}
            className={mergeClasses(
                cssModule(
                    "o-ui-field-message",
                    tone,
                    fluid && "fluid",
                    normalizeSize(size)
                ),
                className
            )}
            as={as}
            ref={ref}
        >
            <StyleProvider
                value={{
                    text: {
                        size: "inherit"
                    },
                    p: {
                        size: "inherit"
                    },
                    link: {
                        size: "inherit",
                        underline: "dotted"
                    },
                    list: {
                        size: "inherit"
                    },
                    icon: {
                        size: embeddedIconSize(size)
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
});

FieldMessage.propTypes = propTypes;
