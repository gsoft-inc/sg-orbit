import { ChangeEvent, ForwardedRef } from "react";
import { isNil } from "lodash";
import { useControllableState, useEventCallback } from "../../shared";

export interface UseToggleButtonProps<Shape> {
    variant?: "solid" | "outline" | "ghost";
    shape?: Shape;
    active?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    value?: string;
    onChange?: (event: ChangeEvent, isChecked: boolean) => void;
    onCheck?: (event: ChangeEvent, value: string) => void;
    forwardedRef?: ForwardedRef<any>;
}

//TODO: TS We had to have a shape be generic, since Toggle Button and ToggleIconButton don't have the same shape allowed.
// We want to preserve in the output type the same type as the one in the input props.
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
