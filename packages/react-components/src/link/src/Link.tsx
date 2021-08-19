import "./Link.css";

import { ComponentProps, ElementType, ForwardedRef, ReactNode, forwardRef } from "react";
import { NewTabIndicator } from "./NewTabIndicator";
import { mergeProps, useStyleProps } from "../../shared";
import { useLink } from "./useLink";

const defaultElement = "a";

export interface InnerLinkProps extends ComponentProps<typeof defaultElement>{
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
     * Whether or not this is an external link.
     */
    external?: boolean;
    /**
     * The link shape.
     */
    shape?: "rounded" | "circular" | "box";
    /**
     * Whether or not the link should autoFocus on render.
     */
    autoFocus?: boolean | number;
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
    forwardedRef: ForwardedRef<any>;
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
        as: As = defaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        styleProps
    );

    const { linkProps, showNewTabIndicator } = useLink({
        external,
        shape,
        autoFocus,
        active,
        focus,
        hover,
        target,
        disabled,
        rel,
        forwardedRef
    });

    return (
        <As
            {...mergeProps(
                rest,
                linkProps
            )}
        >
            {children}
            {showNewTabIndicator && <NewTabIndicator />}
        </As>
    );
}

export const Link = forwardRef<any, Omit<InnerLinkProps, "forwardedRef">>((props, ref) => (
    <InnerLink {...props} forwardedRef={ref} />
));

export type LinkProps = ComponentProps<typeof Link>;

Link.displayName = "Link";
