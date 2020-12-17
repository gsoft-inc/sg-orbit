import "./Heading.css";

import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, mergeProps, normalizeSize, useStyleProps } from "../../shared";
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
        className,
        color,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-heading",
                    normalizeSize(size),
                    color ? "color-inherit" : ""
                ),
                className
            )}
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerHeading.propTypes = propTypes;

export const Heading = forwardRef((props, ref) => (
    <InnerHeading {...props} forwardedRef={ref} />
));
