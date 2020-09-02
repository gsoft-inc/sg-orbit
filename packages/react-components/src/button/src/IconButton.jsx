import { ClearSlots, augmentElement, useSlotProps } from "../../shared";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useButton } from "./useButton";

const propTypes = {
    /**
     * Style to use.
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
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
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
        disabled,
        type = "button",
        as: ElementType = "button",
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "button");

    const buttonProps = useButton({
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
        disabled,
        type,
        className,
        forwardedRef
    });

    const content = augmentElement(children, {
        size
    });

    return (
        <ElementType
            data-testid="icon-button"
            {...rest}
            {...buttonProps}
        >
            <ClearSlots>
                {content}
            </ClearSlots>
        </ElementType>
    );
}

InnerIconButton.propTypes = propTypes;

export const IconButton = forwardRef((props, ref) => (
    <InnerIconButton {...props} forwardedRef={ref} />
));


