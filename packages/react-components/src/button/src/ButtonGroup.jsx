import { Children, cloneElement, forwardRef } from "react";
import { Stack } from "@react-components/stack";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";

const propTypes = {
    /**
     * Buttons size.
     */
    size: oneOf(["small", "medium", "large"]),
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
    as: "div"
};

export function InnerButtonGroup({ size, children, forwardedRef, ...rest }) {
    return (
        <Stack
            {...rest}
            spacing={2}
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

InnerButtonGroup.propTypes = propTypes;
InnerButtonGroup.defaultProps = defaultProps;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup { ...props } forwardedRef={ref} />
));
