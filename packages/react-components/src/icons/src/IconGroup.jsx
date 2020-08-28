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

const defaultProps = {
    as: "span"
};

export function InnerIconGroup(props) {
    const {
        size,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "icon");

    return (
        <Inline
            {...rest}
            gap={1}
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
InnerIconGroup.defaultProps = defaultProps;

export const IconGroup = forwardRef((props, ref) => (
    <InnerIconGroup {...props} forwardedRef={ref} />
));
