import "./Link.css";

import { Children, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, useStyleProps } from "../../shared";
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
     * The link color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
    /**
     * Whether or not the link content should takes additional space.
     */
    condensed: bool,
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
    size: oneOf(["sm", "md"]),
    /**
     * Whether or not the link is disabled.
     */
    disabled: bool,
    /**
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerIconLink(props) {
    const [styleProps] = useStyleProps("link");

    const {
        target,
        rel,
        title,
        color,
        condensed,
        external,
        autoFocus,
        autoFocusDelay,
        size,
        active,
        focus,
        hover,
        visited,
        as: ElementType = "a",
        "aria-label": ariaLabel,
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    const linkProps = useLink({
        cssModule: "o-ui-icon-link",
        color,
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

    const icon = Children.only(children);

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        size
    });

    return (
        <ElementType
            {...rest}
            {...linkProps}
            title={title ?? ariaLabel}
            aria-label={ariaLabel}
        >
            {iconMarkup}
        </ElementType>
    );
}

InnerIconLink.propTypes = propTypes;

export const IconLink = forwardRef((props, ref) => (
    <InnerIconLink {...props} forwardedRef={ref} />
));
