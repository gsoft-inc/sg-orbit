import { Children, cloneElement, forwardRef } from "react";
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

export function InnerIconGroup({ size, children, forwardedRef, ...rest }) {
    return (
        <Inline
            {...rest}
            spacing={1}
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return cloneElement(x, {
                    size
                });
            })}
        </Inline>
    );

}

InnerIconGroup.propTypes = propTypes;
InnerIconGroup.defaultProps = defaultProps;

export const IconGroup = forwardRef((props, ref) => (
    <InnerIconGroup { ...props } forwardedRef={ref} />
));
