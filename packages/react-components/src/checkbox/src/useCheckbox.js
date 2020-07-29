import { getSizeClass, mergeClasses, useAutoFocus, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";
import { isNil } from "lodash";
import { useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";

export function useCheckbox({
    checked,
    defaultChecked,
    indeterminate,
    defaultIndeterminate,
    autoFocus,
    autoFocusDelay,
    onChange,
    icon,
    badge,
    size,
    reverse,
    name,
    tabIndex,
    active,
    focus,
    hover,
    disabled,
    readOnly,
    className,
    forwardedRef,
    ...rest
}) {
    // Since this component render an input="radio" the role is unnecessary.
    delete rest["role"];

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useControllableState(indeterminate, defaultIndeterminate, false);

    const wrapperRef = useRef();
    const inputRef = useRef();

    const setFocus = useCallback(() => {
        if (!isNil(inputRef.current)) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

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
            ...rest,
            className: mergeClasses(
                isChecked && "checked",
                isIndeterminate && "indeterminate",
                !isNil(icon) && "with-icon",
                !isNil(badge) && "with-badge",
                reverse && "reverse",
                disabled && "disabled",
                readOnly && "readonly",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className
            ),
            ref: wrapperRef
        },
        inputProps: {
            ...autoFocusProps,
            as: "input",
            type: "checkbox",
            checked: !readOnly ? isChecked : undefined,
            onChange: !readOnly ? handleChange : undefined,
            disabled,
            name,
            tabIndex,
            ref: inputRef
        }
    };
}
