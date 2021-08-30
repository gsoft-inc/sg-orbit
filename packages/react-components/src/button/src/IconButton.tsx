import "./IconButton.css";

import { Box } from "../../box";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import { InteractionStatesProps, InternalProps, OmitInternalProps, SlotProps, augmentElement, createEmbeddableAdapter, isNil, mergeProps, omitProps, slot } from "../../shared";
import { useButton } from "./useButton";
import { useInputGroupButtonAddonProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "button";

export interface InnerIconButtonProps extends SlotProps, InternalProps, InteractionStatesProps, Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus"> {
    /**
     * The icon button style to use.
     */
    variant?: "solid" | "outline" | "ghost";
    /**
     * The icon button color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * The icon button shape.
     */
    shape?: "rounded" | "circular";
    /**
     * Whether or not the icon button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the icon button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * An icon button can show a loading indicator.
     */
    loading?: boolean;
    /**
     * An icon button can vary in size.
     */
    size?: "2xs" | "xs" | "sm" | "md";
    /**
     * Whether or not the icon button is disabled.
     */
    disabled?: boolean;
    /**
     * The icon button type.
     */
    type?: "button" | "submit" | "reset";
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

export function InnerIconButton(props: InnerIconButtonProps) {
    const [toolbarProps] = useToolbarProps();
    const [inputGroupProps] = useInputGroupButtonAddonProps();

    const {
        variant = "solid",
        color,
        shape = "circular",
        condensed,
        autoFocus,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type,
        "aria-label": ariaLabel,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        inputGroupProps
    );

    if (isNil(ariaLabel)) {
        console.error("An icon button component must have an \"aria-label\" attribute.");
    }

    const buttonProps = useButton({
        cssModule: "o-ui-icon-button",
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

    const icon = Children.only(children) as ReactElement;

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        size,
        className: "o-ui-button-icon"
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    "aria-label": ariaLabel
                },
                buttonProps
            )}
        >
            {iconMarkup}
        </Box>
    );
}

export const IconButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerIconButtonProps>>((props, ref) => (
    <InnerIconButton {...props} forwardedRef={ref} />
)));

export type IconButtonProps = ComponentProps<typeof IconButton>;

export const embedIconButton = createEmbeddableAdapter({
    "sm": "2xs",
    "md": "xs"
});
