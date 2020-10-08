import { CrossIcon } from "../../icons";
import { IconButton } from "./IconButton";
import { bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSize, mergeProps, useSlot } from "../../shared";

const propTypes = {
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A close button can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
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

export function InnerCrossButton({ children, ...rest }) {
    return (
        <IconButton
            {...rest}
            variant="ghost"
            shape="circular"
        >
            {children ?? <CrossIcon />}
        </IconButton>
    );
}

InnerCrossButton.propTypes = propTypes;

export const CrossButton = forwardRef((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
));

////////

const EMBED_SIZE = {
    "sm": "2xs",
    "md": "xs",
    "lg": "sm"
};

export function InnerEmbeddedCrossButton(props) {
    const {
        size,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "button")
    );

    const embedSize = EMBED_SIZE[getSize(size)];

    return (
        <CrossButton
            {...rest}
            size={embedSize}
        >
            <CrossIcon size={embedSize} />
        </CrossButton>
    );
}

InnerEmbeddedCrossButton.propTypes = propTypes;

export const EmbeddedCrossButton = forwardRef((props, ref) => (
    <InnerEmbeddedCrossButton {...props} forwardedRef={ref} />
));
