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

export function InnerHeader({ slot, ...props }) {
    const [slotProps] = useSlotProps(slot ?? "header");

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

InnerHeader.propTypes = propTypes;

export const Header = forwardRef((props, ref) => (
    <InnerHeader {...props} forwardedRef={ref} />
));
