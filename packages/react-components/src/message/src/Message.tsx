import "./Message.css";

import { CheckIcon, InfoIcon, WarningIcon } from "../../icons";
import { ComponentProps, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import { Content } from "../../placeholders";
import { CrossButton } from "../../button";
import { InternalProps, StyleProvider, augmentElement, cssModule, isNil, mergeProps, useMergedRefs, useSlots } from "../../shared";
import { Text, TextProps } from "../../typography";
import { Transition } from "../../transition";

type InnerMessageContentProps = TextProps;

const DefaultElement = "div";

const MessageContent = forwardRef<any, Omit<InnerMessageContentProps, "forwardedRef">>(({
    as = DefaultElement,
    children,
    ...rest
}, ref) => {
    return (
        <Text
            {...rest}
            as={as}
            ref={ref}
        >
            <StyleProvider
                value={{
                    link: {
                        color: "inherit"
                    },
                    heading: {
                        size: "2xs",
                        className: "o-ui-message-title"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
});

export interface InnerMessageProps extends InternalProps, ComponentProps<typeof DefaultElement> {
    /**
     * A controlled show value.
     */
    show?: boolean;
    /**
     * The style to use.
     */
    variant?: "informative" | "warning" | "positive" | "negative";
    /**
     * Called when the dismiss button is clicked.
     * @param {MouseEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onDismiss?: (event: MouseEvent) => void;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    role?: string;
}

const Role = {
    informative: "status",
    warning: "alert",
    positive: "status",
    negative: "alert"
};

const Icon = {
    informative: <InfoIcon />,
    warning: <WarningIcon />,
    positive: <CheckIcon />,
    negative: <InfoIcon />
};

export function InnerMessage({
    show = true,
    variant = "informative",
    onDismiss,
    role: roleProp,
    as = DefaultElement,
    children,
    forwardedRef,
    ...rest
}: InnerMessageProps) {
    const ref = useMergedRefs(forwardedRef);

    const { content, button } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        content: {
            className: "o-ui-message-content",
            as: MessageContent
        },
        button: {
            variant: "ghost",
            color: "inherit",
            condensed: true,
            size: "sm",
            className: "o-ui-message-action"
        }
    }), []));

    const iconMarkup = augmentElement(Icon[variant], {
        className: "o-ui-message-icon"
    });

    const dismissMarkup = !isNil(onDismiss) && (
        <CrossButton
            color="inherit"
            onClick={onDismiss}
            size="sm"
            className="o-ui-message-dismiss"
            aria-label="Dismiss"
        />
    );

    return (
        <Transition
            {...mergeProps(
                rest,
                {
                    show,
                    enter: "o-ui-fade-in",
                    leave: "o-ui-fade-out",
                    className: cssModule(
                        "o-ui-message",
                        variant
                    ),
                    role: (roleProp ?? Role[variant]) ?? "alert",
                    as,
                    ref
                }
            )}
        >
            {iconMarkup}
            {content}
            {button}
            {dismissMarkup}
        </Transition>
    );
}

export const Message = forwardRef<any, Omit<InnerMessageProps, "forwardedRef">>((props, ref) => (
    <InnerMessage {...props} forwardedRef={ref} />
));

export type MessageProps = ComponentProps<typeof Message>;

Message.displayName = "Message";
