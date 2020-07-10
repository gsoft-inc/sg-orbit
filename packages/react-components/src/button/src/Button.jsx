import "./Button.css";

import { EmbeddedIcon } from "../../icons";
import { SIZE, createEmbeddableAdapter, getSizeClass, mergeClasses, useAutofocus, useMergedRefs } from "../../shared";
import { any, bool, element, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef, useCallback } from "react";
import { isNil } from "lodash";

// TODO:
// - compact (TBD)

// - VARIANT icon
// - Size -> Might be good with "tiny", "small", "medium", "large"


// Should we have a separated button icon since they don't have anything in common? IconButton
// Excepts:
//  - the variants
//  - the autofocus
//  - the loading
//  - the size
//  - the type
//  -> Since a circular button only make sense for an icon button we could remove this variant for default button.
//  -> Otherwise a variant="icon" button could always be circular and we remove the circular prop. <- FALSE

// -> Button Group? OUT? Probably not

// -> ToggleButton - Used in Apricot groups.
// -> ToggleButtonGroup -> checkbox / radio (exclusive)

// Docs & Test
//  - Show support for IconGroup

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost", "link"]),
    /**
     * Color accent to use.
     */
    color: oneOf(["primary", "secondary"]),
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    iconRight: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered before the text.
     */
    badgeLeft: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    badgeRight: element,
    /**
     * Whether or not the button should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * Whether or not the button take up the width of its container.
     */
    fluid: bool,
    /**
     * A button can have a circular form.
     */
    circular: bool,
    /**
     * A button can show a loading indicator.
     */
    loading: bool,
    /**
     * A button can vary in sizes.
     */
    size: oneOf(["mini", "tiny", "small", "medium", "large"]),
    /**
     * The button type.
     */
    type: oneOf(["button", "submit", "reset"]),
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
    type: "button",
    as: "button"
};

export function InnerButton({
    variant,
    color,
    iconLeft,
    iconRight,
    badgeLeft,
    badgeRight,
    autofocus,
    autofocusDelay,
    fluid,
    circular,
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
}) {
    const ref = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(ref.current)) {
            ref.current.focus();
        }
    }, [ref]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const iconLeftMarkup = !isNil(iconLeft) && (
        <EmbeddedIcon size={size}>{iconLeft}</EmbeddedIcon>
    );

    const iconRightMarkup = !isNil(iconRight) && (
        <EmbeddedIcon size={size}>{iconRight}</EmbeddedIcon>
    );

    const badgeLeftMarkup = !isNil(badgeLeft) && embedBadge(badgeLeft, {
        size,
        highlight: true,
        disabled
    });

    const badgeRightMarkup = !isNil(badgeRight) && embedBadge(badgeRight, {
        size,
        highlight: true,
        disabled
    });

    const content = (
        <>
            {iconLeftMarkup}{badgeLeftMarkup}
            {children}
            {iconRightMarkup}{badgeRightMarkup}
        </>
    );

    return (
        <ElementType
            data-testid="button"
            {...rest}
            {...autofocusProps}
            className={mergeClasses(
                variant,
                color && color,
                iconLeftMarkup && "with-left-icon",
                iconRightMarkup && "with-right-icon",
                badgeLeftMarkup && "with-left-badge",
                badgeRightMarkup && "with-right-badge",
                fluid && "fluid",
                circular && "circular",
                loading && "loading",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className)
            }
            disabled={disabled}
            ref={ref}
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




