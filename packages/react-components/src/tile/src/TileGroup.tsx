import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode } from "react";
import { Group } from "../../group";
import { augmentElement, forwardRef, mergeProps } from "../../shared";

export interface InnerTileGroupProps {
    /**
     * Whether or not the tiles are disabled.
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

export function InnerTileGroup({
    disabled,
    children,
    forwardedRef,
    ...rest
}: InnerTileGroupProps) {
    return (
        <Group
            {...mergeProps<any>(
                rest,
                {
                    gap: 4,
                    wrap: true,
                    fluid: true,
                    className: "o-ui-tile-group",
                    role: "group",
                    ref: forwardedRef
                }
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    disabled
                });
            })}
        </Group>
    );
}

export const TileGroup = forwardRef<InnerTileGroupProps>((props, ref) => (
    <InnerTileGroup {...props} forwardedRef={ref} />
));

export type TileGroupProps = ComponentProps<typeof TileGroup>;

TileGroup.displayName = "TileGroup";
