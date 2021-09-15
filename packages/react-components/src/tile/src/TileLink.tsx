import { AbstractLinkProps, Link } from "../../link";
import { ComponentProps, forwardRef } from "react";
import { FlexOrientation } from "../../layout";
import { OmitInternalProps, cssModule, mergeProps } from "../../shared";
import { useTile } from "./useTile";

const DefaultElement = "a";

export interface InnerTileLinkProps extends AbstractLinkProps<typeof DefaultElement> {
    /**
     * The orientation of the tile.
     */
    orientation?: FlexOrientation;
}

export function InnerTileLink({
    active,
    as = DefaultElement,
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
                    as,
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


