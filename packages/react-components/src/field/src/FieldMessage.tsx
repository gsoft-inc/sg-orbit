import "./FieldMessage.css";

import { ComponentProps, ReactNode, forwardRef } from "react";
import { HtmlElements } from "../../html";
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
    as = HtmlElements[DefaultElement],
    children,
    fluid,
    tone,
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
                    ref
                }
            )}
        >
            <StyleProvider
                value={{
                    "html-a": {
                        color: "inherit"
                    },
                    "html-ol": {
                        color: "inherit"
                    },
                    "html-p": {
                        color: "inherit"
                    },
                    "html-ul": {
                        color: "inherit"
                    },
                    icon: {
                        size: "sm"
                    },
                    link: {
                        color: "inherit"
                    },
                    p: {
                        color: "inherit"
                    },
                    text: {
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
