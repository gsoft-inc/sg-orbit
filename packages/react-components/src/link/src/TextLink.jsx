import "./Link.css";

import { ArrowIcon, embeddedIconSlot } from "../../icons";
import { ClearSlots, SlotProvider, mergeProps, useSlot, useTextContent } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
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
    size: oneOf(["sm", "md", "lg", "inherit"]),
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

export function InnerTextLink(props) {
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
        useSlot(props, "link"),
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

    let content = useTextContent(Text, children);

    if (external) {
        content = (
            <>
                {content}
                <ArrowIcon />
            </>
        );
    }

    return (
        <ElementType
            data-testid="text-link"
            {...rest}
            {...linkProps}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: {
                            size,
                            className: "o-ui-link-text"
                        },
                        icon: embeddedIconSlot({
                            size,
                            className: "o-ui-link-icon"
                        })
                    }}
                >
                    {content}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerTextLink.propTypes = propTypes;

export const TextLink = forwardRef((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));
