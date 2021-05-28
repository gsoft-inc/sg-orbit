import "./FieldMessage.css";

import { ComponentProps, ElementType, ReactNode } from "react";
import { StyleProvider, cssModule, forwardRef, mergeProps } from "../../shared";
import { Text } from "../../text";

interface InnerFieldMessageProps {
    /**
     * The style to use.
     */
    tone: "neutral" | "success" | "error";
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

export const FieldMessage = forwardRef<InnerFieldMessageProps>(({
    tone,
    fluid,
    as = "div",
    children,
    ...rest
}, ref) => {
    return (
        <Text
            {...mergeProps<any>(
                rest,
                {
                    size: "sm",
                    className: cssModule(
                        "o-ui-field-message",
                        tone,
                        fluid && "fluid"
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
                        color: "inherit"
                    },
                    list: {
                        size: "inherit",
                        color: "inherit"
                    },
                    icon: {
                        size: "sm"
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
