import { Box } from "../../box";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { slot } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerHeader({
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Box
            {...rest}
            as={as}
            ref={forwardedRef}
        >
            {children}
        </Box>
    );
}

InnerHeader.propTypes = propTypes;

export const Header = slot("header", forwardRef((props, ref) => (
    <InnerHeader {...props} forwardedRef={ref} />
)));
