import "./Lozenge.css";

import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    iconRight: element,
    /**
     * A lozenge can vary in size.
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
    as: "span"
};

export function InnerLozenge({ iconLeft, iconRight, size, as: ElementType, className, children, forwardedRef, ...rest }) {
    const textMarkup = (
        <span className="text">{children}</span>
    );

    const iconLeftMarkup = !isNil(iconLeft) && (
        <EmbeddedIcon size={size}>{iconLeft}</EmbeddedIcon>
    );

    const iconRightMarkup = !isNil(iconRight) && (
        <EmbeddedIcon size={size}>{iconRight}</EmbeddedIcon>
    );

    const content = (
        <>
            {iconLeftMarkup}
            {textMarkup}
            {iconRightMarkup}
        </>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui lozenge",
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
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
