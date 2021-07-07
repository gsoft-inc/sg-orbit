import "./Message.css";

import { CheckIcon, InfoIcon, NotificationIcon, WarningIcon } from "../../icons";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactElement, ReactNode, useMemo } from "react";
import { Content } from "../../placeholders";
import { CrossButton } from "../../button";
import { StyleProvider, cssModule, forwardRef, isNil, mergeProps, useMergedRefs, useSlots } from "../../shared";
import { Text, TextProps } from "../../text";
import { Transition } from "../../transition";

const Role = {
    info: "status",
    positive: "status",
    warning: "alert",
    error: "alert"
};

type InnerMessageContentProps = TextProps;

const MessageContent = forwardRef<InnerMessageContentProps>(({
    as = "div",
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

export interface InnerMessageProps {
    /**
     * A controlled show value.
     */
    show?: boolean;
    /**
     * The style to use.
     */
    tone?: "info" | "positive" | "warning" | "error";
    /**
     * Called when the dismiss button is clicked.
     * @param {MouseEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onDismiss?: (event: MouseEvent) => void;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    role?: string;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerMessage({
    show = true,
    tone = "info",
    onDismiss,
    role: roleProp,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerMessageProps) {
    const ref = useMergedRefs(forwardedRef);

    const { icon, content, button } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        icon: {
            className: "o-ui-message-icon"
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
                        tone,
                        icon && "has-icon",
                        button && "has-action",
                        dismissMarkup && "has-dismiss"
                    ),
                    role: (roleProp ?? Role[tone]) ?? "alert",
                    as,
                    ref
                }
            )}
        >
            {icon}
            {content}
            {button}
            {dismissMarkup}
        </Transition>
    );
}

export const Message = forwardRef<InnerMessageProps>((props, ref) => (
    <InnerMessage {...props} forwardedRef={ref} />
));

export type MessageProps = ComponentProps<typeof Message>;

Message.displayName = "Message";

////////

const variations: { tone: keyof typeof Role; icon: ReactElement }[] = [
    { tone: "info", icon: <NotificationIcon /> },
    { tone: "positive", icon: <CheckIcon /> },
    { tone: "warning", icon: <WarningIcon /> },
    { tone: "error", icon: <InfoIcon /> }
];

const [
    InfoMessage,
    PositiveMessage,
    WarningMessage,
    ErrorMessage
] = Object.values(variations).map(({ tone, icon }) => {
    return forwardRef<InnerMessageProps>(({
        children,
        ...rest
    }, ref) => {
        const { content, button } = useSlots(children, useMemo(() => ({
            _: {
                defaultWrapper: Content
            },
            content: null,
            button: null
        }), []));

        return (
            <Message
                tone={tone}
                {...rest}
                ref={ref}
            >
                {icon}
                {content}
                {button}
            </Message>
        );
    });
});

export interface MessageTemplateProps {
    /**
     * A controlled show value.
     */
    show?: boolean;
    /**
     * Called when the dismiss button is clicked.
     * @param {MouseEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onDismiss?: (event: MouseEvent) => void;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
}

// Dummy component for documentation purpose.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MessageTemplate(_props: MessageTemplateProps): JSX.Element {
    return null;
}

InfoMessage.displayName = "InfoMessage";
PositiveMessage.displayName = "PositiveMessage";
WarningMessage.displayName = "WarningMessage";
ErrorMessage.displayName = "ErrorMessage";


export type InfoMessageProps = ComponentProps<typeof InfoMessage>;
export type PositiveMessageProps = ComponentProps<typeof PositiveMessage>;
export type WarningMessageProps = ComponentProps<typeof WarningMessage>;
export type ErrorMessageProps = ComponentProps<typeof ErrorMessage>;

export {
    InfoMessage,
    PositiveMessage,
    WarningMessage,
    ErrorMessage
};
