import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { slot } from "../../shared";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerHeader({
    as: ElementType = "div",
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <ElementType
            {...rest}
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerHeader.propTypes = propTypes;

export const Header = slot("header", forwardRef((props, ref) => (
    <InnerHeader {...props} forwardedRef={ref} />
)));
