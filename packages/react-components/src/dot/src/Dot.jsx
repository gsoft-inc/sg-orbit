import "./Dot.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { cssModule, mergeClasses, normalizeSize, slot } from "../../shared";
import { elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The dot color, e.g "primary-200".
     */
    color: string,
    /**
     * A dot can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerDot(props) {
    const {
        color,
        size,
        as = "span",
        className,
        style,
        children,
        forwardedRef,
        ...rest
    } = props;

    const labelMarkup = children && (
        <Text size={size}>
            {children}
        </Text>
    );

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-dot",
                    children && "has-label",
                    normalizeSize(size)
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


