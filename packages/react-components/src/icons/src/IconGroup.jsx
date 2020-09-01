import { Children, cloneElement, forwardRef } from "react";
import { ClearSlots, useSlotProps } from "../../shared";
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

export function InnerIconGroup(props) {
    const {
        size,
        disabled,
        children,
        as = "span",
        forwardedRef,
        ...rest
    } = useSlotProps(props, "icon");

    return (
        <Inline
            {...rest}
            gap={1}
            as={as}
            ref={forwardedRef}
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

InnerIconGroup.propTypes = propTypes;

export const IconGroup = forwardRef((props, ref) => (
    <InnerIconGroup {...props} forwardedRef={ref} />
));
