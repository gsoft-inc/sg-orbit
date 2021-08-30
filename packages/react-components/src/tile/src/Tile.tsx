import "./Tile.css";

import { Box } from "../../box";
import { ComponentProps, MouseEvent, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InteractionStatesProps, InternalProps, OmitInternalProps, OrbitComponentProps, cssModule, isNil, isNumber, mergeProps, useAutoFocus, useCheckableProps, useControllableState, useEventCallback, useMergedRefs } from "../../shared";
import { useTile } from "./useTile";

const DefaultElement = "button";

export interface InnerTileProps extends InternalProps, InteractionStatesProps, Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
    /**
     * Whether or not the tile should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A controlled checked value.
     */
    checked?: boolean | null;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * Whether or not the tile is disabled.
     */
    disabled?: boolean;
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
     * The value to associate with when in a group.
     */
    value?: string;
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
        as = DefaultElement,
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
        active,
        children,
        focus,
        hover,
        orientation,
        variant: "checkable"
    });

    useAutoFocus(ref, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-tile"
                    ),
                    onClick: handleClick,
                    [isCheckable ? "aria-checked" : "aria-pressed"]: isChecked,
                    ref,
                    value
                },
                tileProps
            )}
        >
            {markup}
        </Box>
    );
}

export const Tile = forwardRef<any, OmitInternalProps<InnerTileProps>>((props, ref) => (
    <InnerTile {...props} forwardedRef={ref} />
));

export type TileProps = ComponentProps<typeof Tile>;
