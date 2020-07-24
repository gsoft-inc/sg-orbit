import { isNil } from "lodash";
import { useChainedEventCallback, useCheckableContext, useControllableState } from "../../shared";

export function useToggleButton({
    checked,
    defaultChecked,
    value,
    onChange,
    onClick,
    active,
    forwardedRef,
    ...rest
}) {
    const { isCheckedValue, onCheck } = useCheckableContext(value);

    const [isChecked, setIsChecked] = useControllableState(!isNil(isCheckedValue) ? isCheckedValue : checked, defaultChecked, false);

    const handleClick = useChainedEventCallback(onClick, event => {
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
            ...rest,
            onClick: handleClick,
            active: active || isChecked,
            ref: forwardedRef
        }
    };
}
