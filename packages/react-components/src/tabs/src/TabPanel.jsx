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

export function InnerTabPanel() {
    return null;
}

InnerTabPanel.propTypes = propTypes;

export const TabPanel = forwardRef((props, ref) => (
    <InnerTabPanel {...props} forwardedRef={ref} />
));
