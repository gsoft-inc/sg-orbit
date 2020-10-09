import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useSlot } from "../../shared";

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

export function InnerContent(props) {
    const {
        as: ElementType = "div",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "content")
    );

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

export const Content = forwardRef((props, ref) => (
    <InnerContent {...props} forwardedRef={ref} />
));
