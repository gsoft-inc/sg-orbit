import "./Alert.css";

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
    critical: "alert"
};

type InnerAlertContentProps = TextProps;

const AlertContent = forwardRef<InnerAlertContentProps>(({
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
                        className: "o-ui-alert-title"
                    }
                }}
            >
                {children}
            </StyleProvider>
        </Text>
    );
});

export interface InnerAlertProps {
    /**
     * A controlled show value.
     */
    show?: boolean;
    /**
     * The style to use.
     */
    tone?: "info" | "positive" | "warning" | "critical";
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

export function InnerAlert({
    show = true,
    tone = "info",
    onDismiss,
    role: roleProp,
    as = "div",
    children,
    forwardedRef,
    ...rest
}: InnerAlertProps) {
    const ref = useMergedRefs(forwardedRef);

    const { icon, content, button } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Content
        },
        icon: {
            className: "o-ui-alert-icon"
        },
        content: {
            className: "o-ui-alert-content",
            as: AlertContent
        },
        button: {
            variant: "ghost",
            color: "inherit",
            condensed: true,
            size: "sm",
            className: "o-ui-alert-action"
        }
    }), []));

    const dismissMarkup = !isNil(onDismiss) && (
        <CrossButton
            color="inherit"
            onClick={onDismiss}
            size="sm"
            className="o-ui-alert-dismiss"
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
                        "o-ui-alert",
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

export const Alert = forwardRef<InnerAlertProps>((props, ref) => (
    <InnerAlert {...props} forwardedRef={ref} />
));

export type AlertProps = ComponentProps<typeof Alert>;

Alert.displayName = "Alert";

////////

const variations: { tone: keyof typeof Role; icon: ReactElement }[] = [
    { tone: "info", icon: <NotificationIcon /> },
    { tone: "positive", icon: <CheckIcon /> },
    { tone: "warning", icon: <WarningIcon /> },
    { tone: "critical", icon: <InfoIcon /> }
];

const [
    InfoAlert,
    PositiveAlert,
    WarningAlert,
    CriticalAlert
] = Object.values(variations).map(({ tone, icon }) => {
    return forwardRef<InnerAlertProps>(({
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
            <Alert
                tone={tone}
                {...rest}
                ref={ref}
            >
                {icon}
                {content}
                {button}
            </Alert>
        );
    });
});

export interface AlertTemplateProps {
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
export function AlertTemplate(_props: AlertTemplateProps): JSX.Element {
    return null;
}

InfoAlert.displayName = "InfoAlert";
PositiveAlert.displayName = "PositiveAlert";
WarningAlert.displayName = "WarningAlert";
CriticalAlert.displayName = "CriticalAlert";


export type InfoAlertProps = ComponentProps<typeof InfoAlert>;
export type PositiveAlertProps = ComponentProps<typeof PositiveAlert>;
export type WarningAlertProps = ComponentProps<typeof WarningAlert>;
export type CriticalAlertProps = ComponentProps<typeof CriticalAlert>;

export {
    InfoAlert,
    PositiveAlert,
    WarningAlert,
    CriticalAlert
};
