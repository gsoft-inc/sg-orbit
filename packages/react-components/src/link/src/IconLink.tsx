import "./Link.css";

import { AriaLabelingProps, InteractionStatesProps, augmentElement, isNil, mergeProps, useStyleProps } from "../../shared";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import { NewTabIndicator } from "./NewTabIndicator";
import { useLink } from "./useLink";

const DefaultElement = "a";

export interface InnerIconLinkProps extends InteractionStatesProps, AriaLabelingProps, ComponentProps<typeof DefaultElement> {
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
     * @ignore
     */
    as?: ElementType;
    /**
     * React children.
     */
    children: ReactNode;
    /**
    * @ignore
    */
    visited?: boolean;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

export function InnerIconLink(props: InnerIconLinkProps) {
    const [styleProps] = useStyleProps("link");

    const {
        target,
        rel,
        color,
        condensed,
        external,
        autoFocus,
        size,
        active,
        focus,
        hover,
        visited,
        disabled,
        "aria-label": ariaLabel,
        as: As = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    if (isNil(ariaLabel)) {
        console.error("An icon link component must have an \"aria-label\" attribute.");
    }

    const { linkProps, showNewTabIndicator } = useLink({
        cssModule: "o-ui-icon-link",
        color,
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

    const icon = Children.only(children) as ReactElement;

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        size
    });

    return (
        <As
            {...mergeProps(
                rest,
                {
                    "aria-label": ariaLabel
                },
                linkProps
            )}
        >
            {iconMarkup}
            {showNewTabIndicator && <NewTabIndicator />}
        </As>
    );
}

export const IconLink = forwardRef<any, Omit<InnerIconLinkProps, "forwardedRef">>((props, ref) => (
    <InnerIconLink {...props} forwardedRef={ref} />
));

export type IconLinkProps = ComponentProps<typeof IconLink>;

IconLink.displayName = "IconLink";
