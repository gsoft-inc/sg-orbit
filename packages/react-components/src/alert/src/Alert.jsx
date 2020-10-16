import "./Alert.css";

import { CheckIcon, InfoIcon, NotificationIcon, WarningIcon } from "../../icons";
import { Content } from "../../view";
import { CrossButton } from "../../button";
import { SlotProvider, StyleProvider, Wrap, createSizeAdapter, cssModule, mergeClasses, normalizeSize, useHasChildren, useMergedRefs } from "../../shared";
import { Text } from "../../text";
import { Transition } from "../../transition";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
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
     * An alert can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const ROLE = {
    info: "status",
    success: "status",
    warning: "alert",
    critical: "alert"
};

const headingSize = createSizeAdapter({
    "sm": "3xs",
    "md": "2xs",
    "lg": "xs"
});

const buttonSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm",
    "lg": "md"
});

const AlertContent = forwardRef(({
    size,
    as = "div",
    children,
    ...rest
}, ref) => {
    return (
        <Text
            size={size}
            as={as}
            ref={ref}
            {...rest}
        >
            <StyleProvider
                value={{
                    text: {
                        size: "inherit"
                    },
                    p: {
                        size: "inherit"
                    },
                    link: {
                        size: "inherit",
                        underline: "dotted"
                    },
                    list: {
                        size: "inherit"
                    },
                    heading: {
                        size: headingSize(size),
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
    size,
    as = "div",
    className,
    role: roleProp,
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const { hasIcon, hasAction } = useHasChildren({
        hasIcon: ".o-ui-alert-icon",
        hasCounter: ".o-ui-alert-action"
    }, ref);

    const role = (roleProp ?? ROLE[tone]) ?? "alert";

    const dismissMarkup = !isNil(onDismiss) && (
        <CrossButton
            color="inherit"
            onClick={onDismiss}
            size={buttonSize(size)}
            className="o-ui-alert-dismiss"
            aria-label="Dismiss"
        />
    );

    return (
        <Transition
            {...rest}
            show={show}
            enter="o-ui-fade-in"
            leave="o-ui-fade-out"
            className={mergeClasses(
                cssModule(
                    "o-ui-alert",
                    tone,
                    hasIcon && "has-icon",
                    hasAction && "has-action",
                    dismissMarkup && "has-dismiss",
                    normalizeSize(size)
                ),
                className
            )}
            role={role}
            as={as}
            ref={ref}
        >
            <SlotProvider
                value={{
                    icon: {
                        size,
                        className: "o-ui-alert-icon"
                    },
                    content: {
                        size,
                        className: "o-ui-alert-content",
                        as: AlertContent
                    },
                    button: {
                        variant: "ghost",
                        color: "inherit",
                        size: buttonSize(size),
                        className: "o-ui-alert-action"
                    }
                }}
            >
                <Wrap as={Content}>
                    {children}
                </Wrap>
            </SlotProvider>
            {dismissMarkup}
        </Transition>
    );
}

InnerAlert.propTypes = propTypes;

export const Alert = forwardRef((props, ref) => (
    <InnerAlert {...props} forwardedRef={ref} />
));

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
        return (
            <Alert
                tone={tone}
                {...rest}
                ref={ref}
            >
                {icon}
                <Wrap as={Content}>
                    {children}
                </Wrap>
            </Alert>
        );
    });
});

export {
    InfoAlert,
    SuccessAlert,
    WarningAlert,
    CriticalAlert
};
