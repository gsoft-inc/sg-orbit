import { ChangeEvent, ElementType, ForwardedRef, Ref, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { cssModule, isNil, isNumber, normalizeSize, useAutoFocus, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";

export interface UseCheckboxProps {
    cssModule?: string;
    isInField?: boolean;
    id?: string;
    checked?: boolean | null;
    defaultChecked?: boolean;
    indeterminate?: boolean | null;
    defaultIndeterminate?: boolean;
    autoFocus?: boolean | number;
    required?: boolean;
    validationState?: "invalid" | "valid";
    onChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    size?: "sm" | "md";
    reverse?: boolean;
    name?: string;
    tabIndex?: number;
    active?: boolean;
    focus?: boolean;
    hover?: boolean;
    disabled?: boolean;
    forwardedRef?: ForwardedRef<any>;
}

export interface UseCheckboxReturn {
    isChecked: boolean;
    isIndeterminate?: boolean;
    wrapperProps: {
        className?: string;
        ref?: Ref<any>;
    };
    inputProps: {
        id?: string;
        as?: ElementType;
        type?: "checkbox";
        checked?: boolean;
        onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
        disabled?: boolean;
        name?: string;
        tabIndex?: number;
        "aria-checked": boolean | "mixed";
        "aria-required": boolean;
        "aria-invalid": boolean;
        ref: Ref<any>;
    };
}

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
}: UseCheckboxProps): UseCheckboxReturn {
    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useControllableState(indeterminate, defaultIndeterminate, false);

    const wrapperRef = useRef<HTMLInputElement>();
    const inputRef = useRef<HTMLInputElement>();

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(wrapperRef);
    });

    const handleChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        const isInputChecked = (event.target as HTMLInputElement).checked;

        setIsChecked(isInputChecked);
        setIsIndeterminate(false);

        if (!isNil(onChange)) {
            onChange(event, isInputChecked);
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
            "aria-required": required ? true : undefined,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            ref: inputRef
        }
    };
}
