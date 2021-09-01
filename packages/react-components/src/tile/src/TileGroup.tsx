import { AbstractGroupProps, Group } from "../../group";
import { CheckboxGroup } from "../../checkbox";
import { Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import {
    InternalProps,
    OmitInternalProps,
    OrbitComponentProps,
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

const DefaultElement = "div";

export interface InnerTileGroupProps extends
    Omit<AbstractGroupProps, "fluid" | "gap" | "orientation" | "wrap">,
    InternalProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
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

export interface UnselectableGroupProps extends
    AbstractGroupProps,
    InternalProps,
    Omit<OrbitComponentProps<typeof DefaultElement>, "children"> {
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
    children,
    defaultValue,
    disabled,
    forwardedRef,
    onChange,
    rowSize = 1,
    selectionMode = "none",
    value,
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
            {...mergeProps(
                rest,
                {
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
                    orientation: "horizontal",
                    style: {
                        width: `calc((100% - ${(rowSize - 1) * 16}px) / ${rowSize})`
                    }
                });
            })}
        </As>
    );
}

export const TileGroup = forwardRef<any, OmitInternalProps<InnerTileGroupProps>>((props, ref) => (
    <InnerTileGroup {...props} forwardedRef={ref} />
));

export type TileGroupProps = ComponentProps<typeof TileGroup>;
