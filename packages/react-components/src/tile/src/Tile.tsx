import "./Tile.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InteractionStatesProps, cssModule, isNil, isNumber, mergeProps, useAutoFocus, useCheckableProps, useControllableState, useEventCallback, useMergedRefs } from "../../shared";
import { useTile } from "./useTile";

const defaultElement = "button";

export interface InnerTileProps extends InteractionStatesProps, Omit<ComponentProps<typeof defaultElement>, "autoFocus" | "onChange"> {
    /**
     * A controlled checked value.
     */
    checked?: boolean | null;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
    /**
     * Called when the tile checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the tile is checked or not.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * The orientation of the tile.
     */
    orientation?: "horizontal" | "vertical";
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

export function InnerTile(props: InnerTileProps) {
    const [checkableProps, isCheckable] = useCheckableProps(props);

    const {
        checked,
        defaultChecked,
        value,
        onChange,
        onCheck,
        autoFocus,
        active,
        orientation = "vertical",
        focus,
        hover,
        as = defaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const ref = useMergedRefs(forwardedRef);

    const handleClick = useEventCallback((event: MouseEvent<HTMLButtonElement>) => {
        setIsChecked(!isChecked);

        if (!isNil(onCheck)) {
            onCheck(event, value);
        }

        if (!isNil(onChange)) {
            onChange(event, !isChecked);
        }
    });

    const { tileProps, markup } = useTile({
        variant: "checkable",
        active,
        orientation,
        focus,
        hover,
        children
    });

    useAutoFocus(ref, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-tile"
                    ),
                    onClick: handleClick,
                    value,
                    [isCheckable ? "aria-checked" : "aria-pressed"]: isChecked,
                    as,
                    ref
                },
                tileProps
            )}
        >
            {markup}
        </Box>
    );
}

export const Tile = forwardRef<any, Omit<InnerTileProps, "forwardedRef">>((props, ref) => (
    <InnerTile {...props} forwardedRef={ref} />
));

export type TileProps = ComponentProps<typeof Tile>;

Tile.displayName = "Tile";
