import { CheckboxGroup } from "../../checkbox";
import { Children, ComponentProps, ElementType, ForwardedRef, ReactElement, ReactNode, SyntheticEvent, forwardRef as reactForwardRef } from "react";
import { Group, GroupProps } from "../../group";
import { RadioGroup } from "../../radio";
import { arrayify, augmentElement, forwardRef, isNil, isNumber, mergeProps, useAutoFocusChild, useEventCallback, useFocusManager, useFocusScope, useMergedRefs } from "../../shared";

export interface InnerTileGroupProps {
    /**
     * The value of the tile group.
     */
    value?: string[] | null;
    /**
     * The initial value of `value`.
     */
    defaultValue?: string[];
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

// @ts-ignore
export interface UnselectableGroupProps extends GroupProps {
    autoFocus?: boolean | number;
}

const UnselectableGroup = reactForwardRef(({ autoFocus, children, ...rest }: UnselectableGroupProps, ref) => {
    const [focusScope, setFocusRef] = useFocusScope();

    const groupRef = useMergedRefs(setFocusRef, ref);

    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(focusManager, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    return (
        <Group
            {...rest}
            ref={groupRef}
        >
            {children}
        </Group>
    );
});

const GroupType = {
    "none": UnselectableGroup,
    "single": RadioGroup,
    "multiple": CheckboxGroup
};

function denormalizeValue(value: string[] | null, selectionMode: "single" | "multiple") {
    if (!isNil(value) && selectionMode === "single") {
        return value[0];
    }

    return value;
}

export function InnerTileGroup({
    value,
    defaultValue,
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
                    value: denormalizeValue(value, selectionMode),
                    defaultValue: denormalizeValue(defaultValue, selectionMode),
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
