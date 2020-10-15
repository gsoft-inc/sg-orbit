import { any, elementType, func, oneOfType, string } from "prop-types";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

export function Panel() {
    return null;
}

Panel.propTypes = propTypes;
