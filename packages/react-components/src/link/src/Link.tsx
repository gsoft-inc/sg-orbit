import "./Link.css";

import { Box } from "../../box";
import { ComponentProps, ReactNode, forwardRef } from "react";
import { InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps, useStyleProps } from "../../shared";
import { NewTabIndicator } from "./NewTabIndicator";
import { useLink } from "./useLink";

const DefaultElement = "a";

export interface InnerLinkProps extends InternalProps, OrbitComponentProps<typeof DefaultElement> {
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
     * The URL that the link points to. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    href?: string;
    /**
     * The relationship of the linked URL as space-separated link types. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    rel?: string;
    /**
     * The link shape.
     */
    shape?: "rounded" | "circular" | "box";
    /**
     * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe). See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target?: string;
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
