import "./FieldMessage.css";

import { ComponentProps, ElementType, ReactNode } from "react";
import { StyleProvider, createSizeAdapter, cssModule, forwardRef, mergeProps, normalizeSize } from "../../shared";
import { Text } from "../../text";
import { embeddedIconSize } from "../../icons";

interface InnerFieldMessageProps {
    /**
     * The style to use.
     */
    tone: "neutral" | "success" | "error";
    /**
     * A message can vary in size.
     */
    size?: "sm" | "md";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Whether or not the field take up the width of its container.
     */
    fluid?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

export function getValidationProps(validationState: string) {
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

export const FieldMessage = forwardRef<InnerFieldMessageProps>(({
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

export type FieldMessageProps = ComponentProps<typeof FieldMessage>;

FieldMessage.displayName = "FieldMessage";
