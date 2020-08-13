import "./Counter.css";

import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";

/*
TODO:
    - reverse
*/

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["pill", "divider"]),
    /**
     * The color accent.
     */
    color: oneOf(["light"]),
    /**
     * A counter can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    variant: "pill",
    as: "span"
};

export function InnerCounter({
    variant,
    color,
    size,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui counter",
                variant,
                color,
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerCounter.propTypes = propTypes;
InnerCounter.defaultProps = defaultProps;

export const Counter = forwardRef((props, ref) => (
    <InnerCounter {...props} forwardedRef={ref} />
));
