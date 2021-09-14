import "./IconButton.css";

import { Box } from "../../box";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import {
    InteractionProps,
    InternalProps,
    JsxElement,
    OmitInternalProps,
    SlotProps,
    StyledComponentProps,
    as,
    augmentElement,
    createEmbeddableAdapter,
    mergeProps,
    omitProps,
    slot
} from "../../shared";
import { useButton } from "./useButton";
import { useInputGroupButtonAddonProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

export type AbstractIconButtonProps<T extends JsxElement<T>> =
    InternalProps &
    InteractionProps &
    Omit<StyledComponentProps<typeof DefaultElement>, "autoFocus"> & {
        /**
         * See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
         */
        "aria-label": string;
        /**
         * Whether or not the icon button should autoFocus on render.
         */
        autoFocus?: boolean | number;
        /**
         * The icon button color accent.
         */
        color?: "primary" | "secondary" | "danger" | "inherit";
        /**
         * Whether or not the icon button content should takes additional space.
         */
        condensed?: boolean;
        /**
         * Whether or not the button take up the width of its container.
         */
        fluid?: boolean;
        /**
         * An icon button can show a loading indicator.
         */
        loading?: boolean;
        /**
         * The icon button shape.
         */
        shape?: "rounded" | "circular";
        /**
         * An icon button can vary in size.
         */
        size?: "2xs" | "xs" | "sm" | "md";
        /**
         * The icon button type.
         */
        type?: "button" | "submit" | "reset";
        /**
         * The icon button style to use.
         */
        variant?: "solid" | "outline" | "ghost";
    };

const DefaultElement = "button";

export interface InnerIconButtonProps extends AbstractIconButtonProps<typeof DefaultElement>, SlotProps {
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
        as: asProp = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        inputGroupProps
    );

    const buttonProps = useButton({
        active,
        as: asProp,
        autoFocus,
        color,
        cssModule: "o-ui-icon-button",
        fluid,
        focus,
        forwardedRef,
        hover,
        loading,
        shape,
        size,
        type,
        variant
    });

    const icon = Children.only(children) as ReactElement;

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        className: "o-ui-button-icon",
        size
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-label": ariaLabel,
                    as: asProp
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

/* eslint-disable sort-keys, sort-keys-fix/sort-keys-fix */
export const embedIconButton = createEmbeddableAdapter({
    "sm": "2xs",
    "md": "xs"
});
/* eslint-enable sort-keys, sort-keys-fix/sort-keys-fix */

///////////

export const IconButtonAsLink = as(IconButton, "a");
