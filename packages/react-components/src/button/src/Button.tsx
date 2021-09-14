import "./TextButton.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import {
    InteractionProps,
    InternalProps,
    JsxElement,
    OmitInternalProps,
    SlotProps,
    StyledComponentProps,
    as,
    createSizeAdapter,
    cssModule,
    mergeProps,
    omitProps,
    slot,
    useSlots,
    useStyleProps
} from "../../shared";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";
import { useButton } from "./useButton";
import { useFormButton } from "../../form";
import { useInputGroupButtonAddonProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

export type AbstractButtonProps<T extends JsxElement<T>> = InternalProps & InteractionProps & Omit<StyledComponentProps<T>, "autoFocus"> & {
    /**
     * Whether or not the button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * The button color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: boolean;
    /**
     * A button can show a loading indicator.
     */
    loading?: boolean;
    /**
     * The button shape.
     */
    shape?: "pill" | "rounded" | "circular";
    /**
     * A button can vary in size.
     */
    size?: "sm" | "md";
    /**
     * The button type.
     */
    type?: "button" | "submit" | "reset";
    /**
     * The button style to use.
     */
    variant?: "solid" | "outline" | "ghost";
};

const DefaultElement = "button";

export interface InnerButtonProps extends AbstractButtonProps<typeof DefaultElement>, SlotProps {
    /**
     * React children.
     */
    children: ReactNode;
}

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
const condensedTextSize = createSizeAdapter({
    "sm": "md",
    "md": "lg"
});
/* eslint-emable sort-keys, sort-keys-fix/sort-keys-fix */

export function InnerButton(props: InnerButtonProps) {
    const [formProps] = useFormButton();
    const [toolbarProps] = useToolbarProps();
    const [inputGroupProps] = useInputGroupButtonAddonProps();
    const [styleProps] = useStyleProps<InnerButtonProps>("button");

    const {
        active,
        as: asProp = DefaultElement,
        autoFocus,
        children,
        color,
        condensed,
        disabled,
        fluid,
        focus,
        forwardedRef,
        hover,
        loading,
        shape = "pill",
        size,
        type,
        variant = "solid",
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
        as: asProp,
        forwardedRef
    });

    const { counter, "end-icon": endIcon, icon, text } = useSlots(children, useMemo(() => ({
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
                    as: asProp,
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

export type ButtonProps = ComponentProps<typeof Button>;

///////////

export const ButtonAsLink = as(Button, "a");
