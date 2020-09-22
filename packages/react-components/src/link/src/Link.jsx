import "./Link.css";

import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSizeClass, mergeClasses, useAutoFocus, useMergedRefs } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    href: string.isRequired,
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary", "danger"]),
    /**
     * Whether the link should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Whether the link take up the width of its container.
     */
    fluid: bool,
    /**
     * A link can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerLink({
    color,
    autoFocus,
    autoFocusDelay,
    fluid,
    size,
    active,
    focus,
    hover,
    as: ElementType = "a",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const linkRef = useMergedRefs(forwardedRef);

    useAutoFocus(linkRef, autoFocus, { delay: autoFocusDelay });

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-link",
                    color,
                    fluid && "fluid",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass(size)
                ),
                className
            )}
            ref={linkRef}
        >
            {children}
        </ElementType>
    );
}

InnerLink.propTypes = propTypes;

export const Link = forwardRef((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));
