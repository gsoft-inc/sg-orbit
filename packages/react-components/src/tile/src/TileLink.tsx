import { ComponentProps, ReactNode, forwardRef } from "react";
import { FlexOrientation } from "../../layout";
import { Link, SharedLinkProps } from "../../link";
import { OmitInternalProps, cssModule, mergeProps } from "../../shared";
import { useTile } from "./useTile";

export interface InnerTileLinkProps extends SharedLinkProps {
    /**
     * Whether or not the tile should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The orientation of the tile.
     */
    orientation?: FlexOrientation;
}

export function InnerTileLink({
    active,
    children,
    disabled,
    focus,
    forwardedRef,
    hover,
    orientation = "vertical",
    ...rest
}: InnerTileLinkProps) {
    const { markup, tileProps } = useTile({
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


