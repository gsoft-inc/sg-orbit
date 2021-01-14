import { cssModule, normalizeSize, useAutoFocus, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";
import { isNil, isNumber } from "lodash";
import { useImperativeHandle, useLayoutEffect, useRef } from "react";

export function useCheckbox({
    cssModule: module,
    isInField,
    id,
    checked,
    defaultChecked,
    indeterminate,
    defaultIndeterminate,
    autoFocus,
    required,
    validationState,
    onChange,
    size,
    reverse,
    name,
    tabIndex,
    active,
    focus,
    hover,
    disabled,
    forwardedRef
}) {
    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useControllableState(indeterminate, defaultIndeterminate, false);

    const wrapperRef = useRef();
    const inputRef = useRef();

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(wrapperRef);
    });

    const handleChange = useEventCallback(event => {
        setIsChecked(event.target.checked);
        setIsIndeterminate(false);

        if (!isNil(onChange)) {
            onChange(event);
        }
    });

    useLayoutEffect(() => {
        if (!isNil(inputRef.current)) {
            inputRef.current.indeterminate = !!isIndeterminate;
        }
    }, [inputRef, isIndeterminate]);

    return {
        isChecked,
        isIndeterminate,
        wrapperProps: {
            className: cssModule(
                module,
                isChecked && "checked",
                isIndeterminate && "indeterminate",
                isInField && "as-field",
                reverse && "reverse",
                validationState && validationState,
                disabled && "disabled",
                active && "active",
                focus && "focus",
                hover && "hover",
                normalizeSize(size)
            ),
            ref: wrapperRef
        },
        inputProps: {
            id,
            as: "input",
            type: "checkbox",
            checked: isChecked,
            onChange: handleChange,
            disabled,
            name,
            tabIndex,
            "aria-checked": isIndeterminate ? "mixed" : isChecked,
            "aria-required": required,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            ref: inputRef
        }
    };
}
