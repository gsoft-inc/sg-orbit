import "./Message.css";

import { CheckIcon, InfoIcon, WarningIcon } from "../../icons";
import { ComponentProps, MouseEvent, ReactNode, forwardRef, useMemo } from "react";
import { Content } from "../../placeholders";
import { CrossButton } from "../../button";
import { InternalProps, OmitInternalProps, StyleProvider, StyledComponentProps, augmentElement, cssModule, isNil, mergeProps, useMergedRefs, useSlots } from "../../shared";
import { Text, TextProps } from "../../typography";
import { Transition } from "../../transition";

const DefaultElement = "div";

const MessageContent = forwardRef<any, TextProps>(({
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
                    heading: {
                        className: "o-ui-message-title",
                        size: "2xs"
                    },
                    link: {
                        color: "inherit"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
});

export interface InnerMessageProps extends InternalProps, StyledComponentProps<typeof DefaultElement> {
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Called when the dismiss button is clicked.
     * @param {MouseEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onDismiss?: (event: MouseEvent) => void;
    /**
     * A controlled show value.
     */
    show?: boolean;
    /**
     * The style to use.
     */
    variant?: "informative" | "warning" | "positive" | "negative";
}

const Role = {
    informative: "status",
    negative: "alert",
    positive: "status",
    warning: "alert"
};

const Icon = {
    informative: <InfoIcon />,
    negative: <InfoIcon />,
    positive: <CheckIcon />,
    warning: <WarningIcon />
};

export function InnerMessage({
    as = DefaultElement,
    children,
    forwardedRef,
    onDismiss,
    role: roleProp,
    show = true,
    variant = "informative",
    ...rest
}: InnerMessageProps) {
    const ref = useMergedRefs(forwardedRef);

    const { button, content } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        button: {
            className: "o-ui-message-action",
            color: "inherit",
            condensed: true,
            size: "sm",
            variant: "ghost"
        },
        content: {
            as: MessageContent,
            className: "o-ui-message-content"
        }
    }), []));

    const iconMarkup = augmentElement(Icon[variant], {
        className: "o-ui-message-icon"
    });

    const dismissMarkup = !isNil(onDismiss) && (
        <CrossButton
            aria-label="Dismiss"
            className="o-ui-message-dismiss"
            color="inherit"
            onClick={onDismiss}
            size="sm"
        />
    );

    return (
        <Transition
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-message",
                        variant
                    ),
                    enter: "o-ui-fade-in",
                    leave: "o-ui-fade-out",
                    ref,
                    role: (roleProp ?? Role[variant]) ?? "alert",
                    show
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

export const Message = forwardRef<any, OmitInternalProps<InnerMessageProps>>((props, ref) => (
    <InnerMessage {...props} forwardedRef={ref} />
));

export type MessageProps = ComponentProps<typeof Message>;
