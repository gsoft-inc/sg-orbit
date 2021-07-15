import { CheckboxGroup } from "../../checkbox";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent } from "react";
import { Group } from "../../group";
import { RadioGroup } from "../../radio";
import { arrayify, augmentElement, forwardRef, isNil, mergeProps, useEventCallback } from "../../shared";

export interface InnerTileGroupProps {
    /**
     * The value of the tile group.
     */
    value?: string[] | null;
    /**
     * The type of selection that is allowed.
     */
    selectionMode?: "none" | "single" | "multiple";
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

const GroupType = {
    "none": Group,
    "single": RadioGroup,
    "multiple": CheckboxGroup
};

export function InnerTileGroup({
    value,
    selectionMode = "none",
    rowSize = 1,
    onChange,
    disabled,
    children,
    forwardedRef,
    ...rest
}: InnerTileGroupProps) {
    const As = GroupType[selectionMode];

    const handleChange = useEventCallback((event, newValue) => {
        if (!isNil(onChange)) {
            onChange(event, arrayify(newValue));
        }
    });

    return (
        <As
            {...mergeProps<any>(
                rest,
                {
                    orientation: "horizontal",
                    // If you change the gap, also update the tile size gap (currently 16px) below.
                    gap: 4,
                    wrap: true,
                    fluid: true,
                    ref: forwardedRef
                },
                selectionMode === "none" ? {} : {
                    value,
                    onChange: handleChange,
                    disabled
                }
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    disabled: selectionMode === "none" ? disabled : undefined,
                    style: {
                        width: `calc((100% - ${(rowSize - 1) * 16}px) / ${rowSize})`
                    }
                });
            })}
        </As>
    );
}

export const TileGroup = forwardRef<InnerTileGroupProps>((props, ref) => (
    <InnerTileGroup {...props} forwardedRef={ref} />
));

export type TileGroupProps = ComponentProps<typeof TileGroup>;

TileGroup.displayName = "TileGroup";
