import "./VisuallyHidden.css";

import { Box } from "../../box";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerVisuallyHidden({
    as = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...rest}
            className={mergeClasses(
                "o-ui visually-hidden",
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Box>
    );
}

InnerVisuallyHidden.propTypes = propTypes;

export const VisuallyHidden = forwardRef((props, ref) => (
    <InnerVisuallyHidden {...props} forwardedRef={ref} />
));

