import "./Link.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ReactNode, forwardRef } from "react";
import { InteractionProps, InternalProps, OmitInternalProps, SlotProps, StyledComponentProps, mergeProps } from "../../shared";
import { NewTabIndicator } from "./NewTabIndicator";
import { useLink } from "./useLink";
import { useStyleProps } from "../../styling";

export type AbstractLinkProps<T extends ElementType> =
    // Keep it so it could be used with dynamic slots.
    SlotProps &
    InternalProps &
    InteractionProps &
    Omit<StyledComponentProps<T>, "autoFocus" | "external" | "href" | "rel" | "target"> & {
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
        /**
         * @ignore
         */
        visited?: boolean;
    };

const DefaultElement = "a";

export interface InnerLinkProps extends AbstractLinkProps<typeof DefaultElement> {
    /**
     * The link shape.
     */
    shape?: "rounded" | "circular" | "box";
}

export function InnerLink(props: InnerLinkProps) {
    const [styleProps] = useStyleProps<InnerLinkProps>("link");

    const {
        active,
        as = DefaultElement,
        autoFocus,
        children,
        disabled,
        external,
        focus,
        forwardedRef,
        hover,
        rel,
        shape = "rounded",
        target,
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
