import "./Alert.css";

import { CheckIcon, InfoIcon, NotificationIcon, WarningIcon } from "../../icons";
import { Content } from "../../view";
import { ContentStyleProvider, SlotProvider, cssModule, getSize, getSizeClass, mergeClasses, useHasChildren, useMergedRefs, useTextContent } from "../../shared";
import { CrossButton } from "../../button";
import { Text } from "../../text";
import { Transition } from "../../transition";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";

const ROLE = {
    info: "status",
    success: "status",
    warning: "critical",
    critical: "critical"
};

const HEADING_SIZE = {
    "sm": "3xs",
    "md": "2xs",
    "lg": "xs"
};

const BUTTON_SIZE = {
    "sm": "xs",
    "md": "sm",
    "lg": "md"
};

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

function AlertContent({ size, children, ...rest }) {
    return (
        <Text
            {...rest}
            // Without getSize, when medium (undefined size), the Text component will take it's size from the ContentStyleProviderContext and render as an "inherit" size.
            size={getSize(size)}
            as="div"
        >
            {children}
        </Text>
    );
}

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

    const role = useMemo(() => (roleProp ?? ROLE[tone]) ?? "alert", [tone, roleProp]);

    const { hasIcon, hasAction } = useHasChildren({
        hasIcon: ".o-ui-alert-icon",
        hasCounter: ".o-ui-alert-action"
    }, ref);

    const dismissMarkup = !isNil(onDismiss) && (
        <CrossButton
            onClick={onDismiss}
            size={BUTTON_SIZE[getSize(size)]}
            className="o-ui-alert-dismiss"
            aria-label="Dismiss"
        />
    );

    const content = useTextContent(() => (<Content>{children}</Content>), children);

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
                    getSizeClass(size)
                ),
                className
            )}
            role={role}
            as={as}
            ref={ref}
        >
            <SlotProvider
                slots={useMemo(() => ({
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
                        size: BUTTON_SIZE[getSize(size)],
                        className: "o-ui-alert-action"
                    }
                }), [size])}
            >
                <ContentStyleProvider
                    defaults="all"
                    styles={useMemo(() => ({
                        heading: {
                            size: HEADING_SIZE[getSize(size)],
                            className: "o-ui-alert-title"
                        }
                    }), [size])}
                >
                    {content}
                </ContentStyleProvider>
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
    [InnerInfoAlert, InfoAlert],
    [InnerSuccessAlert, SuccessAlert],
    [InnerWarningAlert, WarningAlert],
    [InnerCriticalAlert, CriticalAlert]
] = Object.values(variations).map(({ tone, icon }) => {
    const InnerVariation = ({
        children,
        forwardedRef,
        ...rest
    }) => {
        return (
            <Alert
                tone={tone}
                {...rest}
                ref={forwardedRef}
            >
                {icon}
                <Content>
                    {children}
                </Content>
            </Alert>
        );
    };

    InnerVariation.propTypes = propTypes;

    const Variation = forwardRef((props, ref) => (
        <InnerVariation {...props} forwardedRef={ref} />
    ));

    return [InnerVariation, Variation];
});

export {
    InnerInfoAlert,
    InfoAlert,
    InnerSuccessAlert,
    SuccessAlert,
    InnerWarningAlert,
    WarningAlert,
    InnerCriticalAlert,
    CriticalAlert
};
