import { AbstractIconButtonProps, IconButton } from "./IconButton";
import { ComponentProps, ReactElement, ReactNode, SyntheticEvent, forwardRef } from "react";
import { OmitInternalProps, mergeProps, resolveChildren, useCheckableProps } from "../../shared";
import { ToggleButtonVariant, useToggleButton } from "./useToggleButton";

const DefaultElement = "button";

export interface InnerToggleIconButtonProps extends Omit<AbstractIconButtonProps<typeof DefaultElement>, "onChange" | "variant"> {
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
    variant?: ToggleButtonVariant;
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
        value,
        variant,
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

InnerToggleIconButton.defaultElement = DefaultElement;

/**
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/button--default-story)
*/

export const ToggleIconButton = forwardRef<HTMLButtonElement, OmitInternalProps<InnerToggleIconButtonProps>>((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
));

export type ToggleIconButtonProps = ComponentProps<typeof ToggleIconButton>;
