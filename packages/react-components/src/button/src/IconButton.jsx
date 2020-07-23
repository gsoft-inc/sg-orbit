import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeClasses } from "../../shared";
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
    color: oneOf(["primary", "secondary"]),
    /**
     * Whether or not the button should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A button can have a circular form.
     */
    circular: bool,
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
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    variant: "solid",
    type: "button",
    as: "button"
};

export function InnerIconButton({
    variant,
    color,
    autofocus,
    autofocusDelay,
    fluid,
    circular,
    loading,
    size,
    active,
    focus,
    hover,
    disabled,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const buttonProps = useButton({
        variant,
        color,
        autofocus,
        autofocusDelay,
        fluid,
        circular,
        loading,
        size,
        active,
        focus,
        hover,
        disabled,
        className,
        ref: forwardedRef,
        ...rest
    });

    const content = augmentElement(children, {
        size
    });

    return (
        <ElementType
            data-testid="icon-button"
            {...buttonProps}
            className={mergeClasses(
                "o-ui button icon",
                buttonProps.className
            )}
        >
            {content}
        </ElementType>
    );
}

InnerIconButton.propTypes = propTypes;
InnerIconButton.defaultProps = defaultProps;

export const IconButton = forwardRef((props, ref) => (
    <InnerIconButton { ...props } forwardedRef={ref} />
));


