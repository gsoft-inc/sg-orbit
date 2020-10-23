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

export function InnerContent({
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

InnerContent.propTypes = propTypes;

export const Content = slot("content", forwardRef((props, ref) => (
    <InnerContent {...props} forwardedRef={ref} />
)));
