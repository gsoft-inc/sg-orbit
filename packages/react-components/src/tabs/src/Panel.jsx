import { any, elementType, func, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

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

export const Panel = forwardRef(() => {
    return null;
});

Panel.propTypes = propTypes;

Panel.getCollectionNode = props => {
    return {
        type: "panel",
        props
    };
};
