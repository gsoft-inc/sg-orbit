import "./FieldMessage.css";

import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";
import { StyleProvider, cssModule, mergeProps } from "../../shared";
import { Text } from "../../typography";

const DefaultElement = "div";

export interface InnerFieldMessageProps extends Omit<ComponentProps<typeof DefaultElement>, "color">{
    /**
     * The style to use.
     */
    tone: "neutral" | "success" | "error";
    /**
     * @ignore
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
                    size: "md",
                    className: cssModule(
                        "o-ui-field-message",
                        tone,
                        fluid && "fluid"
                    ),
                    as,
                    ref
                } as const
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
