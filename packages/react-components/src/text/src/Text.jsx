import "./Text.css";

import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSizeClass, mergeClasses, useSlotProps } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerText(props) {
    const {
        size,
        as: ElementType = "span",
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "text");

    return (
        <ElementType
            data-testid="text"
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-text",
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            {children}
        </ElementType>
    );
}

InnerText.propTypes = propTypes;

export const Text = forwardRef((props, ref) => (
    <InnerText {...props} forwardedRef={ref} />
));

export const textSlot = props => props;
