import "./Link.css";

import { ArrowIcon, embeddedIconSize } from "../../icons";
import { Text } from "../../text";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, useSlots, useStyleProps } from "../../shared";
import { forwardRef, useMemo } from "react";
import { useFormButton } from "../../form";
import { useLink } from "./useLink";

const propTypes = {
    /**
     * The URL that the link points to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    href: string,
    /**
     * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe). See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target: string,
    /**
     * The relationship of the linked URL as space-separated link types. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    rel: string,
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger", "inherit"]),
    /**
     * The underline style.
     */
    underline: oneOf(["solid", "dotted"]),
    /**
     * Whether or not this is an external link.
     */
    external: bool,
    /**
     * Whether the link should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A link can vary in size.
     */
    size: oneOf(["sm", "md", "inherit"]),
    /**
     * Whether or not the link is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerTextLink(props) {
    const [styleProps] = useStyleProps("link");
    const [formProps] = useFormButton();

    const {
        target,
        rel,
        color,
        underline,
        external,
        autoFocus,
        autoFocusDelay,
        size,
        active,
        focus,
        hover,
        visited,
        as: ElementType = "a",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps,
        formProps
    );

    const linkProps = useLink({
        cssModule: "o-ui-text-link",
        color,
        underline,
        external,
        autoFocus,
        autoFocusDelay,
        size,
        active,
        focus,
        hover,
        visited,
        target,
        rel,
        className,
        forwardedRef
    });

    const { "left-icon": leftIcon, text, icon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        "left-icon": {
            size: embeddedIconSize(size),
            className: "o-ui-link-left-icon"
        },
        text: {
            size,
            className: "o-ui-link-text"
        },
        icon: null
    }), [size]));

    const iconElement = external ? <ArrowIcon /> : icon;

    const iconMarkup = iconElement && augmentElement(iconElement, {
        size: embeddedIconSize(size),
        className: "o-ui-link-right-icon"
    });

    return (
        <ElementType
            {...rest}
            {...linkProps}
        >
            {leftIcon}
            {text}
            {iconMarkup}
        </ElementType>
    );
}

InnerTextLink.propTypes = propTypes;

export const TextLink = forwardRef((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));
