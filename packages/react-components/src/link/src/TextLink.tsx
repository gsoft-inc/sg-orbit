import "./Link.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, useMemo } from "react";
import { NewTabIndicator } from "./NewTabIndicator";
import { Text } from "../../text";
import { augmentElement, forwardRef, mergeProps, useSlots, useStyleProps } from "../../shared";
import { embeddedIconSize } from "../../icons";
import { useFormButton } from "../../form";
import { useLink } from "./useLink";

export interface InnerTextLinkProps {
    /**
     * The URL that the link points to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    href?: string;
    /**
     * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe). See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target?: string;
    /**
     * The relationship of the linked URL as space-separated link types. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    rel?: string;
    /**
     * The color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * The underline style.
     */
    underline?: "solid" | "dotted" | "none";
    /**
     * Whether or not this is an external link.
     */
    external?: boolean;
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A link can vary in size.
     */
    size?: "sm" | "md" | "inherit";
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerTextLink(props: InnerTextLinkProps) {
    const [styleProps] = useStyleProps("link");
    const [formProps] = useFormButton();

    const {
        target,
        rel,
        color,
        underline = "solid",
        external,
        autoFocus,
        size,
        active,
        focus,
        hover,
        visited,
        disabled,
        as: As = "a",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps,
        formProps
    );

    const { linkProps, showNewTabIndicator } = useLink({
        cssModule: "o-ui-text-link",
        color,
        underline,
        external,
        autoFocus,
        active,
        focus,
        hover,
        visited,
        disabled,
        target,
        rel,
        forwardedRef
    });

    const { "start-icon": startIcon, text, icon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        "start-icon": {
            size: embeddedIconSize(size),
            className: "o-ui-link-start-icon"
        },
        text: {
            size,
            className: "o-ui-link-text"
        },
        icon: null
    }), [size]));

    const iconMarkup = icon && augmentElement(icon, {
        size: embeddedIconSize(size),
        className: "o-ui-link-end-icon"
    });

    return (
        <As
            {...mergeProps(
                rest,
                linkProps
            )}
        >
            {startIcon}
            {text}
            {iconMarkup}
            {showNewTabIndicator && <NewTabIndicator />}
        </As>
    );
}

export const TextLink = forwardRef<InnerTextLinkProps>((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));

export type TextLinkProps = ComponentProps<typeof TextLink>;

TextLink.displayName = "TextLink";
