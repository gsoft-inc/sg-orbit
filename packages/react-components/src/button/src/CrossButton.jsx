import { CrossIcon } from "../../icons";
import { IconButton } from "./IconButton";
import { bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSize, mergeProps, useSlot } from "../../shared";

// TODO:
// - Maybe we can now remove the hack that we did for secondary ghost (it was for Tag)

const SIZE = {
    "xs": "2xs",
    "sm": "xs",
    "md": "sm",
    "lg": "md"
};

const propTypes = {
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A close button can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg"]),
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
    slot: string
};

export function InnerCrossButton(props) {
    const {
        size,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "button")
    );

    return (
        <IconButton
            {...rest}
            variant="ghost"
            shape="circular"
            size={SIZE[getSize(size)]}
        >
            <CrossIcon />
        </IconButton>
    );
}

InnerCrossButton.propTypes = propTypes;

export const CrossButton = forwardRef((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
));

// Alias to facilitate communication.
export const CloseButton = forwardRef(({
    children,
    ...rest
}, ref) => {
    return (
        <CrossButton
            aria-label="Close"
            {...rest}
            ref={ref}
        >
            {children}
        </CrossButton>
    );
});
