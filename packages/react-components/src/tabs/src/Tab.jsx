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

////////

export function TabPlaceholder() {
    return null;
}

TabPlaceholder.propTypes = propTypes;

////////

export function InnerTab() {
    return null;
}

InnerTab.propTypes = propTypes;

export const Tab = forwardRef((props, ref) => (
    <InnerTab {...props} forwardedRef={ref} />
));
