import "./Link.css";

import { any, bool, elementType, number, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, useSlot } from "../../shared";
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
     * Whether the link should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
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

export function InnerLink(props) {
    const {
        external,
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
        useSlot(props, "link")
    );

    const linkProps = useLink({
        omitSize: true,
        external,
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
