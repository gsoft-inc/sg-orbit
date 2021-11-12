import { ButtonShape, ButtonTone, ButtonVariant } from "./useButton";
import { FormEvent, ForwardedRef, MouseEvent } from "react";
import { isNil, useControllableState, useEventCallback } from "../../shared";

export type ToggleButtonTone = Omit<ButtonTone, "negative">;

export type ToggleButtonVariant = ButtonVariant;

export interface UseToggleButtonProps {
    active?: boolean;
    checked?: boolean | null;
    defaultChecked?: boolean;
    forwardedRef?: ForwardedRef<any>;
    isCheckable: boolean;
    onChange?: (event: FormEvent<HTMLButtonElement>, isChecked: boolean) => void;
    onCheck?: (event: FormEvent<HTMLButtonElement>, value: string) => void;
    shape?: ButtonShape;
    tone?: ToggleButtonTone;
    value?: string;
    variant?: ButtonVariant;
}

// The shape is generic since ToggleButton and ToggleIconButton don't allow the same shapes. The output type of useToggleButton
// must forward the exact shape type as the one received in the parameters.
export function useToggleButton({
    active,
    checked,
    defaultChecked,
    forwardedRef,
    isCheckable,
    onChange,
    onCheck,
    shape,
    tone,
    value,
    variant
}: UseToggleButtonProps) {
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

    return {
        buttonProps: {
            active: active || isChecked,
            onClick: handleClick,
            ref: forwardedRef,
            shape,
            tone: tone as ButtonTone,
            value,
            [isCheckable ? "aria-checked" : "aria-pressed"]: isChecked,
            variant: variant as ButtonVariant
        },
        isChecked
    };
}
