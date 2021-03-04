import "./TextButton.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, useMemo } from "react";
import { Text } from "../../text";
import { createSizeAdapter, cssModule, forwardRef, mergeProps, omitProps, slot, useSlots } from "../../shared";
import { embeddedIconSize } from "../../icons";
import { useButton } from "./useButton";
import { useFormButton } from "../../form";
import { useToolbarProps } from "../../toolbar";

interface InnerButtonProps {
    /**
     * The button style to use.
     */
    variant?: "solid" | "outline" | "ghost";
    /**
     * The button color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * The button shape.
     */
    shape?: "pill" | "rounded" | "circular";
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: boolean;
    /**
     * A button can show a loading indicator.
     */
    loading?: boolean;
    /**
     * A button can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the button is disabled.
     */
    disabled?: boolean;
    /**
     * The button type.
     */
    type?: "button" | "submit" | "reset";
    /**
    * Called when the button is click.
    * @param {SyntheticEvent} event - React's original SyntheticEvent.
    * @returns {void}
    */
    onClick?: (event: SyntheticEvent) => void
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * @ignore
     */
    active?: boolean;
    /**
     * @ignore
     */
    focus?: boolean;
    /**
     * @ignore
     */
    hover?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

const condensedTextSize = createSizeAdapter({
    "sm": "md",
    "md": "lg"
});

export function InnerButton(props: InnerButtonProps) {
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
            className: "o-ui-button-icon o-ui-button-left-icon"
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
                {
                    className: cssModule(
                        "o-ui-button",
                        icon && "has-start-icon",
                        endIcon && "has-end-icon"
                    ),
                    as,
                    ref: buttonRef
                },
                buttonProps
            )}
        >
            {icon}
            {text}
            {endIcon}
        </Box>
    );
}

export const Button = slot("button", forwardRef<InnerButtonProps>((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
)));

export type ButtonProps = ComponentProps<typeof Button>;

Button.displayName = "Button";
