import { Button } from "./Button";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent } from "react";
import { forwardRef, mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

interface InnerToggleButtonProps {
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
     * Called when the toggle button checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isChecked - Whether the button is checked or not.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * The style to use.
     */
    variant?: "solid" | "outline";
    /**
     * The toggle button color accent.
     */
    color?: "primary" | "secondary";
    /**
     * The toggle button shape.
     */
    shape?: "pill" | "rounded" | "circular";
    /**
     * Whether or not the toggle button should autoFocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * A toggle button can vary in size.
     */
    size?: "sm" | "md";
    /**
     * Whether or not the toggle button is disabled.
     */
    disabled?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    active?: boolean;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}

export function InnerToggleButton(props: InnerToggleButtonProps) {
    const [checkableProps, isCheckable] = useCheckableProps(props);

    const {
        variant = "solid",
        shape = "pill",
        checked,
        defaultChecked,
        value,
        onChange,
        onCheck,
        active,
        as,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const { buttonProps } = useToggleButton({
        variant,
        shape,
        checked,
        defaultChecked,
        value,
        onChange,
        onCheck,
        active,
        isCheckable,
        forwardedRef
    });

    const content = resolveChildren(children);

    return (
        <Button
            {...mergeProps(
                rest,
                {
                    as
                },
                buttonProps
            )}
        >
            {content}
        </Button>
    );
}

export const ToggleButton = slot("button", forwardRef<InnerToggleButtonProps, "button">((props, ref) => (
    <InnerToggleButton {...props} forwardedRef={ref} />
)));

export type ToggleButtonProps = ComponentProps<typeof ToggleButton>;

ToggleButton.displayName = "ToggleButton";


