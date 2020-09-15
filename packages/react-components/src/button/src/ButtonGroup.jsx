import { Children, forwardRef } from "react";
import { Inline } from "@react-components/layout";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement } from "../../shared";

const propTypes = {
    /**
     * How the elements are aligned in the container along the main axis.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * How the elements are aligned in the container along the cross axis.
     */
    justify: oneOf(["start", "end", "center"]),
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid: bool,
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

export function InnerButtonGroup({
    size,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <Inline
            {...rest}
            gap={2}
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return augmentElement(x, {
                    size
                });
            })}
        </Inline>
    );
}

InnerButtonGroup.propTypes = propTypes;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
));
