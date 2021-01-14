import "./Alert.css";

import { CheckIcon, InfoIcon, NotificationIcon, WarningIcon } from "../../icons";
import { Content } from "../../placeholders";
import { CrossButton } from "../../button";
import { StyleProvider, cssModule, mergeProps, useMergedRefs, useSlots } from "../../shared";
import { Text } from "../../text";
import { Transition } from "../../transition";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * A controlled show value.
     */
    show: bool,
    /**
     * The style to use.
     */
    tone: oneOf(["info", "success", "warning", "critical"]),
    /**
     * Called when the dismiss button is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onDismiss: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

const Role = {
    info: "status",
    success: "status",
    warning: "alert",
    critical: "alert"
};

const AlertContent = forwardRef(({
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
                        color: "inherit",
                        underline: "dotted"
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

export function InnerAlert({
    show = true,
    tone = "info",
    onDismiss,
    role: roleProp,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
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

InnerAlert.propTypes = propTypes;

export const Alert = forwardRef((props, ref) => (
    <InnerAlert {...props} forwardedRef={ref} />
));

Alert.displayName = "Alert";

////////

const variations = [
    { tone: "info", icon: <NotificationIcon /> },
    { tone: "success", icon: <CheckIcon /> },
    { tone: "warning", icon: <WarningIcon /> },
    { tone: "critical", icon: <InfoIcon /> }
];

const [
    InfoAlert,
    SuccessAlert,
    WarningAlert,
    CriticalAlert
] = Object.values(variations).map(({ tone, icon }) => {
    return forwardRef(({
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

// Dummy component for documentation purpose.
export function AlertTemplate() {
    // When returning null, react-docgen doesn't ignore the component.
    return <></>;
}

AlertTemplate.propTypes = {
    /**
     * A controlled show value.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    show: bool,
    /**
     * Called when the dismiss button is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    // eslint-disable-next-line react/no-unused-prop-types
    onDismiss: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    // eslint-disable-next-line react/no-unused-prop-types
    children: any.isRequired
};

InfoAlert.displayName = "InfoAlert";
SuccessAlert.displayName = "SuccessAlert";
WarningAlert.displayName = "WarningAlert";
CriticalAlert.displayName = "CriticalAlert";

export {
    InfoAlert,
    SuccessAlert,
    WarningAlert,
    CriticalAlert
};
