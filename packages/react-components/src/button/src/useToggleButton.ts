import { FormEvent, ForwardedRef, MouseEvent } from "react";
import { isNil, useControllableState, useEventCallback } from "../../shared";

export interface UseToggleButtonProps<Shape> {
    variant?: "solid" | "outline" | "ghost";
    shape?: Shape;
    active?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    value?: string;
    onChange?: (event: FormEvent<HTMLButtonElement>, isChecked: boolean) => void;
    onCheck?: (event: FormEvent<HTMLButtonElement>, value: string) => void;
    forwardedRef?: ForwardedRef<any>;
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
        isChecked,
        buttonProps: {
            variant,
            shape,
            onClick: handleClick,
            value,
            active: active || isChecked,
            "aria-checked": isChecked,
            ref: forwardedRef
        }
    };
}
