import { Children, cloneElement, forwardRef } from "react";
import { Stack } from "../../stack";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";

const propTypes = {
    /**
     * Size of the icons.
     */
    size: string,
    /**
     * Spacing scale between each elements.
     */
    spacing: oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
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
    spacing: 1,
    as: "span"
};

export function InnerIconGroup({ size, children, forwardedRef, ...rest }) {
    return (
        <Stack
            {...rest}
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return cloneElement(x, {
                    size
                });
            })}
        </Stack>
    );

}

InnerIconGroup.propTypes = propTypes;
InnerIconGroup.defaultProps = defaultProps;

export const IconGroup = forwardRef((props, ref) => (
    <InnerIconGroup { ...props } forwardedRef={ref} />
));
