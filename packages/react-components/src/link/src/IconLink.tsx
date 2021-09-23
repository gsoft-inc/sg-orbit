import "./Link.css";

import { AbstractLinkProps } from "./Link";
import { Box } from "../../box";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { EmbeddedIcon } from "../../icons";
import { LinkVariant, useLink } from "./useLink";
import { NewTabIndicator } from "./NewTabIndicator";
import { OmitInternalProps, as, augmentElement, mergeProps, useStyleProps } from "../../shared";

const DefaultElement = "a";

export interface InnerIconLinkProps extends AbstractLinkProps<typeof DefaultElement> {
    /**
     * See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the link content should takes additional space.
     */
    condensed?: boolean;
    /**
     * A link can vary in size.
     */
    size?: "sm" | "md";
    /**
     * The link style to use.
     */
    variant?: LinkVariant;
}

export function InnerIconLink(props: InnerIconLinkProps) {
    const [styleProps] = useStyleProps<InnerIconLinkProps>("link");

    const {
        active,
        "aria-label": ariaLabel,
        as: asProp = DefaultElement,
        autoFocus,
        children,
        condensed,
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        size,
        target,
        visited,
        variant,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    const { linkProps, showNewTabIndicator } = useLink({
        active,
        autoFocus,
        cssModule: "o-ui-icon-link",
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        target,
        variant,
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
                    as: asProp
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

/////////

export const IconLinkAsButton = as(IconLink, "button");
