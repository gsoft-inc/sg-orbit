import "./FieldMessage.css";

import { StyleProvider, createSizeAdapter, cssModule, mergeProps, normalizeSize } from "../../shared";
import { Text } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSize } from "../../icons";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The style to use.
     */
    tone: oneOf(["neutral", "success", "error"]).isRequired,
    /**
     * A message can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
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

const textSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

export const FieldMessage = forwardRef(({
    tone,
    fluid,
    size,
    as = "div",
    children,
    ...rest
}, ref) => {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size: textSize(size),
                    className: cssModule(
                        "o-ui-field-message",
                        tone,
                        fluid && "fluid",
                        normalizeSize(size)
                    ),
                    as,
                    ref
                }
            )}
        >
            <StyleProvider
                value={{
                    text: {
                        size: "inherit",
                        color: "inherit"
                    },
                    p: {
                        size: "inherit",
                        color: "inherit"
                    },
                    link: {
                        size: "inherit",
                        color: "inherit",
                        underline: "dotted"
                    },
                    list: {
                        size: "inherit",
                        color: "inherit"
                    },
                    icon: {
                        size: embeddedIconSize(size),
                        color: "inherit"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
});

FieldMessage.propTypes = propTypes;
FieldMessage.displayName = "FieldMessage";
