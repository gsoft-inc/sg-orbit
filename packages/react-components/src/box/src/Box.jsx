import { elementType, oneOfType, string } from "prop-types";
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
    slot: string
};

export function InnerBox({ slot, ...props }) {
    const [slotProps] = useSlotProps(slot);

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

InnerBox.propTypes = propTypes;

export const Box = forwardRef((props, ref) => (
    <InnerBox {...props} forwardedRef={ref} />
));



