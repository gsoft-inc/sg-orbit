import "./VisuallyHidden.css";

import { Box } from "../../box";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses, mergeProps } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerVisuallyHidden({
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-visually-hidden",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

InnerVisuallyHidden.propTypes = propTypes;

export const VisuallyHidden = forwardRef((props, ref) => (
    <InnerVisuallyHidden {...props} forwardedRef={ref} />
));

VisuallyHidden.displayName = "VisuallyHidden";

