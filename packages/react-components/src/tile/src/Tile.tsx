import "./Tile.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, MouseEvent, ReactNode, SyntheticEvent, useMemo } from "react";
import { InteractionStatesProps, cssModule, forwardRef, isNil, mergeProps, useCheckableProps, useControllableState, useEventCallback, useSlots } from "../../shared";

/*
Fluid by default?

Checkable
-> Render as a a button (like ToggleButton)
-> When checkabled, ARIA should match a RADIO or CHECKBOX depending if it's in a RadioGroup or a CheckboxGroup
-> When not in a group, use "aria-pressed"

Clickable
-> Render as a "a" -> when rendering as a "a", aria-pressed or -checked will not be rendered anyway since "isChecked" will be undefined

-> Clickable
-> checkable

TileGroup ?!?!? For clickable tiles (similar to ButtonGroup but for Tiles)
*/

/*
Fluid by default?

-> When checkable, render as a button (like ToggleButton) and implements ARIA for RADIO of CHECKBOX
-> When not checkable, render a a link

-> Clickable
-> Selectable

-> How to let screen reader understand the label? Add an aria-labelledby?!?! Should I add an aria-hidden="true" on the image/illustration?
*/

export interface InnerTileProps extends InteractionStatesProps {
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
        active,
        focus,
        hover,
        as = "button",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const handleClick = useEventCallback((event: MouseEvent<HTMLButtonElement>) => {
        setIsChecked(!isChecked);

        if (!isNil(onCheck)) {
            onCheck(event, value);
        }

        if (!isNil(onChange)) {
            onChange(event, !isChecked);
        }
    });

    const { image, illustration, heading, content } = useSlots(children, useMemo(() => ({
        _: {
            required: ["heading", "content"]
        },
        image: {
            className: "o-ui-tile-image"
        },
        illustration: {
            className: "o-ui-tile-illustration"
        },
        heading: {
            className: "o-ui-tile-heading",
            size: "sm",
            as: "h5"
        },
        content: {
            className: "o-ui-tile-content",
            as: Text
        }
    }), []));

    return (
        <Box
            {...mergeProps<any>(
                rest,
                {
                    onClick: handleClick,
                    className: cssModule(
                        "o-ui-tile",
                        active && "active",
                        focus && "focus",
                        hover && "hover"
                    ),
                    [isCheckable ? "aria-checked" : "aria-pressed"]: isChecked,
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {image}
            {illustration}
            {heading}
            {content}
        </Box>
    );
}

export const Tile = forwardRef<InnerTileProps>((props, ref) => (
    <InnerTile {...props} forwardedRef={ref} />
));

export type TileProps = ComponentProps<typeof Tile>;

Tile.displayName = "Tile";
