import "./Tag.css";

import { EmbeddedIcon } from "../../icons";
import { any, bool, element, elementType, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { embedButton } from "../../button";
import { forwardRef } from "react";
import { getSizeClass, mergeClasses } from "../../shared";
import { isNil } from "lodash";

// TODO:
//  - iconLeft & iconRight -> icon (always to the left)
//  - badge -> dot (left) & counter (right)

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline"]),
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
     * Whether the tag take up the width of its container.
     */
    fluid: bool,
    /**
     * A tag can vary in size.
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

export function InnerTag({
    variant,
    iconLeft,
    iconRight,
    button,
    badgeLeft,
    badgeRight,
    disabled,
    fluid,
    size,
    active,
    focus,
    hover,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const textMarkup = (
        <span className="text">{children}</span>
    );

    const iconLeftMarkup = !isNil(iconLeft) && (
        <EmbeddedIcon size={size}>{iconLeft}</EmbeddedIcon>
    );

    const iconRightMarkup = !isNil(iconRight) && (
        <EmbeddedIcon size={size}>{iconRight}</EmbeddedIcon>
    );

    const buttonMarkup = !isNil(button) && embedButton(button, {
        size,
        variant: "ghost",
        color: "secondary",
        shape: "circular"
    });

    const badgeLeftMarkup = !isNil(badgeLeft) && embedBadge(badgeLeft, {
        disabled,
        highlight: true,
        size
    });

    const badgeRightMarkup = !isNil(badgeRight) && embedBadge(badgeRight, {
        disabled,
        highlight: true,
        size
    });

    const content = (
        <>
            {iconLeftMarkup}{badgeLeftMarkup}
            {textMarkup}
            {buttonMarkup}{iconRightMarkup}{badgeRightMarkup}
        </>
    );

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui tag",
                variant,
                buttonMarkup && "with-button",
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
                badgeLeftMarkup && "with-left-badge",
                badgeRightMarkup && "with-right-badge",
                fluid && "fluid",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className
            )}
            disabled={disabled}
            ref={forwardedRef}
        >
            {content}
        </ElementType>
    );
}

InnerTag.propTypes = propTypes;
InnerTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

