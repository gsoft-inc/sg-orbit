import "./Dot.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { any, elementType, oneOfType, string } from "prop-types";
import { cssModule, mergeProps, slot } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The dot color, e.g "primary-200".
     */
    color: string,
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any
};

export function InnerDot(props) {
    const {
        color,
        as = "span",
        children,
        forwardedRef,
        ...rest
    } = props;

    const labelMarkup = children && (
        <Text>
            {children}
        </Text>
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-dot",
                        children && "has-label"
                    ),
                    style: {
                        "--o-ui-dot-color": color && `var(--o-ui-${color})`
                    },
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {labelMarkup}
        </Box>
    );
}

InnerDot.propTypes = propTypes;

export const Dot = slot("dot", forwardRef((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
)));

Dot.displayName = "Dot";
