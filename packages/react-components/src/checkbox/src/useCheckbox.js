import { cssModule, getSizeClass3, mergeClasses, useAutoFocus, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";
import { isNil } from "lodash";
import { useImperativeHandle, useLayoutEffect, useRef } from "react";

export function useCheckbox({
    cssModule: cssPrefix,
    checked,
    defaultChecked,
    indeterminate,
    defaultIndeterminate,
    autoFocus,
    autoFocusDelay,
    onChange,
    size,
    reverse,
    name,
    tabIndex,
    active,
    focus,
    hover,
    disabled,
    className,
    forwardedRef
}) {
    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useControllableState(indeterminate, defaultIndeterminate, false);

    const wrapperRef = useRef();
    const inputRef = useRef();

    useAutoFocus(inputRef, autoFocus, { delay: autoFocusDelay });

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
            className: mergeClasses(
                cssModule(
                    cssPrefix,
                    isChecked && "checked",
                    isIndeterminate && "indeterminate",
                    reverse && "reverse",
                    disabled && "disabled",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass3(size)
                ),
                className
            ),
            ref: wrapperRef
        },
        inputProps: {
            as: "input",
            type: "checkbox",
            checked: isChecked,
            onChange: handleChange,
            disabled,
            name,
            tabIndex,
            ref: inputRef
        }
    };
}
