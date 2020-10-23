import { Children, cloneElement, forwardRef } from "react";
import { Inline } from "../../layout";
import { any, elementType, oneOfType, string } from "prop-types";
import { slot } from "../../shared";

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

export function InnerIconList({
    size,
    disabled,
    children,
    as = "span",
    forwardedRef,
    ...rest
}) {
    return (
        <Inline
            {...rest}
            gap={1}
            as={as}
            ref={forwardedRef}
            aria-hidden="true"
        >
            {Children.map(children, x => {
                return cloneElement(x, {
                    size,
                    disabled
                });
            })}
        </Inline>
    );
}

InnerIconList.propTypes = propTypes;

export const IconList = slot("icon", forwardRef((props, ref) => (
    <InnerIconList {...props} forwardedRef={ref} />
)));
