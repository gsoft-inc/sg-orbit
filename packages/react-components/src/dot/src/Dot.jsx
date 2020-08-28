import "./Dot.css";

import { Text } from "../../text";
import { bemify, getSizeClass2, mergeClasses } from "../../shared";
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
    size: oneOf(["tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "span"
};

export function InnerDot({
    color,
    size,
    as: ElementType,
    className,
    style,
    children,
    forwardedRef,
    ...rest
}) {
    const labelMarkup = children && (
        <Text size={size}>
            {children}
        </Text>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                bemify(
                    "o-ui-dot",
                    children && "--labeled",
                    getSizeClass2(size)
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
InnerDot.defaultProps = defaultProps;

export const Dot = forwardRef((props, ref) => (
    <InnerDot {...props} forwardedRef={ref} />
));
