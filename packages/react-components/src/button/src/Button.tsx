import "./TextButton.css";

import { Box } from "../../box";
import { ComponentProps, MouseEventHandler, ReactNode, forwardRef, useMemo } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, SlotProps, as as asFunction, createSizeAdapter, cssModule, mergeProps, omitProps, slot, useSlots, useStyleProps } from "../../shared";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";
import { useButton } from "./useButton";
import { useFormButton } from "../../form";
import { useInputGroupButtonAddonProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "button";

export interface InnerButtonProps extends SlotProps, InternalProps, InteractionStatesProps, Omit<ComponentProps<typeof DefaultElement>, "autoFocus"> {
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
    * @ignore
    */
    onClick?: MouseEventHandler;
    /**
     * React children.
     */
    children: ReactNode;
}

const condensedTextSize = createSizeAdapter({
    "sm": "md",
    "md": "lg"
});

export function InnerButton(props: InnerButtonProps) {
    const [formProps] = useFormButton();
    const [toolbarProps] = useToolbarProps();
    const [inputGroupProps] = useInputGroupButtonAddonProps();
    const [styleProps] = useStyleProps("button");

    const {
        variant = "solid",
        color,
        shape = "pill",
        condensed,
        autoFocus,
        disabled,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        formProps,
        omitProps(toolbarProps, ["orientation"]),
        inputGroupProps,
        styleProps
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
        as,
        forwardedRef
    });

    const { icon, text, "end-icon": endIcon, counter } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: condensed ? size : embeddedIconSize(size),
            className: "o-ui-button-icon o-ui-button-start-icon"
        },
        text: {
            size: condensed ? condensedTextSize(size) : size,
            className: "o-ui-button-text",
            "aria-hidden": loading
        },
        "end-icon": {
            size: condensed ? size : embeddedIconSize(size),
            className: "o-ui-button-end-icon"
        },
        counter: {
            size: condensed ? condensedTextSize(size) : size,
            color: "inherit",
            pushed: true,
            disabled,
            className: "o-ui-button-counter"
        }
    }), [size, disabled, condensed, loading]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    disabled,
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
            {counter}
            {endIcon}
        </Box>
    );
}

export const Button = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerButtonProps>>((props, ref) => (
    <InnerButton {...props} forwardedRef={ref} />
)));

export const ButtonAsLink = asFunction(Button, "a");
