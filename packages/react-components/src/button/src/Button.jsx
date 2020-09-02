import "./Button.css";

import { SlotProvider, cssModule, mergeClasses, useHasChild } from "../../shared";
import { Text, textSlot } from "../../text";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { iconSlot } from "../../icons";
import { useButton } from "./useButton";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost", "link"]),
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
    /**
     * The button shape.
     */
    shape: oneOf(["pill", "rounded", "circular"]),
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Whether the button take up the width of its container.
     */
    fluid: bool,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
    /**
     * Called when the button is click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClick: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerButton({
    variant = "solid",
    color,
    shape = "pill",
    autoFocus,
    autoFocusDelay,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    disabled,
    type = "button",
    as: ElementType = "button",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const { className: buttonClassName, ref: buttonRef, ...buttonProps } = useButton({
        variant,
        color,
        shape,
        autoFocus,
        autoFocusDelay,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        disabled,
        type,
        className,
        forwardedRef
    });

    const hasIcon = useHasChild(".o-ui-button-icon", buttonRef);

    const content = typeof children === "string"
        ? <Text>{children}</Text>
        : children;

    return (
        <ElementType
            data-testid="button"
            {...rest}
            {...buttonProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-button",
                    hasIcon && "has-icon"
                ),
                buttonClassName
            )}
            ref={buttonRef}
        >
            <SlotProvider
                slots={{
                    text: textSlot({
                        size,
                        className: "o-ui-button-text"
                    }),
                    icon: iconSlot({
                        size,
                        className: "o-ui-button-icon"
                    })
                }}
            >
                {content}
            </SlotProvider>
        </ElementType>
    );
}

InnerButton.propTypes = propTypes;

export const Button = forwardRef((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
));




