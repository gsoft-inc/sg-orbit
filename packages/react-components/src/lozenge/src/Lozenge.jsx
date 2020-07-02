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
    leftIcon: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    rightIcon: element,
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
    as: "span"
};

export function InnerLozenge({ leftIcon, rightIcon, size, as: ElementType, className, children, forwardedRef, ...rest }) {
    const leftIconMarkup = !isNil(leftIcon) && (
        <EmbeddedIcon icon={leftIcon} size={size} />
    );

    const rightIconMarkup = !isNil(rightIcon) && (
        <EmbeddedIcon icon={rightIcon} size={size} />
    );

    const content = (
        <>
            {leftIconMarkup}
            {children}
            {rightIconMarkup}
        </>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui lozenge",
                leftIconMarkup && "with-left-icon",
                rightIconMarkup && "with-right-icon",
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
