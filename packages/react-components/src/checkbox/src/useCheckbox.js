import { getSizeClass, mergeClasses, useAutofocus, useControllableState, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useCallback, useImperativeHandle, useLayoutEffect, useRef } from "react";

export function useCheckbox({
    checked,
    defaultChecked,
    indeterminate,
    defaultIndeterminate,
    autofocus,
    autofocusDelay,
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
    ref,
    ...rest
}) {
    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useControllableState(indeterminate, defaultIndeterminate, false);

    const labelRef = useRef();
    const inputRef = useRef();

    const setFocus = useCallback(() => {
        if (!isNil(inputRef.current)) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    // Forward native input API to the external ref element.
    useImperativeHandle(ref, () => {
        const apiMethods = ["blur", "focus", "click", "checkValidity", "reportValidity", "setCustomValidity"];
        const domElement = labelRef.current;

        apiMethods.forEach(x => {
            domElement[x] = (...args) => {
                inputRef.current[x](...args);
            };
        });

        return domElement;
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
        containerProps: {
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
            ref: labelRef
        },
        inputProps: {
            ...autofocusProps,
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
