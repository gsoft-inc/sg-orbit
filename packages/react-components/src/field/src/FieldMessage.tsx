import "./FieldMessage.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, StyleProvider, StyledComponentProps, cssModule, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface SharedFieldMessageProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the field take up the width of its container.
     */
    fluid?: boolean;
}

export interface InnerFieldMessageProps extends Omit<SharedFieldMessageProps, "forwardedRef"> {
    /**
     * The style to use.
     */
    tone: "neutral" | "success" | "error";
}

export function getValidationProps(validationState: string) {
    const isValid = validationState === "valid";
    const isError = validationState === "invalid";

    return {
        isError,
        isHelp: !isValid && !isError,
        isValid
    };
}

export const FieldMessage = forwardRef<any, InnerFieldMessageProps>(({
    tone,
    fluid,
    as = DefaultElement,
    children,
    ...rest
}, ref) => {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-field-message",
                        tone,
                        fluid && "fluid"
                    ),
                    ref,
                    size: "md" as const
                }
            )}
        >
            <StyleProvider
                value={{
                    icon: {
                        size: "sm"
                    },
                    link: {
                        color: "inherit",
                        size: "inherit"
                    },
                    list: {
                        color: "inherit",
                        size: "inherit"
                    },
                    p: {
                        color: "inherit",
                        size: "inherit"
                    },
                    text: {
                        color: "inherit",
                        size: "inherit"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
});

export type FieldMessageProps = ComponentProps<typeof FieldMessage>;
