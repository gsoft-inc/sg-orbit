import { getSizeClass, mergeClasses, useAutoFocus, useChainedEventCallback, useControllableState } from "../../shared";
import { isNil } from "lodash";
import { useCallback } from "react";

export function useTextInput({
    value,
    defaultValue,
    placeholder,
    variant,
    autoFocus,
    autoFocusDelay,
    disabled,
    readOnly,
    fluid,
    loading,
    size,
    active,
    focus,
    hover,
    onChange,
    className,
    inputRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, null);

    const setFocus = useCallback(() => {
        if (!isNil(inputRef.current)) {
            inputRef.focus();
        }
    }, [inputRef]);

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    const handleChange = useChainedEventCallback(onChange, event => {
        setValue(event);
    });

    return {
        ...rest,
        ...autoFocusProps,
        value: inputValue,
        placeholder,
        onChange: handleChange,
        className: mergeClasses(
            variant,
            fluid && "fluid",
            loading && "loading",
            active && "active",
            focus && "focus",
            hover && "hover",
            getSizeClass(size),
            className
        ),
        disabled,
        readOnly
    };
}
