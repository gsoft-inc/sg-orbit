import "./TextButton.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { createSizeAdapter, cssModule, mergeClasses, mergeProps, omitProps, slot, useSlots } from "../../shared";
import { embeddedIconSize } from "../../icons";
import { forwardRef, useMemo } from "react";
import { useButton } from "./useButton";
import { useFormButton } from "../../form";
import { useToolbarProps } from "../../toolbar";

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
    size: oneOf(["sm", "md"]),
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

const condensedTextSize = createSizeAdapter({
    "sm": "md",
    "md": "lg"
});

export function InnerButton(props) {
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
        as = "button",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        formProps,
        omitProps(toolbarProps, ["orientation"])
    );

    const { className: buttonClassName, ref: buttonRef, ...buttonProps } = useButton({
        cssModule: "o-ui-text-button",
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

    const { text, icon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        text: {
            size: condensed ? condensedTextSize(size) : size,
            className: "o-ui-button-text",
            "aria-hidden": loading
        },
        icon: {
            size: condensed ? size : embeddedIconSize(size),
            className: "o-ui-button-icon"
        }
    }), [size, condensed, loading]));

    return (
        <Box
            {...rest}
            {...buttonProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-button",
                    icon && "has-icon"
                ),
                buttonClassName
            )}
            as={as}
            ref={buttonRef}
        >
            {icon}
            {text}
        </Box>
    );
}

InnerButton.propTypes = propTypes;

export const Button = slot("button", forwardRef((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
)));


