import "./Link.css";

import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useStyleProps } from "../../shared";
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
     * Whether or not this is an external link.
     */
    external: bool,
    /**
     * The link shape.
     */
    shape: oneOf(["rounded", "circular", "box"]),
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the link is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerLink(props) {
    const [styleProps] = useStyleProps("link");

    const {
        target,
        rel,
        external,
        shape = "rounded",
        autoFocus,
        active,
        focus,
        hover,
        as: ElementType = "a",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    const linkProps = useLink({
        omitSize: true,
        external,
        shape,
        autoFocus,
        active,
        focus,
        hover,
        target,
        rel,
        className,
        forwardedRef
    });

    return (
        <ElementType
            {...mergeProps(
                rest,
                linkProps
            )}
        >
            {children}
        </ElementType>
    );
}

InnerLink.propTypes = propTypes;

export const Link = forwardRef((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));

Link.displayName = "Link";
