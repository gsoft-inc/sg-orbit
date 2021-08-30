import { Box } from "../../box";
import { CheckboxGroup } from "../../checkbox";
import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { Group, GroupProps } from "../../group";
import {
    InternalProps,
    OmitInternalProps,
    OrbitComponentProps,
    SlotProps,
    arrayify,
    augmentElement,
    isNil,
    isNumber,
    mergeProps,
    useAutoFocusChild,
    useEventCallback,
    useFocusManager,
    useFocusScope,
    useMergedRefs
} from "../../shared";
import { RadioGroup } from "../../radio";

export interface InnerTileGroupProps extends SlotProps, InternalProps, Omit<OrbitComponentProps<"div">, "autoFocus" | "onChange"> {
    /**
      * Whether or not the first tile of the group should autoFocus on render.
      */
    autoFocus?: boolean | number;
    /**
      * React children.
      */
    children: ReactNode;
    /**
      * The initial value of `value`.
      */
    defaultValue?: string[];
    /**
      * Whether or not the tiles are disabled.
      */
    disabled?: boolean;
    /**
      * Called when any of the children is checked or unchecked..
      * @param {SyntheticEvent} event - React's original event.
      * @param {string[]} value - The new value.
      * @returns {void}
      */
    onChange?: (event: SyntheticEvent, value: string[]) => void;
    /**
      * The orientation of the group tiles.
      */
    orientation?: "horizontal" | "vertical";
    /**
      * The number of tiles per row.
      */
    rowSize?: number;
    /**
      * The type of selection that is allowed.
      */
    selectionMode?: "none" | "single" | "multiple";
    /**
     * The value of the tile group.
     */
    value?: string[] | null;
}

export interface UnselectableGroupProps extends GroupProps {
    autoFocus?: boolean | number;
}

const UnselectableGroup = forwardRef<HTMLElement, UnselectableGroupProps>(({ autoFocus, children, ...rest }, ref) => {
    const [focusScope, setFocusRef] = useFocusScope();

    const groupRef = useMergedRefs(setFocusRef, ref);

    const focusManager = useFocusManager(focusScope);

    useAutoFocusChild(focusManager, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
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
    "multiple": CheckboxGroup,
    "none": UnselectableGroup,
    "single": RadioGroup
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
    orientation,
    disabled,
    children,
    forwardedRef,
    ...rest
}: InnerTileGroupProps) {
    const as = GroupType[selectionMode];

    const handleChange = useEventCallback((event, newValue) => {
        if (!isNil(onChange)) {
            onChange(event, arrayify(newValue));
        }
    });

    return (
        <Box
            {...mergeProps<any>(
                rest,
                {

                    as,


                    fluid: true,
                    // If you change the gap, also update the tile size gap (currently 16px) below.
                    gap: 4,
                    orientation: "horizontal",
                    ref: forwardedRef,
                    wrap: true
                },
                selectionMode === "none" ? {} : {
                    defaultValue: denormalizeValue(defaultValue, selectionMode),
                    disabled,
                    onChange: handleChange,
                    value: denormalizeValue(value, selectionMode)
                }
            )}
        >
            {Children.toArray(children).filter(x => x).map((x: ReactElement) => {
                return augmentElement(x, {
                    disabled: selectionMode === "none" ? disabled : undefined,
                    orientation,
                    style: {
                        width: `calc((100% - ${(rowSize - 1) * 16}px) / ${rowSize})`
                    }
                });
            })}
        </Box>
    );
}

export const TileGroup = forwardRef<any, OmitInternalProps<InnerTileGroupProps>>((props, ref) => (
    <InnerTileGroup {...props} forwardedRef={ref} />
));

export type TileGroupProps = ComponentProps<typeof TileGroup>;
