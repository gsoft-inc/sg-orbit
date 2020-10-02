import "./Alert.css";

import { CheckIcon, CrossIcon, InfoIcon, NotificationIcon, WarningIcon } from "../../icons";
import { Content } from "../../view";
import { IconButton } from "../../button";
import { SlotProvider, createSizeAdapterSlotFactory, cssModule, getSizeClass, mergeClasses, useId, useTextContent } from "../../shared";
import { Text } from "../../text";
import { Transition } from "../../transition";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";

// TODO:
// - Align: start | center?

const ROLE = {
    info: "status",
    success: "status",
    warning: "critical",
    critical: "critical"
};

const propTypes = {
    /**
     * A controlled show value.
     */
    show: bool,
    /**
     * Style to use.
     */
    tone: oneOf(["info", "success", "warning", "critical"]),
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

const headingSlotAdapter = createSizeAdapterSlotFactory({
    "sm": "2xs",
    "md": "xs",
    "lg": "sm"
});

const actionSlotAdapter = createSizeAdapterSlotFactory({
    "sm": "xs",
    "md": "sm",
    "lg": "md"
});

export function InnerAlert({
    show = true,
    tone = "info",
    size,
    as = "div",
    className,
    role: roleProp,
    children,
    forwardedRef,
    ...rest
}) {
    const content = useTextContent(() => (<Content><Text>{children}</Text></Content>), children);

    const role = useMemo(() => (roleProp ?? ROLE[tone]) ?? "alert", [tone, roleProp]);
    const contentId = useId(null, "o-ui-alert-content");

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
                    getSizeClass(size)
                ),
                className
            )}
            tabIndex="0"
            role={role}
            as={as}
            aria-describedby={contentId}
            ref={forwardedRef}
        >
            <SlotProvider
                slots={{
                    icon: {
                        size,
                        className: "o-ui-alert-icon"
                    },
                    content: {
                        id: contentId,
                        size,
                        className: "o-ui-alert-content",
                        as: Text,
                        UNSAFE_slots: {
                            heading: headingSlotAdapter({
                                size,
                                className: "o-ui-alert-title"
                            }),
                            text: {
                                size: "inherit"
                            },
                            paragraph: {
                                size: "inherit"
                            },
                            list: {
                                size: "inherit"
                            },
                            button: {
                                size
                            }
                        }
                    },
                    button: actionSlotAdapter({
                        size,
                        className: "o-ui-alert-action"
                    })
                }}
            >
                {content}
            </SlotProvider>
        </Transition>
    );
}

InnerAlert.propTypes = propTypes;

export const Alert = forwardRef((props, ref) => (
    <InnerAlert {...props} forwardedRef={ref} />
));

////////

function CloseButton(props) {
    return (
        <IconButton
            {...props}
            variant="ghost"
            color="secondary"
            shape="circular"
            aria-label="Close"
        >
            <CrossIcon />
        </IconButton>
    );
}

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
        onDismiss,
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
                {!isNil(onDismiss) && icon}
                <Content>
                    {children}
                </Content>
                <CloseButton onClick={onDismiss} />
            </Alert>
        );
    };

    InnerVariation.propTypes = {
        ...propTypes,
        /**
         * Called when the dismiss button is clicked.
         * @param {SyntheticEvent} event - React's original SyntheticEvent.
         * @returns {void}
         */
        onDismiss: func
    };

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
