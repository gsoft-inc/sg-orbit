import { AbstractLinkProps } from "./Link";
import { Box } from "../../box";
import { Children, ComponentProps, ReactElement, ReactNode, forwardRef } from "react";
import { LinkVariant, useLink } from "./useLink";
import { NewTabIndicator } from "./NewTabIndicator";
import { OmitInternalProps, as, mergeProps } from "../../shared";
import { ResponsiveProp, useStyleProps } from "../../styling";

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
     * A link can vary in size.
     */
    size?: ResponsiveProp<"sm" | "md">;
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
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
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
            {icon}
            {showNewTabIndicator && <NewTabIndicator />}
        </Box>
    );
}

InnerIconLink.defaultElement = DefaultElement;

export const IconLink = forwardRef<any, OmitInternalProps<InnerIconLinkProps>>((props, ref) => (
    <InnerIconLink {...props} forwardedRef={ref} />
));

export type IconLinkProps = ComponentProps<typeof IconLink>;

/////////

export const IconLinkAsButton = as(IconLink, "button");
export type IconLinkAsButtonProps = ComponentProps<typeof IconLinkAsButton>;
