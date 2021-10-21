import { AbstractButtonProps, Button } from "./Button";
import { ComponentProps, ReactNode, SyntheticEvent, forwardRef } from "react";
import { OmitInternalProps, mergeProps, resolveChildren, useCheckableProps } from "../../shared";
import { ToggleButtonVariant, useToggleButton } from "./useToggleButton";

export interface InnerToggleButtonProps extends Omit<AbstractButtonProps<"button">, "onChange" | "variant"> {
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
     * Called when the button checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the button is checked or not.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * The value to associate with when in a group.
     */
    value?: string;
    /**
     * The button style to use.
     */
    variant?: ToggleButtonVariant;
}

export function InnerToggleButton(props: InnerToggleButtonProps) {
    const [checkableProps, isCheckable] = useCheckableProps(props);

    const {
        active,
        checked,
        children,
        defaultChecked,
        forwardedRef,
        onChange,
        onCheck,
        shape,
        value,
        variant,
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
                buttonProps
            )}
        >
            {content}
        </Button>
    );
}

export const ToggleButton = forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleButtonProps>>((props, ref) => (
    <InnerToggleButton {...props} forwardedRef={ref} />
));

export type ToggleButtonProps = ComponentProps<typeof ToggleButton>;


