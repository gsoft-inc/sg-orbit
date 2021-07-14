import { ComponentProps, ElementType, ForwardedRef, ReactNode } from "react";
import { InteractionStatesProps, forwardRef } from "../../shared";
import { Link } from "../../link";
import { mergeProps } from "../../../dist";
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
    active,
    focus,
    hover,
    as: As = Link,
    children,
    forwardedRef,
    ...rest
}: InnerTileLinkProps) {
    const { tileProps, markup } = useTile({
        variant: "link",
        active,
        focus,
        hover,
        children
    });

    return (
        <As
            {...mergeProps(
                rest,
                {
                    active,
                    focus,
                    hover,
                    ref: forwardedRef
                },
                tileProps
            )}
        >
            {markup}
        </As>
    );
}

export const TileLink = forwardRef<InnerTileLinkProps>((props, ref) => (
    <InnerTileLink {...props} forwardedRef={ref} />
));

export type TileProps = ComponentProps<typeof TileLink>;

TileLink.displayName = "TileLink";


