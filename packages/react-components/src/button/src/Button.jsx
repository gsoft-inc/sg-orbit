import "./TextButton.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { createSizeAdapter, cssModule, mergeProps, omitProps, slot, useSlots } from "../../shared";
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
     * Whether or not the button should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the button take up the width of its container.
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
     * Whether or not the button is disabled.
     */
    disabled: bool,
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
     * React children.
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
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type = "button",
        as = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        formProps,
        omitProps(toolbarProps, ["orientation"])
    );

    const { ref: buttonRef, ...buttonProps } = useButton({
        cssModule: "o-ui-text-button",
        variant,
        color,
        shape,
        autoFocus,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type,
        forwardedRef
    });

    const { icon, text, "end-icon": endIcon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: condensed ? size : embeddedIconSize(size),
            className: "o-ui-button-left-icon"
        },
        text: {
            size: condensed ? condensedTextSize(size) : size,
            className: "o-ui-button-text",
            "aria-hidden": loading
        },
        "end-icon": {
            size: condensed ? size : embeddedIconSize(size),
            className: "o-ui-button-end-icon"
        }
    }), [size, condensed, loading]));

    return (
        <Box
            {...mergeProps(
                rest,
                buttonProps,
                {
                    className: cssModule(
                        "o-ui-button",
                        icon && "has-start-icon",
                        endIcon && "has-end-icon"
                    ),
                    as,
                    ref: buttonRef
                }
            )}
        >
            {icon}
            {text}
            {endIcon}
        </Box>
    );
}

InnerButton.propTypes = propTypes;

export const Button = slot("button", forwardRef((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
)));

Button.displayName = "Button";


