import "./TextButton.css";

import { Box } from "../../box";
import { ButtonShape, ButtonVariant, useButton } from "./useButton";
import { ComponentProps, ElementType, ReactNode, forwardRef, useMemo } from "react";
import {
    InteractionProps,
    InternalProps,
    OmitInternalProps,
    SlotProps,
    StyledComponentProps,
    as,
    createSizeAdapter,
    cssModule,
    mergeProps,
    omitProps,
    slot,
    useSlots
} from "../../shared";
import { ResponsiveProp, useResponsiveValue, useStyleProps } from "../../styling";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";
import { useFormButton } from "../../form";
import { useInputGroupButtonAddonProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

export type AbstractButtonProps<T extends ElementType> = InternalProps & InteractionProps & Omit<StyledComponentProps<T>, "autoFocus"> & {
    /**
     * Whether or not the button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: ResponsiveProp<boolean>;
    /**
     * Whether or not the button should inherit it's parent style.
     */
    inherit?: boolean;
    /**
     * A button can show a loading indicator.
     */
    loading?: boolean;
    /**
     * The button shape.
     */
    shape?: ButtonShape;
    /**
     * A button can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;
    /**
     * The button type.
     */
    type?: "button" | "submit" | "reset";
    /**
     * The button style to use.
     */
    variant?: ButtonVariant;
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
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

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
        condensed,
        disabled,
        fluid,
        focus,
        forwardedRef,
        hover,
        loading,
        shape,
        size,
        type,
        variant,
        inherit,
        ...rest
    } = mergeProps(
        props,
        formProps,
        omitProps(toolbarProps, ["orientation"]),
        inputGroupProps,
        styleProps
    );

    const fluidValue = useResponsiveValue(fluid);
    const sizeValue = useResponsiveValue(size);

    const { ref: buttonRef, ...buttonProps } = useButton({
        active,
        as: asProp,
        autoFocus,
        cssModule: "o-ui-text-button",
        fluid: fluidValue,
        focus,
        forwardedRef,
        hover,
        inherit,
        loading,
        shape,
        size: sizeValue,
        type,
        variant
    });

    const { counter, "end-icon": endIcon, icon, text } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        counter: {
            className: "o-ui-button-counter",
            color: "inherit",
            disabled,
            pushed: true,
            size: condensed ? condensedTextSize(sizeValue) : sizeValue
        },
        "end-icon": {
            className: "o-ui-button-end-icon",
            size: condensed ? sizeValue : embeddedIconSize(sizeValue)
        },
        icon: {
            className: "o-ui-button-icon o-ui-button-start-icon",
            size: condensed ? sizeValue : embeddedIconSize(sizeValue)
        },
        text: {
            "aria-hidden": loading,
            className: "o-ui-button-text",
            size: condensed ? condensedTextSize(sizeValue) : sizeValue
        }
    }), [sizeValue, disabled, condensed, loading]));

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as: asProp,
                    className: cssModule(
                        "o-ui-button",
                        icon && "has-start-icon",
                        endIcon && "has-end-icon"
                    ),
                    disabled,
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
