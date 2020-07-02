import { EmbeddedIcon } from "../../icons";
import { any, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { embedButton } from "../../button";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "transparent"]),
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    iconRight: element,
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the text.
     */
    button: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered before the text.
     */
    badgeLeft: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    badgeRight: element,
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
    const { variant, iconLeft, iconRight, button, badgeLeft, badgeRight, disabled, size, as: Element, className, children, forwardedRef, ...rest } = props;

    const iconLeftMarkup = !isNil(iconLeft) && (
        <EmbeddedIcon icon={iconLeft} size={size} />
    );

    const iconRightMarkup = !isNil(iconRight) && (
        <EmbeddedIcon icon={iconRight} size={size} />
    );

    const buttonMarkup = !isNil(button) && embedButton(button, {
        size,
        circular: true,
        ghost: true,
        secondary: true
    });

    const badgeLeftMarkup = !isNil(badgeLeft) && embedBadge(badgeLeft, {
        disabled,
        size
    });

    const badgeRightMarkup = !isNil(badgeRight) && embedBadge(badgeRight, {
        disabled,
        size
    });

    const content = (
        <>
            {iconLeftMarkup}{badgeLeftMarkup}
            {children}
            {buttonMarkup}{iconRightMarkup}{badgeRightMarkup}
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
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
                badgeLeftMarkup && "with-left-badge",
                badgeRightMarkup && "with-right-badge",
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

