import { Children, cloneElement, forwardRef } from "react";
import { ClearSlots, mergeProps, useSlot } from "../../shared";
import { Inline } from "../../layout";
import { any, elementType, oneOfType, string } from "prop-types";

const propTypes = {
    /**
     * Size of the icons.
     */
    size: string,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerIconList(props) {
    const {
        size,
        disabled,
        children,
        as = "span",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useSlot(props, "icon")
    );

    return (
        <Inline
            {...rest}
            gap={1}
            as={as}
            ref={forwardedRef}
            aria-hidden="true"
        >
            <ClearSlots>
                {Children.map(children, x => {
                    return cloneElement(x, {
                        size,
                        disabled
                    });
                })}
            </ClearSlots>
        </Inline>
    );
}

InnerIconList.propTypes = propTypes;

export const IconList = forwardRef((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
));
