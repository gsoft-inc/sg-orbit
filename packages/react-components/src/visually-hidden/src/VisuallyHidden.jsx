import "./VisuallyHidden.css";

import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerVisuallyHidden({
    as: ElementType = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui visually-hidden",
                className
            )}
            aria-hidden="true"
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerVisuallyHidden.propTypes = propTypes;

export const VisuallyHidden = forwardRef((props, ref) => (
    <InnerVisuallyHidden {...props} forwardedRef={ref} />
));

