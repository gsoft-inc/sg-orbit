import { ComponentProps, ReactNode, forwardRef } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, cssModule, mergeProps } from "../../shared";
import { Link, LinkProps } from "../../link";
import { useTile } from "./useTile";

export interface InnerTileLinkProps extends InternalProps, InteractionStatesProps, LinkProps {
    /**
     * Whether or not the tile should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * Whether or not the tile is disabled.
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
     * The orientation of the tile.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * The relationship of the linked URL as space-separated link types. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    rel?: string;
    /**
     * Where to display the linked URL, as the name for a browsing context (a tab, window, or iframe). See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a).
     */
    target?: string;
}

export function InnerTileLink({
    orientation = "vertical",
    disabled,
    active,
    focus,
    hover,
    children,
    forwardedRef,
    ...rest
}: InnerTileLinkProps) {
    const { tileProps, markup } = useTile({
        active,
        children,
        focus,
        hover,
        orientation,
        variant: "link"
    });

    return (
        <Link
            {...mergeProps(
                rest,
                {
                    active,
                    className: cssModule(
                        "o-ui-tile-link",
                        disabled && "disabled"
                    ),
                    disabled,
                    focus,
                    hover,
                    ref: forwardedRef
                },
                tileProps
            )}
        >
            {markup}
        </Link>
    );
}

export const TileLink = forwardRef<any, OmitInternalProps<InnerTileLinkProps>>((props, ref) => (
    <InnerTileLink {...props} forwardedRef={ref} />
));

export type TileLinkProps = ComponentProps<typeof TileLink>;


