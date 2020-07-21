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

const defaultProps = {
    as: Inline
};

export function InnerButtonGroup({ size, as: ElementType, children, forwardedRef, ...rest }) {
    return (
        <ElementType
            {...rest}
            spacing={2}
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return augmentElement(x, {
                    size
                });
            })}
        </ElementType>
    );
}

InnerButtonGroup.propTypes = propTypes;
InnerButtonGroup.defaultProps = defaultProps;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup { ...props } forwardedRef={ref} />
));
