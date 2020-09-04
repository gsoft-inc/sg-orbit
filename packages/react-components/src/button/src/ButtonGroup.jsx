import { Children, forwardRef } from "react";
import { Inline } from "@react-components/layout";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement } from "../../shared";

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

export function InnerButtonGroup({
    size,
    children,
    as = "div",
    forwardedRef,
    ...rest
}) {
    return (
        <Inline
            {...rest}
            gap={2}
            as={as}
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
