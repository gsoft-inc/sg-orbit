import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, omitProps, useSlot } from "../../shared";
import { forwardRef } from "react";
import { useButton } from "./useButton";
import { useToolbarContext } from "../../toolbar";

const propTypes = {
    /**
     * The style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
    /**
     * The button shape.
     */
    shape: oneOf(["pill", "rounded", "circular"]),
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in size.
     */
    size: oneOf(["2xs", "xs", "sm", "md", "lg"]),
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
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
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

export function InnerIconButton(props) {
    const [toolbarProps] = useToolbarContext();

    const {
        variant = "solid",
        color,
        shape = "pill",
        autoFocus,
        autoFocusDelay,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        type = "button",
        title,
        as: ElementType = "button",
        "aria-label": ariaLabel,
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "button"),
        omitProps(toolbarProps, ["orientation"])
    );

    const buttonProps = useButton({
        cssModule: "o-ui-icon-button",
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

    const iconMarkup = augmentElement(children, {
        size,
        className: "o-ui-button-icon"
    });

    return (
        <ElementType
            data-testid="icon-button"
            {...rest}
            {...buttonProps}
            title={title ?? ariaLabel}
            aria-label={ariaLabel}
        >
            {iconMarkup}
        </ElementType>
    );
}

InnerIconButton.propTypes = propTypes;

export const IconButton = forwardRef((props, ref) => (
    <InnerIconButton {...props} forwardedRef={ref} />
));
