import { AriaLabelingProps, InteractionStatesProps, InternalProps, OmitInternalProps, isNil, mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { IconButton } from "./IconButton";
import { useToggleButton } from "./useToggleButton";

const DefaultElement = "button";

export interface InnerToggleIconButtonProps extends InternalProps, InteractionStatesProps, AriaLabelingProps, Omit<ComponentProps<typeof DefaultElement>, "autoFocus" | "onChange"> {
    /**
     * A controlled checked value.
     */
    checked?: boolean | null;
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked?: boolean;
    /**
     * 	The value to associate with when in a group.
     */
    value?: string;
    /**
     * Called when the toggle icon button checked state change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {bool} isChecked - Whether the button is checked.
     * @returns {void}
     */
    onChange?: (event: SyntheticEvent, isChecked: boolean) => void;
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
     * Defines a string value that labels the current element..
     */
    "aria-label": string;
    /**
     * Default slot override.
     */
    slot?: string;
    /**
     * React children.
     */
    children: ReactNode;
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

    const { isChecked, buttonProps } = useToggleButton({
        variant,
        shape,
        checked,
        defaultChecked,
        value,
        onChange,
        active,
        isCheckable,
        forwardedRef
    });

    const content = resolveChildren(children, { isChecked }) as ReactElement;

    return (
        <IconButton
            {...mergeProps(
                {
                    as: as,
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

export const ToggleIconButton = slot("button", forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleIconButtonProps>>((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
)));

export type ToggleIconButtonProps = ComponentProps<typeof ToggleIconButton>;

ToggleIconButton.displayName = "ToggleIconButton";
