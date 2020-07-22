import { IconButton } from "./IconButton";
import { ToggleButton } from "./ToggleButton";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

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
     * A button can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
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
    as: IconButton
};

// TODO: extract in a useToggleButton.

export function InnerToggleIconButton({ children, forwardedRef, ...rest }) {
    return (
        <ToggleButton
            {...rest}
            ref={forwardedRef}
        >
            {children}
        </ToggleButton>
    );
}

InnerToggleIconButton.propTypes = propTypes;
InnerToggleIconButton.defaultProps = defaultProps;

export const ToggleIconButton = forwardRef((props, ref) => (
    <InnerToggleIconButton { ...props } forwardedRef={ref} />
));
