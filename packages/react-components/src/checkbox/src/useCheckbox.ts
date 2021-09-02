import { ChangeEvent, ElementType, ForwardedRef, Ref, useImperativeHandle, useLayoutEffect, useRef } from "react";
import { InputSize, ValidationState } from "../../input";
import { cssModule, isNil, isNumber, normalizeSize, useAutoFocus, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";

export interface UseCheckboxProps {
    active?: boolean;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    autoFocus?: boolean | number;
    checked?: boolean | null;
    cssModule?: string;
    defaultChecked?: boolean;
    defaultIndeterminate?: boolean;
    disabled?: boolean;
    focus?: boolean;
    forwardedRef?: ForwardedRef<any>;
    hover?: boolean;
    id?: string;
    indeterminate?: boolean | null;
    isInField?: boolean;
    name?: string;
    onChange?: (event: ChangeEvent<HTMLInputElement>, isChecked: boolean) => void;
    required?: boolean;
    reverse?: boolean;
    size?: InputSize;
    tabIndex?: number;
    validationState?: ValidationState;
}

export interface UseCheckboxReturn {
    inputProps: {
        "aria-checked": boolean | "mixed";
        "aria-invalid": boolean;
        "aria-label"?: string;
        "aria-labelledby"?: string;
        "aria-required": boolean;
        as?: ElementType;
        checked?: boolean;
        disabled?: boolean;
        id?: string;
        name?: string;
        onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
        ref: Ref<any>;
        tabIndex?: number;
        type?: "checkbox";
    };
    isChecked: boolean;
    isIndeterminate?: boolean;
    wrapperProps: {
        className?: string;
        ref?: Ref<any>;
    };
}

export function useCheckbox({
    active,
    ariaLabel,
    ariaLabelledBy,
    autoFocus,
    checked,
    cssModule: module,
    defaultChecked,
    defaultIndeterminate,
    disabled,
    focus,
    forwardedRef,
    hover,
    id,
    indeterminate,
    isInField,
    name,
    onChange,
    required,
    reverse,
    size,
    tabIndex,
    validationState
}: UseCheckboxProps): UseCheckboxReturn {
    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useControllableState(indeterminate, defaultIndeterminate, false);

    const wrapperRef = useRef<HTMLInputElement>();
    const inputRef = useRef<HTMLInputElement>();

    useAutoFocus(inputRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus
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
        inputProps: {
            "aria-checked": isIndeterminate ? "mixed" : isChecked,
            "aria-invalid": validationState === "invalid" ? true : undefined,
            "aria-label": ariaLabel,
            "aria-labelledby": ariaLabelledBy,
            "aria-required": required ? true : undefined,
            as: "input",
            checked: isChecked,
            disabled,
            id,
            name,
            onChange: handleChange,
            ref: inputRef,
            tabIndex,
            type: "checkbox"
        },
        isChecked,
        isIndeterminate,
        wrapperProps: {
            className: cssModule(
                module,
                isChecked && "checked",
                isIndeterminate && "indeterminate",
                isInField && "in-field",
                reverse && "reverse",
                validationState && validationState,
                disabled && "disabled",
                active && "active",
                focus && "focus",
                hover && "hover",
                normalizeSize(size)
            ),
            ref: wrapperRef
        }
    };
}
