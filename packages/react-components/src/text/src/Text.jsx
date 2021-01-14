import "./Text.css";

import { Box } from "../../box";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, normalizeSize, slot, useStyleProps } from "../../shared";

export function getTextClass(size) {
    return `o-ui-text-${normalizeSize(size)}`;
}

////////

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerText(props) {
    const [styleProps] = useStyleProps("text");

    const {
        size,
        as = "span",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: getTextClass(size),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </Box>
    );
}

InnerText.propTypes = propTypes;

export const Text = slot("text", forwardRef((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
)));

Text.displayName = "Text";
