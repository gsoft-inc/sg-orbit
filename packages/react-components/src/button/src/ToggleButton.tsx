import { Button } from "./Button";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InteractionProps, InternalProps, OmitInternalProps, OrbitComponentProps, mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

const DefaultElement = "button";

export interface InnerToggleButtonProps extends InternalProps, InteractionProps, Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
    /**
     * Whether or not the toggle button should autoFocus on render.
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
     * The toggle button color accent.
     */
    color?: "primary" | "secondary";
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * Whether or not the toggle button is disabled.
     */
    disabled?: boolean;
    /**
     * Called when the toggle button checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the button is checked or not.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * The toggle button shape.
     */
    shape?: "pill" | "rounded" | "circular";
    /**
     * A toggle button can vary in size.
     */
    size?: "sm" | "md";
    /**
     * The value to associate with when in a group.
     */
    value?: string;
    /**
     * The style to use.
     */
    variant?: "solid" | "outline";
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
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const { buttonProps } = useToggleButton({
        active,
        checked,
        defaultChecked,
        forwardedRef,
        isCheckable,
        onChange,
        onCheck,
        shape,
        value,
        variant
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

export const ToggleButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleButtonProps>>((props, ref) => (
    <InnerToggleButton {...props} forwardedRef={ref} />
)));

export type ToggleButtonProps = ComponentProps<typeof ToggleButton>;


