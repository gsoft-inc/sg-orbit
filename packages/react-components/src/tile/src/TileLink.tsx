import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { InteractionStatesProps, cssModule, forwardRef, mergeProps } from "../../shared";
import { Link } from "../../link";
import { useTile } from "./useTile";

export interface InnerTileLinkProps extends InteractionStatesProps {
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
     * The orientation of the tile.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Whether or not this is an external link.
     */
    external?: boolean;
    /**
     * Whether or not the tile should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the tile is disabled.
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
    forwardedRef: ForwardedRef<any>;
}

export function InnerTileLink({
    orientation,
    disabled,
    active,
    focus,
    hover,
    children,
    forwardedRef,
    ...rest
}: InnerTileLinkProps) {
    const { tileProps, markup } = useTile({
        variant: "link",
        orientation,
        active,
        focus,
        hover,
        children
    });

    return (
        <Link
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-tile-link",
                        disabled && "disabled"
                    ),
                    active,
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

export const TileLink = forwardRef<InnerTileLinkProps>((props, ref) => (
    <InnerTileLink {...props} forwardedRef={ref} />
));

export type TileLinkProps = ComponentProps<typeof TileLink>;

TileLink.displayName = "TileLink";


