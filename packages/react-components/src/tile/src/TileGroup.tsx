import { CSSProperties, Children, ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef, forwardRef as reactForwardRef } from "react";
import { CheckboxGroup } from "../../checkbox";
import { Group, GroupProps } from "../../group";
import {
    InternalProps,
    OmitInternalProps,
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

export interface InnerTileGroupProps extends InternalProps, Omit<ComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
    /**
     * [Slot](?path=/docs/getting-started-slots--page) to render into.
     */
    slot?: string;
    /**
     * How the elements are placed in the container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/flex-direction).
     */
    direction?: "row" | "column";
    /**
     * The distribution of space around child items along the cross axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-content).
     */
    alignContent?: (
        "start" |
        "end" |
        "center" |
        "space-between" |
        "space-around" |
        "space-evenly" |
        "stretch" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * The alignment of children within their container. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items).
     */
    alignItems?: (
        "start" |
        "end" |
        "center" |
        "stretch" |
        "self-start" |
        "self-end" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * The distribution of space around items along the main axis. See [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content).
     */
    justifyContent?: (
        "start" |
        "end" |
        "center" |
        "left" |
        "right" |
        "space-between" |
        "space-around" |
        "space-evenly" |
        "stretch" |
        "baseline" |
        "first baseline" |
        "last baseline" |
        "safe center" |
        "unsafe center");
    /**
     * Whether to wrap children in a `div` element.
     */
    wrapChildren?: boolean;
    /**
     * Whether or not to inline the elements.
     */
    inline?: boolean;
    /**
     * Whether or not to reverse the order of the elements.
     */
    reverse?: boolean;
    /**
     * The horizontal alignment of the elements.
     */
    align?: "start" | "end" | "center";
    /**
     * The vertical alignment of the elements.
     */
    verticalAlign?: "start" | "end" | "center";
    /**
     * Space to display between each elements.
     */
    gap?: (0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13) | string;
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap?: boolean;
    /**
     * Whether the elements take up the width & height of their container.
     */
    fluid?: boolean;
    /**
     * A WAI-ARIA accessibility role. See [MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles).
     */
    role?: string;
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
     * The orientation of the group tiles.
     */
    orientation?: "horizontal" | "vertical";
    /**
     * Whether or not the first tile of the group should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the tiles are disabled.
     */
    disabled?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
}

// @ts-ignore
export interface UnselectableGroupProps extends GroupProps {
    autoFocus?: boolean | number;
}

const UnselectableGroup = reactForwardRef<HTMLElement, UnselectableGroupProps>(({ autoFocus, children, ...rest }, ref) => {
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
    orientation,
    as = DefaultElement,
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
                    as,
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
                    orientation,
                    disabled: selectionMode === "none" ? disabled : undefined,
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

TileGroup.displayName = "TileGroup";
