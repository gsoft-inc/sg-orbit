import "./FloatingBadge.css";

import { any, element, elementType, oneOfType, string } from "prop-types";
import { augmentElement, mergeClasses } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";

const propTypes = {
    badge: element.isRequired,
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
    as: "span"
};

export function InnerFloatingBadge({ badge, as: ElementType, className, children, forwardedRef, ...rest }) {
    const badgeMarkup = !isNil(badge) && augmentElement(badge, {
        className: "anchored-badge"
    });

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui floating-badge",
                className
            )}
            ref={forwardedRef}
        >
            {badgeMarkup}
            {children}
        </ElementType>
    );
}

InnerFloatingBadge.propTypes = propTypes;
InnerFloatingBadge.defaultProps = defaultProps;

export const FloatingBadge = forwardRef((props, ref) => (
    <InnerFloatingBadge {...props} forwardedRef={ref} />
));
