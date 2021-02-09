import { Box } from "../../box";
import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerOverlayArrow({
    as = "div",
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: "o-ui-overlay-arrow",
                    as,
                    ref: forwardedRef
                }
            )}
        />
    );
}

InnerOverlayArrow.propTypes = propTypes;

export const OverlayArrow = forwardRef((props, ref) => (
    <InnerOverlayArrow {...props} forwardedRef={ref} />
));

OverlayArrow.displayName = "OverlayArrow";

