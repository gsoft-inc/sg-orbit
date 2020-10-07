import "./Alert.css";

import { CheckIcon, InfoIcon, NotificationIcon, WarningIcon } from "../../icons";
import { Content } from "../../view";
import { ContentStyleProvider, SlotProvider, cssModule, getSize, getSizeClass, mergeClasses, useHasChild, useMergedRefs, useTextContent } from "../../shared";
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
    "sm": "2xs",
    "md": "xs",
    "lg": "sm"
};

const ACTION_SIZE = {
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

    const hasAction = useHasChild(".o-ui-alert-action", ref);

    // Override the default slot to ensure the dismiss button doesn't inherit from the "button" slot props.
    const dismissMarkup = !isNil(onDismiss) && (
        <CrossButton
            slot="dismiss"
            onClick={onDismiss}
            size={getSize(size)}
            className="o-ui-alert-dismiss"
            aria-label="Close"
        />
    );

    const content = useTextContent(() => (<Content><Text>{children}</Text></Content>), children);

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
                    hasAction && "has-action",
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
                        as: Text
                    },
                    button: {
                        variant: "ghost",
                        size: ACTION_SIZE[getSize(size)],
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
