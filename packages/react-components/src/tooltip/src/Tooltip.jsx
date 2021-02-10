import "./Tooltip.css";

import { Text } from "../../text";
import { any, elementType, func, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerTooltip({
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Text
            {...mergeProps(
                rest,
                {
                    className: "o-ui-tooltip",
                    role: "tooltip",
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Text>
    );
}

InnerTooltip.propTypes = propTypes;

export const Tooltip = forwardRef((props, ref) => (
    <InnerTooltip {...props} forwardedRef={ref} />
));

Tooltip.displayName = "Tooltip";
