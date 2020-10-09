import "./Link.css";

import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useContentStyle } from "../../shared";
import { useLink } from "./useLink";

const propTypes = {
    /**
     * The URL that the link points to.
     */
    href: string,
    /**
     * Whether or not this is an external link.
     */
    external: bool,
    /**
     * The link shape.
     */
    shape: oneOf(["rounded", "circular", "box"]),
    /**
     * Whether the link should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerLink(props) {
    const {
        external,
        shape = "rounded",
        autoFocus,
        autoFocusDelay,
        active,
        focus,
        hover,
        target,
        rel,
        as: ElementType = "a",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        useContentStyle("link")
    );

    const linkProps = useLink({
        omitSize: true,
        external,
        shape,
        autoFocus,
        autoFocusDelay,
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
            data-testid="link"
            {...rest}
            {...linkProps}
        >
            {children}
        </ElementType>
    );
}

InnerLink.propTypes = propTypes;

export const Link = forwardRef((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));
