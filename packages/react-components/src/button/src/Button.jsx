import "./Button.css";

import { SlotProvider, Wrap, cssModule, mergeClasses, mergeProps, omitProps, useHasChild, useSlotProps } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSize } from "../../icons";
import { forwardRef } from "react";
import { useButton } from "./useButton";
import { useFormButton } from "../../form";
import { useToolbarProps } from "../../toolbar";

const CONDENSED_TEXT_SIZE = {
    "sm": "md",
    "md": "lg",
    "lg": "xl"
};

const propTypes = {
    /**
     * The button style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * The button color accent.
     */
    color: oneOf(["primary", "secondary", "danger", "inherit"]),
    /**
     * The button shape.
     */
    shape: oneOf(["pill", "rounded", "circular"]),
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed: bool,
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
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

export function InnerButton({ slot, ...props }) {
    const [slotProps] = useSlotProps(slot ?? "button");
    const [formProps] = useFormButton();
    const [toolbarProps] = useToolbarProps();

    const {
        variant = "solid",
        color,
        shape = "pill",
        condensed,
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
        slotProps,
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
                value={{
                    text: {
                        size: condensed ? CONDENSED_TEXT_SIZE[size] : size,
                        className: "o-ui-button-text",
                        "aria-hidden": loading
                    },
                    icon: {
                        size: condensed ? size : embeddedIconSize(size),
                        className: "o-ui-button-icon"
                    }
                }}
            >
                <Wrap as={Text}>
                    {children}
                </Wrap>
            </SlotProvider>

        </ElementType>
    );
}

InnerButton.propTypes = propTypes;

export const Button = forwardRef((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
));




