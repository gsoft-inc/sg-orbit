import { ClearSlots, SlotProvider, mergeProps, useSlot } from "../../shared";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

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
        as: ElementType = "section",
        UNSAFE_slots,
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
            <ClearSlots>
                <SlotProvider slots={UNSAFE_slots}>
                    {children}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerContent.propTypes = propTypes;

export const Content = forwardRef((props, ref) => (
    <InnerContent {...props} forwardedRef={ref} />
));
