import { Children, cloneElement, forwardRef } from "react";
import { Stack } from "../../stack";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";

const propTypes = {
    /**
     * Size of the group icons.
     */
    size: string,
    /**
     * Spacing between each icons. Accepts any [spacing variables](?path=/docs/materials-spacing--page#values) without the "--scale-" part e.g. "alpha" for "--scale-alpha".
     */
    spacing: oneOf(["alpha", "bravo", "charlie", "delta", "echo", "foxtrot", "golf", "hotel", "india", "juliett", "kilo", "lima", "mike"]),
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
    spacing: "alpha",
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
