import "./Link.css";

import { AriaLabelingProps, InteractionStatesProps, augmentElement, forwardRef, isNil, mergeProps, useStyleProps } from "../../shared";
import { Box } from "../../box";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { EmbeddedIcon } from "../../icons";
import { NewTabIndicator } from "./NewTabIndicator";
import { useLink } from "./useLink";

export interface InnerIconLinkProps extends InteractionStatesProps, AriaLabelingProps {
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
        as = "a",
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

export const IconLink = forwardRef<InnerIconLinkProps>((props, ref) => (
    <InnerIconLink {...props} forwardedRef={ref} />
));

export type IconLinkProps = ComponentProps<typeof IconLink>;
