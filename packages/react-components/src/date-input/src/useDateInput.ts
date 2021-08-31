import { ChangeEvent, ChangeEventHandler, ForwardedRef, SyntheticEvent, useCallback, useState } from "react";
import { areEqualDates } from "./date-utils";
import { isNil, mergeProps, useChainedEventCallback, useControllableState, useEventCallback, useMergedRefs, useRefState } from "../../shared";
import { useMaskedInput } from "./useMaskedInput";

export const DateInputMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

// Date.parse() implementation is inconsistent accross browsers. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse.
function toDate(rawValue: string) {
    if (rawValue.length !== DateInputMask.length) {
        return null;
    }

    const parts = rawValue.split("/");

    if (parts.length !== 3) {
        return null;
    }

    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const adjustedMonth = month > 0 ? month - 1 : month;
    const day = parseInt(parts[0]);

    const date = new Date(year, adjustedMonth, day);

    // See https://esganzerla.medium.com/simple-date-validation-with-javascript-caea0f71883c
    if (date.getFullYear() !== year ||
        date.getMonth() !== adjustedMonth ||
        date.getDate() !== day) {
        return null;
    }

    return date;
}

function toNumericString(date: Date) {
    if (isNil(date)) {
        return "";
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${day.length === 1 ? `0${day}` : day}/${month.length === 1 ? `0${month}` : month}/${year}`;
}

function toLongString(date: Date) {
    return !isNil(date)
        ? date.toLocaleDateString(undefined, { day: "numeric", month: "short", weekday: "short", year: "numeric" })
        : "";
}

export interface UseDateInputProps {
    defaultValue?: Date;
    forwardedRef: ForwardedRef<any>;
    max?: Date;
    min?: Date;
    onChange?: ChangeEventHandler;
    onDateChange?: (event: SyntheticEvent, date: Date) => void;
    value?: Date | null;
}

export function useDateInput({
    defaultValue,
    forwardedRef,
    max,
    min,
    onChange,
    onDateChange,
    value: valueProp
}: UseDateInputProps) {
    const [inputValueRef, setInputValue] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback((newValue, { isControlled, isInitial }) => {
            // Keep input value "mostly" in sync with the initial or controlled value.
            if (isInitial || isControlled) {
                const rawValue = newValue ? toNumericString(newValue) : "";

                setInputValue(rawValue);
            }

            return undefined;
        }, [setInputValue])
    });

    const [inputElement, setInputElement] = useState<HTMLInputElement>();
    const [hasFocus, setHasFocus] = useState(false);

    const ref = useMergedRefs(setInputElement, forwardedRef);

    const updateValue = useCallback((event, newDate) => {
        if (!areEqualDates(value, newDate)) {
            setValue(newDate);

            if (!isNil(onDateChange)) {
                onDateChange(event, newDate);
            }
        }

        const newInputValue = toNumericString(newDate);

        if (newInputValue !== inputValueRef.current) {
            setInputValue(newInputValue, true);
        }
    }, [onDateChange, value, setValue, inputValueRef, setInputValue]);

    const updateFromInputValue = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const inputValue = inputValueRef.current;

        if (inputValue === "") {
            updateValue(event, null);
        } else {
            let newDate = toDate(inputValue);

            if (isNil(newDate)) {
                newDate = value ?? null;
            } else if (!isNil(min) && min > newDate) {
                newDate = min;
            } else if (!isNil(max) && max < newDate) {
                newDate = max;
            }

            updateValue(event, newDate);
        }
    }, [value, inputValueRef, min, max, updateValue]);

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value, true);
    });

    const handleFocus = useEventCallback(() => {
        setHasFocus(true);
    });

    const handleBlur = useEventCallback(event => {
        updateFromInputValue(event);
        setHasFocus(false);
    });

    const maskProps = useMaskedInput({
        inputElement,
        mask: DateInputMask
    });

    return mergeProps(
        {
            onBlur: handleBlur,
            onChange: handleChange,
            onFocus: handleFocus,
            ref,
            value: hasFocus ? inputValueRef.current : toLongString(value)
        },
        maskProps
    );
}
