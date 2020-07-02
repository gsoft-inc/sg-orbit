import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { embedButton } from "../../button";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    variant: oneOf(["solid", "outline", "transparent"]),
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    leftIcon: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    rightIcon: element,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the text.
     */
    button: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered before the text.
     */
    leftBagde: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    rightBadge: element,
    /**
     * A tag can vary in sizes.
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
    variant: "solid",
    as: "div"
};

export function InnerTag(props) {
    const { variant, leftIcon, rightIcon, button, leftBadge, rightBadge, disabled, size, as: Element, className, children, forwardedRef, ...rest } = props;

    const leftIconMarkup = !isNil(leftIcon) && (
        <EmbeddedIcon icon={leftIcon} size={size} />
    );

    const rightIconMarkup = !isNil(rightIcon) && (
        <EmbeddedIcon icon={rightIcon} size={size} />
    );

    const buttonMarkup = !isNil(button) && embedButton(button, {
        size,
        circular: true,
        ghost: true,
        secondary: true
    });

    const leftBadgeMarkup = !isNil(leftBadge) && embedBadge(leftBadge, {
        disabled,
        size
    });

    const rightBadgeMarkup = !isNil(rightBadge) && embedBadge(rightBadge, {
        disabled,
        size
    });

    const content = (
        <>
            {leftIconMarkup}{leftBadgeMarkup}
            {children}
            {buttonMarkup}{rightIconMarkup}{rightBadgeMarkup}
        </>
    );

    return (
        <Element
            {...rest}
            className={mergeClasses(
                "ui label",
                variant,
                disabled && "disabled",
                buttonMarkup && "with-button",
                leftIconMarkup && "with-left-icon",
                rightIconMarkup && "with-right-icon",
                leftBadgeMarkup && "with-left-badge",
                rightBadgeMarkup && "with-right-badge",
                getSizeClass(size),
                className
            )}
            ref={forwardedRef}
        >
            {content}
        </Element>
    );
}

InnerTag.propTypes = propTypes;
InnerTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <InnerTag { ...props } forwardedRef={ref} />
));

