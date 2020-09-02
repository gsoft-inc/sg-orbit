import "./Dot.css";

import { Text } from "../../text";
import { cssModule, getSizeClass3, mergeClasses, useSlotProps } from "../../shared";
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
    size: oneOf(["small", "medium", "large"]),
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
        as: ElementType = "span",
        className,
        style,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "dot");

    const labelMarkup = children && (
        <Text size={size}>
            {children}
        </Text>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-dot",
                    children && "with-label",
                    getSizeClass3(size)
                ),
                className
            )}
            style={{
                ...style,
                "--o-ui-dot-color": color && `var(--${color})`
            }}
            ref={forwardedRef}
        >
            {labelMarkup}
        </ElementType>
    );
}

InnerDot.propTypes = propTypes;

export const Dot = forwardRef((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
));

export const dotSlot = props => props;


