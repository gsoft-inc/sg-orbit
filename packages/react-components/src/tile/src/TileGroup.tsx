import { CheckboxGroup } from "../../checkbox";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent } from "react";
import { RadioGroup } from "../../radio";
import { augmentElement, forwardRef, mergeProps } from "../../shared";

export interface InnerTileGroupProps {
    /**
     * The type of selection that is allowed.
     */
    selectionMode?: "single" | "multiple";
    /**
     * The number of tiles per row.
     */
    rowSize?: number;
    /**
     * Called when any of the children is checked or unchecked..
     * @param {SyntheticEvent} event - React's original event.
     * @param {string[]} value - The new value.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, value: string[]) => void;
    /**
     * Whether or not the first tile of the group should autoFocus on render.
     */
    autoFocus?: boolean | number;
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
    selectionMode = "single",
    rowSize = 1,
    disabled,
    children,
    forwardedRef,
    ...rest
}: InnerTileGroupProps) {
    const Group = selectionMode === "single" ? RadioGroup : CheckboxGroup;

    const tileSize = `calc((100% - ${(rowSize - 1) * 16}px) / ${rowSize})`;

    return (
        <Group
            {...mergeProps<any>(
                rest,
                {
                    orientation: "horizontal",
                    // If you change the gap, also update the tile size gap (currently 16px).
                    gap: 4,
                    wrap: true,
                    fluid: true,
                    disabled,
                    ref: forwardedRef
                }
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    style: {
                        width: tileSize
                    }
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
