import { ForwardedRef, SyntheticEvent } from "react";
import { isNil } from "lodash";
import { useControllableState, useEventCallback } from "../../shared";

export interface UseToggleButtonProps<Shape> {
    variant?: "solid" | "outline" | "ghost";
    shape?: Shape;
    active?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    value?: string | number;
    onChange?(event: SyntheticEvent, isChecked: boolean): void;
    onCheck?(event: SyntheticEvent, value: string | number): void;
    forwardedRef?: ForwardedRef<any>;
}

export function useToggleButton<
    Shape extends "pill" | "rounded" | "circular"
>({
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

    const handleClick = useEventCallback(event => {
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
