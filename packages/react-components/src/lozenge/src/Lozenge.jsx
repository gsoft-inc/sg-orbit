import "./Lozenge.css";

import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before or after the text.
     */
    icon: element,
    /**
     * An icon can appear on the left or right side of the text.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * A lozenge can vary in sizes.
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
    iconPosition: "left",
    as: "span"
};

export function InnerLozenge({ icon, iconPosition, size, as: ElementType, className, children, forwardedRef, ...rest }) {
    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon icon={icon} size={size} />
    );

    const content = (
        <>
            {iconPosition === "left" && iconMarkup}
            {children}
            {iconPosition === "right" && iconMarkup}
        </>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui lozenge",
                !isNil(iconMarkup) && "with-icon",
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {content}
        </ElementType>
    );
}

InnerLozenge.propTypes = propTypes;
InnerLozenge.defaultProps = defaultProps;

export const Lozenge = forwardRef((props, ref) => (
    <InnerLozenge { ...props } forwardedRef={ref} />
));
