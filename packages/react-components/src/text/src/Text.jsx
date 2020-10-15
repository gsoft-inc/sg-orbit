import "./Text.css";

import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeClasses, mergeProps, normalizeSize, useSlotProps, useStyleProps } from "../../shared";

export function getTextClass(size) {
    return `o-ui-text-${normalizeSize(size)}`;
}

////////

const propTypes = {
    /**
     * A text can vary in size.
     */
    size: oneOf(["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl", "inherit"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerText(props) {
    const [slotProps] = useSlotProps(props, "text");
    const [styleProps] = useStyleProps("text");

    const {
        size,
        as: ElementType = "span",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        slotProps,
        styleProps
    );

    return (
        <ElementType
            data-testid="text"
            {...rest}
            className={mergeClasses(getTextClass(size), className)}
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
