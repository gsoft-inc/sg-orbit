import { AbstractIconButtonProps, IconButton } from "./IconButton";
import { ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { InternalProps, OmitInternalProps, mergeProps, resolveChildren, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

export interface InnerToggleIconButtonProps extends Omit<AbstractIconButtonProps, "color" | "onChange" | "variant">, InternalProps {
    /**
     * A controlled checked value.
     */
    checked?: boolean | null;
    /**
     * React children.
     */
    children: ReactNode;
    /**
     * The button color accent.
     */
    color?: "primary" | "secondary";
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * Called when the button checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the button is checked.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * 	The value to associate with when in a group.
     */
    value?: string;
    /**
     * The style to use.
     */
    variant?: "solid" | "outline";
}

export function InnerToggleIconButton(props: InnerToggleIconButtonProps) {
    const [checkableProps, isCheckable] = useCheckableProps(props);

    const {
        active,
        "aria-label": ariaLabel,
        checked,
        children,
        defaultChecked,
        forwardedRef,
        onChange,
        shape = "circular",
        value,
        variant = "solid",
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const { buttonProps, isChecked } = useToggleButton({
        active,
        checked,
        defaultChecked,
        forwardedRef,
        isCheckable,
        onChange,
        shape,
        value,
        variant
    });

    const content = resolveChildren(children, { isChecked }) as ReactElement;

    return (
        <IconButton
            {...mergeProps(
                {
                    "aria-label": ariaLabel
                },
                rest,
                buttonProps
            )}
        >
            {content}
        </IconButton>
    );
}

export const ToggleIconButton = forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleIconButtonProps>>((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
));

export type ToggleIconButtonProps = ComponentProps<typeof ToggleIconButton>;
