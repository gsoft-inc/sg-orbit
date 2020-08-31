import "./Counter.css";

import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSizeClass3, mergeClasses, useSlotProps } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["pill", "divider"]),
    /**
     * The color accent.
     */
    color: oneOf(["light", "bold"]),
    /**
     * Reverse counter elements order.
     */
    reverse: bool,
    /**
     * A counter can vary in size.
     */
    size: oneOf(["tiny", "small", "medium", "large"]),
    /**
     * Default slot override.
     */
    slot: string,
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

export function InnerCounter(props) {
    const {
        variant,
        color,
        reverse,
        size,
        as: ElementType,
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "counter");

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-counter",
                    variant,
                    color && color,
                    reverse && "reverse",
                    getSizeClass3(size)
                ),
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
