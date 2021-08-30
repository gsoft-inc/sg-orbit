import "./Link.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef, useMemo } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, as, augmentElement, mergeProps, useSlots, useStyleProps } from "../../shared";
import { NewTabIndicator } from "./NewTabIndicator";
import { Text } from "../../typography";
import { embeddedIconSize } from "../../icons";
import { useFormButton } from "../../form";
import { useLink } from "./useLink";

const DefaultElement = "a";

export interface InnerTextLinkProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The color accent.
     */
    color?: "primary" | "secondary" | "danger" | "inherit";
    /**
     * @ignore
     */
    disabled?: boolean;
    /**
     * Whether or not this is an external link.
     */
    external?: boolean;
    /**
     * The URL that the link points to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    href?: string;
    /**
     * The relationship of the linked URL as space-separated link types. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    rel?: string;
    /**
     * A link can vary in size.
     */
    size?: "sm" | "md" | "inherit";
    /**
     * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe). See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target?: string;
    /**
     * The underline style.
     */
    underline?: "solid" | "dotted" | "none";
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
        as: asProp = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps,
        formProps
    );

    const { linkProps, showNewTabIndicator } = useLink({
        active,
        autoFocus,
        color,
        cssModule: "o-ui-text-link",
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        target,
        underline,
        visited
    });

    const { "start-icon": startIcon, text, icon } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: null,
        "start-icon": {
            className: "o-ui-link-start-icon",
            size: embeddedIconSize(size)
        },
        text: {
            className: "o-ui-link-text",
            size
        }
    }), [size]));

    const iconMarkup = icon && augmentElement(icon, {
        className: "o-ui-link-end-icon",
        size: embeddedIconSize(size)
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as: asProp
                },
                linkProps
            )}
        >
            {startIcon}
            {text}
            {iconMarkup}
            {showNewTabIndicator && <NewTabIndicator />}
        </Box>
    );
}

export const TextLink = forwardRef<any, OmitInternalProps<InnerTextLinkProps>>((props, ref) => (
    <InnerTextLink {...props} forwardedRef={ref} />
));

export type TextLinkProps = ComponentProps<typeof TextLink>;

/////////

export const TextLinkAsButton = as(TextLink, "button");
