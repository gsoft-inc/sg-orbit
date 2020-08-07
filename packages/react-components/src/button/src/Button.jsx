import "./Button.css";

import { EmbeddedIcon } from "../../icons";
import { SIZE, createEmbeddableAdapter, createSizeAdapterSlotFactory, mergeClasses, useSlotProps } from "../../shared";
import { any, bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useButton } from "./useButton";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost", "link"]),
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
    /**
     * The button shape.
     */
    shape: oneOf(["pill", "rounded", "circular"]),
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    iconRight: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    badge: element,
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Whether the button take up the width of its container.
     */
    fluid: bool,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in size.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
    /**
     * Called when the button is click.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onClick: func,
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

const defaultProps = {
    variant: "solid",
    shape: "pill",
    type: "button",
    as: "button"
};

export function InnerButton(props) {
    const {
        variant,
        color,
        shape,
        iconLeft,
        iconRight,
        badge,
        autoFocus,
        autoFocusDelay,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        disabled,
        as: ElementType,
        className,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "button");

    const buttonProps = useButton({
        variant,
        color,
        shape,
        autoFocus,
        autoFocusDelay,
        fluid,
        loading,
        size,
        active,
        focus,
        hover,
        disabled,
        className,
        forwardedRef
    });

    const textMarkup = (
        <span className="text">{children}</span>
    );

    const iconLeftMarkup = !isNil(iconLeft) && (
        <EmbeddedIcon size={size}>{iconLeft}</EmbeddedIcon>
    );

    const iconRightMarkup = !isNil(iconRight) && (
        <EmbeddedIcon size={size}>{iconRight}</EmbeddedIcon>
    );

    const badgeMarkup = !isNil(badge) && embedBadge(badge, {
        size,
        disabled
    });

    const content = (
        <>
            {iconLeftMarkup}
            {textMarkup}
            {iconRightMarkup}{badgeMarkup}
        </>
    );

    return (
        <ElementType
            data-testid="button"
            {...rest}
            {...buttonProps}
            className={mergeClasses(
                "o-ui button",
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
                badgeMarkup && "with-badge",
                buttonProps.className
            )}
        >
            {content}
        </ElementType>
    );
}

InnerButton.propTypes = propTypes;
InnerButton.defaultProps = defaultProps;

export const Button = forwardRef((props, ref) => (
    <InnerButton { ...props } forwardedRef={ref} />
));

export const embedButton = createEmbeddableAdapter({
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});

export const buttonSlot = createSizeAdapterSlotFactory({
    [SIZE.small]: SIZE.mini,
    [SIZE.medium]: SIZE.tiny,
    [SIZE.large]: SIZE.small
});




