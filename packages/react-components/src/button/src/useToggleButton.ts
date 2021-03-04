import { ForwardedRef, SyntheticEvent } from "react";
import { isNil } from "lodash";
import { useControllableState, useEventCallback } from "../../shared";

export interface UseToggleButtonProps {
    variant?: "solid" | "outline" | "ghost";
    shape?: "pill" | "rounded" | "circular";
    active?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    value?: string | number;
    onChange?(event: SyntheticEvent, isChecked: boolean): void;
    onCheck?(event: SyntheticEvent, value: string | number): void;
    forwardedRef?: ForwardedRef<any>;
}

export function useToggleButton({
    variant,
    shape,
    checked,
    defaultChecked,
    value,
    onChange,
    onCheck,
    active,
    forwardedRef
}: UseToggleButtonProps) {
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
