import { ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { IconButton } from "./IconButton";
import { InteractionProps, InternalProps, OmitInternalProps, OrbitComponentProps, SlotProps, isNil, mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

const DefaultElement = "button";

export interface InnerToggleIconButtonProps extends SlotProps, InternalProps, InteractionProps, Omit<OrbitComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
    /**
     * Defines a string value that labels the current element..
     */
    "aria-label": string;
    /**
     * Whether or not the toggle icon button should autoFocus on render.
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
     * The toggle icon button color accent.
     */
    color?: "primary" | "secondary";
    /**
     * Whether or not the toggle icon button content should takes additional space.
     */
    condensed?: boolean;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * Whether or not the toggle icon button is disabled.
     */
    disabled?: boolean;
    /**
     * Called when the toggle icon button checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the button is checked.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
    /**
     * The toggle icon button shape.
     */
    shape?: "rounded" | "circular";
    /**
     * A toggle icon button can vary in size.
     */
    size?: "sm" | "md";
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
        variant = "solid",
        shape = "circular",
        checked,
        defaultChecked,
        value,
        onChange,
        active,
        "aria-label": ariaLabel,
        as = DefaultElement,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    if (isNil(ariaLabel)) {
        console.error("A toggle icon button component must have an \"aria-label\" attribute.");
    }

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
                    "aria-label": ariaLabel,
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

export const ToggleIconButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleIconButtonProps>>((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
)));

export type ToggleIconButtonProps = ComponentProps<typeof ToggleIconButton>;
