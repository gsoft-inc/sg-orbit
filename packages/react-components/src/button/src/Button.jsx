import "./Button.css";

import { ClearSlots, SlotProvider, cssModule, mergeClasses, mergeProps, omitProps, useHasChild, useSlot, useTextContent } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSlot } from "../../icons";
import { forwardRef } from "react";
import { useButton } from "./useButton";
import { useFormButton } from "../../form";
import { useToolbarContext } from "../../toolbar";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
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
    size: oneOf(["sm", "md", "lg"]),
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
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerButton(props) {
    const [formProps] = useFormButton();
    const [toolbarProps] = useToolbarContext();

    const {
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
        type = "button",
        as: ElementType = "button",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "button"),
        formProps,
        omitProps(toolbarProps, ["orientation"])
    );

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
        type,
        className,
        forwardedRef
    });

    const hasIcon = useHasChild(".o-ui-button-icon", buttonRef);

    const content = useTextContent(Text, children);

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
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: {
                            size,
                            className: "o-ui-button-text",
                            "aria-hidden": loading
                        },
                        icon: embeddedIconSlot({
                            size,
                            className: "o-ui-button-icon"
                        })
                    }}
                >
                    {content}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerButton.propTypes = propTypes;

export const Button = forwardRef((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
));




