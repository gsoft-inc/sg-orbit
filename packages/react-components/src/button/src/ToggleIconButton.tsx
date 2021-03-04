import { ComponentProps, ElementType, ForwardedRef, ReactElement, SyntheticEvent } from "react";
import { IconButton } from "./IconButton";
import { forwardRef, mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

interface InnerToggleIconButtonProps {
    /**
     * A controlled checked value.
     */
    checked?: boolean;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * 	The value to associate with when in a group.
     */
    value?: string | number;
    /**
     * Called when the toggle icon button checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isChecked - Whether the button is checked.
     * @returns {void}
     */
    onChange?(event: SyntheticEvent, isChecked: boolean): void;
    /**
     * The style to use.
     */
    variant?: "solid" | "outline";
    /**
     * The toggle icon button color accent.
     */
    color?: "primary" | "secondary";
    /**
     * The toggle icon button shape.
     */
    shape?: "rounded" | "circular";
    /**
     * Whether or not the toggle icon button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * Whether or not the toggle icon button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A toggle icon button can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the toggle icon button is disabled.
     */
    disabled?: boolean;
    /**
     * A label providing an accessible name to the toggle icon button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * @ignore
     */
    active?: boolean;
    /**
     * React children.
     */
    children: ReactElement<any, any>;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerToggleIconButton(props: InnerToggleIconButtonProps) {
    const [checkableProps] = useCheckableProps(props);

    const {
        variant = "solid",
        shape = "circular",
        checked,
        defaultChecked,
        value,
        onChange,
        active,
        as,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const { isChecked, buttonProps } = useToggleButton({
        variant,
        shape,
        checked,
        defaultChecked,
        value,
        onChange,
        active,
        forwardedRef
    });

    const content = resolveChildren(children, { isChecked });

    return (
        <IconButton
            {...mergeProps(
                {
                    as: as
                },
                rest,
                buttonProps
            )}
        >
            {content}
        </IconButton>
    );
}

export const ToggleIconButton = slot("button", forwardRef<InnerToggleIconButtonProps>((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
)));

export type ToggleIconButtonProps = ComponentProps<typeof ToggleIconButton>

ToggleIconButton.displayName = "ToggleIconButton";
