import "./Link.css";

import { ArrowIcon, iconSlot } from "../../icons";
import { ClearSlots, SlotProvider, mergeProps, useSlot, useTextContent } from "../../shared";
import { Text, textSlot } from "../../text";
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
     * @ignore
     */
    children: any.isRequired
};

export function InnerLink(props) {
    const slotProps = useSlot("link");
    const formProps = useFormButton();

    const {
        color,
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
        slotProps,
        formProps
    );

    const linkProps = useLink({
        cssModule: "o-ui-link",
        color,
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
                <ArrowIcon className="rotate-315" />
            </>
        );
    }

    return (
        <ElementType
            data-testid="link"
            {...rest}
            {...linkProps}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: textSlot({
                            size,
                            className: "o-ui-link-text"
                        }),
                        icon: iconSlot({
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

InnerLink.propTypes = propTypes;

export const Link = forwardRef((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));

export const linkSlot = props => props;
