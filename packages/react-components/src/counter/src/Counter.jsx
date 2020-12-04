import "./Counter.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, normalizeSize, slot } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * The style to use.
     */
    variant: oneOf(["pill", "divider"]),
    /**
     * The color accent.
     */
    color: oneOf(["light"]),
    /**
     * Whether or not to add emphasis on the count value.
     */
    highlight: bool,
    /**
     * Whether or not to reverse counter elements order.
     */
    reverse: bool,
    /**
     * A counter can vary in size.
     */
    size: oneOf(["sm", "md", "inherit"]),
    /**
     * Whether or not the counter is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the counter push itself away from leading sibling element.
     */
    pushed: bool,
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
    children: any.isRequired
};

export function InnerCounter(props) {
    const {
        variant = "pill",
        color,
        highlight,
        reverse,
        size,
        pushed,
        as = "span",
        className,
        children,
        forwardedRef,
        ...rest
    } = props;

    const content = variant === "divider"
        ? <Text size={size}>{children}</Text>
        : children;

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-counter",
                    variant,
                    color && color,
                    highlight && "highlight",
                    reverse && "reverse",
                    pushed && "pushed",
                    normalizeSize(size)
                ),
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            {content}
        </Box>
    );
}

InnerCounter.propTypes = propTypes;

export const Counter = slot("counter", forwardRef((props, ref) => (
    <InnerCounter {...props} forwardedRef={ref} />
)));

Counter.displayName = "Counter";
