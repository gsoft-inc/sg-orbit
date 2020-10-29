import "./Link.css";

import { ArrowIcon, embeddedIconSize } from "../../icons";
import { Text } from "../../text";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useMemo } from "react";
import { mergeProps, useSlots, useStyleProps } from "../../shared";
import { useFormButton } from "../../form";
import { useLink } from "./useLink";

const propTypes = {
    /**
     * The URL that the link points to.
     */
    href: string,
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
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
     * Whether the link take up the width of its container.
     */
    fluid: bool,
    /**
     * A link can vary in size.
     */
    size: oneOf(["sm", "md", "lg", "inherit"]),
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
        color,
        underline,
        external,
        autoFocus,
        autoFocusDelay,
        fluid,
        size,
        active,
        focus,
        hover,
        visited,
        target,
        rel,
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
        fluid,
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
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-link-right-icon"
        }
    }), [size]));

    return (
        <ElementType
            {...rest}
            {...linkProps}
        >
            {leftIcon}
            {text}
            {external ? <ArrowIcon /> : icon}
        </ElementType>
    );
}

InnerTextLink.propTypes = propTypes;

export const TextLink = forwardRef((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));
