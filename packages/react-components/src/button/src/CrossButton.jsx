import { CrossIcon } from "../../icons";
import { IconButton } from "./IconButton";
import { bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { slot } from "../../shared";

const propTypes = {
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed: bool,
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A cross button can vary in size.
     */
    size: oneOf(["2xs", "xs", "sm", "md"]),
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

export function InnerCrossButton({ forwardedRef, ...rest }) {
    return (
        <IconButton
            {...rest}
            variant="ghost"
            shape="circular"
            ref={forwardedRef}
        >
            <CrossIcon />
        </IconButton>
    );
}

InnerCrossButton.propTypes = propTypes;

export const CrossButton = slot("button", forwardRef((props, ref) => (
    <InnerCrossButton {...props} forwardedRef={ref} />
)));
