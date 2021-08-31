import "./Link.css";

import { Box } from "../../box";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import { InteractionStatesProps, InternalProps, OmitInternalProps, OrbitComponentProps, augmentElement, isNil, mergeProps, useStyleProps } from "../../shared";
import { NewTabIndicator } from "./NewTabIndicator";
import { useLink } from "./useLink";

const DefaultElement = "a";

export interface InnerIconLinkProps extends InternalProps, InteractionStatesProps, OrbitComponentProps<typeof DefaultElement> {
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The link color accent.
     */
    color?: "primary" | "secondary" | "danger";
    /**
     * Whether or not the link content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the link is disabled.
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
    size?: "sm" | "md";
    /**
     * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe). See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target?: string;
    /**
    * @ignore
    */
    visited?: boolean;
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
        as = DefaultElement,
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
        active,
        autoFocus,
        color,
        cssModule: "o-ui-icon-link",
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        target,
        visited
    });

    const icon = Children.only(children) as ReactElement;

    const iconMarkup = augmentElement(condensed ? icon : <EmbeddedIcon>{icon}</EmbeddedIcon>, {
        size
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    "aria-label": ariaLabel,
                    as
                },
                linkProps
            )}
        >
            {iconMarkup}
            {showNewTabIndicator && <NewTabIndicator />}
        </Box>
    );
}

export const IconLink = forwardRef<any, OmitInternalProps<InnerIconLinkProps>>((props, ref) => (
    <InnerIconLink {...props} forwardedRef={ref} />
));

export type IconLinkProps = ComponentProps<typeof IconLink>;
