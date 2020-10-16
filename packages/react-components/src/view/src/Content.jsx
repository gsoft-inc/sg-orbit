import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useSlotProps } from "../../shared";

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

export function InnerContent({ slot, ...props }) {
    const [slotProps] = useSlotProps(slot ?? "content");

    const {
        as: ElementType = "div",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        slotProps
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
