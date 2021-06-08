import "./IconButton.css";

import { AriaLabelingProps, InteractionStatesProps, augmentElement, createEmbeddableAdapter, forwardRef, isNil, mergeProps, omitProps, slot } from "../../shared";
import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactElement, ReactNode } from "react";
import { EmbeddedIcon } from "../../icons";
import { useButton } from "./useButton";
import { useInputGroupButtonAddonProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

export interface InnerIconButtonProps extends InteractionStatesProps, AriaLabelingProps {
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
     * Called when the icon button is click.
     * @param {MouseEvent} event - React's original synthetic event.
     * @returns {void}
     */
    onClick?: (event: MouseEvent) => void;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid?: boolean;
    /**
    * @ignore
    */
    title?: string;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
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
        title,
        "aria-label": ariaLabel,
        as = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        inputGroupProps
    );

    if (isNil(title) && isNil(ariaLabel)) {
        console.error("An icon button component must have either a \"title\" or an \"aria-label\" attribute.");
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
                    title,
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

export const IconButton = slot("button", forwardRef<InnerIconButtonProps, "button">((props, ref) => (
    <InnerIconButton {...props} forwardedRef={ref} />
)));

export type IconButtonProps = ComponentProps<typeof IconButton>;

IconButton.displayName = "IconButton";

export const embedIconButton = createEmbeddableAdapter({
    "sm": "2xs",
    "md": "xs"
});
