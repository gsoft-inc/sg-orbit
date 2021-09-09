import "./Link.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InteractionProps, InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, mergeProps, useStyleProps } from "../../shared";
import { NewTabIndicator } from "./NewTabIndicator";
import { useLink } from "./useLink";

const DefaultElement = "a";

export interface SharedLinkProps extends
    // So it could be used with dynamic slots.
    SlotProps,
    InternalProps,
    InteractionProps,
    Omit<StyledComponentProps<typeof DefaultElement>, "autoFocus" | "external" | "href" | "rel" | "target"> {
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the link is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not this is an external link.
     */
    external?: boolean;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    href?: string;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    rel?: string;
    /**
     * See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target?: string;
}

export interface InnerLinkProps extends SharedLinkProps {
    /**
     * The link shape.
     */
    shape?: "rounded" | "circular" | "box";
}

export function InnerLink(props: InnerLinkProps) {
    const [styleProps] = useStyleProps("link");

    const {
        target,
        rel,
        external,
        shape = "rounded",
        autoFocus,
        active,
        focus,
        hover,
        disabled,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    const { linkProps, showNewTabIndicator } = useLink({
        active,
        autoFocus,
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        shape,
        target
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as
                },
                linkProps
            )}
        >
            {children}
            {showNewTabIndicator && <NewTabIndicator />}
        </Box>
    );
}

export const Link = forwardRef<any, OmitInternalProps<InnerLinkProps>>((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));

export type LinkProps = ComponentProps<typeof Link>;
