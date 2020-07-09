import "./IconGroup.css";

import { Children, cloneElement, forwardRef } from "react";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * Size of the group icons.
     */
    size: string,
    /**
     * Spacing between each icons. Accepts any [spacing variables](?path=/docs/materials-spacing--page#values) without the "--scale-" part e.g. "alpha" for "--scale-alpha".
     */
    spacing: oneOf(["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliett", "kilo", "lima", "mike"]),
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
    spacing: "alpha",
    as: "span"
};

export function InnerIconGroup({ size, spacing, as: ElementType, className, style, children, forwardedRef, ...rest }) {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui icon-group",
                className
            )}
            style={{
                "--spacing": `var(--scale-${spacing})`,
                ...style
            }}
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return cloneElement(x, {
                    size
                });
            })}
        </ElementType>
    );
}

InnerIconGroup.propTypes = propTypes;
InnerIconGroup.defaultProps = defaultProps;

export const IconGroup = forwardRef((props, ref) => (
    <InnerIconGroup { ...props } forwardedRef={ref} />
));
