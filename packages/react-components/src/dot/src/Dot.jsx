import "./Dot.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { any, elementType, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, slot } from "../../shared";
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
        className,
        style,
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
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-dot",
                    children && "has-label"
                ),
                className
            )}
            style={{
                ...style,
                "--o-ui-dot-color": color && `var(--${color})`
            }}
            as={as}
            ref={forwardedRef}
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
