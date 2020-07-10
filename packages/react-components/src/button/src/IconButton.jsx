import { Button } from "./Button";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { cloneElement, forwardRef } from "react";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * Color accent to use.
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
     * A button can vary in sizes.
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

export function InnerIconButton({ size, children, forwardedRef, ...rest }) {
    return (
        <Button
            {...rest}
            ref={forwardedRef}
        >
            {cloneElement(children, {
                size
            })}
        </Button>
    );
}

InnerIconButton.propTypes = propTypes;
InnerIconButton.defaultProps = defaultProps;

export const IconButton = forwardRef((props, ref) => (
    <InnerIconButton { ...props } forwardedRef={ref} />
));


