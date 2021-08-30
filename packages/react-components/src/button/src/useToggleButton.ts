import { FormEvent, ForwardedRef, MouseEvent } from "react";
import { isNil, useControllableState, useEventCallback } from "../../shared";

export interface UseToggleButtonProps<Shape> {
    active?: boolean;
    checked?: boolean | null;
    defaultChecked?: boolean;
    forwardedRef?: ForwardedRef<any>;
    isCheckable: boolean;
    onChange?: (event: FormEvent<HTMLButtonElement>, isChecked: boolean) => void;
    onCheck?: (event: FormEvent<HTMLButtonElement>, value: string) => void;
    shape?: Shape;
    value?: string;
    variant?: "solid" | "outline" | "ghost";
}

// The shape is generic since ToggleButton and ToggleIconButton don't allow the same shapes. The output type of useToggleButton
// must forward the exact shape type as the one received in the parameters.
export function useToggleButton<Shape>({
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
}: UseToggleButtonProps<Shape>) {
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
            value,
            [isCheckable ? "aria-checked" : "aria-pressed"]: isChecked,
            variant
        },
        isChecked
    };
}
