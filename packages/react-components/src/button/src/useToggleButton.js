import { isNil } from "lodash";
import { useControllableState, useEventCallback } from "../../shared";

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
}) {
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
