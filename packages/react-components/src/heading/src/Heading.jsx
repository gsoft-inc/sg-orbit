import "./Heading.css";

import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeProps, normalizeSize, useStyleProps } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A heading can vary in size.
     */
    size: oneOf(["2xs", "xs", "sm", "md", "lg", "xl"]),
    /**
     * A heading can change it's default color.
     */
    color: oneOf(["inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerHeading(props) {
    const [styleProps] = useStyleProps("heading");

    const {
        size,
        as: ElementType = "div",
        children,
        color,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <ElementType
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-heading",
                        color ? "color-inherit" : "",
                        normalizeSize(size)
                    ),
                    ref: forwardedRef
                }
            )}
        >
            {children}
        </ElementType>
    );
}

InnerHeading.propTypes = propTypes;

export const Heading = forwardRef((props, ref) => (
    <InnerHeading {...props} forwardedRef={ref} />
));

Heading.displayName = "Heading";
