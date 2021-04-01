import "./Link.css";

import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { EmbeddedIcon } from "../../icons";
import { InteractionStatesProps, augmentElement, forwardRef, mergeProps, useStyleProps } from "../../shared";
import { useLink } from "./useLink";

export interface InnerIconLinkProps extends InteractionStatesProps {
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
     * The link color accent.
     */
    color?: "primary" | "secondary" | "danger";
    /**
     * Whether or not the link content should takes additional space.
     */
    condensed?: boolean;
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
    size?: "sm" | "md";
    /**
     * Whether or not the link is disabled.
     */
    disabled?: boolean;
    /**
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
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
    title?: string;
    /**
    * @ignore
    */
    visited?: boolean;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>
}

export function InnerIconLink(props: InnerIconLinkProps) {
    const [styleProps] = useStyleProps("link");

    const {
        target,
        rel,
        title,
        color,
        condensed,
        external,
        autoFocus,
        size,
        active,
        focus,
        hover,
        visited,
        "aria-label": ariaLabel,
        as: As = "a",
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
        active,
        focus,
        hover,
        visited,
        target,
        rel,
        forwardedRef
    });

    const icon = Children.only(children) as ReactElement;

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        size
    });

    return (
        <As
            {...mergeProps(
                rest,
                {
                    title: title ?? ariaLabel,
                    "aria-label": ariaLabel
                },
                linkProps
            )}
        >
            {iconMarkup}
        </As>
    );
}

export const IconLink = forwardRef<InnerIconLinkProps>((props, ref) => (
    <InnerIconLink {...props} forwardedRef={ref} />
));

export type IconLinkProps = ComponentProps<typeof IconLink>

IconLink.displayName = "IconLink";
