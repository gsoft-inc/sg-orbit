import { ButtonVariant } from "./useButton";
import { FormEvent, ForwardedRef, MouseEvent } from "react";
import { isNil, useControllableState, useEventCallback } from "../../shared";

export type ToggleButtonVariant = Omit<ButtonVariant, "negative">;

export interface UseToggleButtonProps {
    active?: boolean;
    checked?: boolean | null;
    defaultChecked?: boolean;
    forwardedRef?: ForwardedRef<any>;
    isCheckable: boolean;
    onChange?: (event: FormEvent<HTMLButtonElement>, isChecked: boolean) => void;
    onCheck?: (event: FormEvent<HTMLButtonElement>, value: string) => void;
    value?: string;
    variant?: ToggleButtonVariant;
}

export function useToggleButton({
    active,
    checked,
    defaultChecked,
    forwardedRef,
    isCheckable,
    onChange,
    onCheck,
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
            value,
            [isCheckable ? "aria-checked" : "aria-pressed"]: isChecked,
            variant: variant as ButtonVariant
        },
        isChecked
    };
}
