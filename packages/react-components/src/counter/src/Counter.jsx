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
    color: oneOf(["light"]),
    /**
     * Whether to add emphasis on the value or not.
     */
    highlight: bool,
    /**
     * Whether to reverse counter elements order or not.
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

export function InnerCounter(props) {
    const {
        variant = "pill",
        color,
        highlight,
        reverse,
        size,
        as: ElementType = "span",
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
                    highlight && "highlight",
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

export const Counter = forwardRef((props, ref) => (
    <InnerCounter {...props} forwardedRef={ref} />
));
