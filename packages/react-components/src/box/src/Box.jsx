import { elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string
};

export function InnerBox({
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

InnerBox.propTypes = propTypes;

export const Box = forwardRef((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));



