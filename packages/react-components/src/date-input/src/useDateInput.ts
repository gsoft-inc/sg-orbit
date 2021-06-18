import { ChangeEvent, ChangeEventHandler, ForwardedRef, SyntheticEvent, useCallback, useState } from "react";
import { isNil, mergeProps, useChainedEventCallback, useControllableState, useEventCallback, useMergedRefs, useRefState } from "../../shared";
import { useMaskedInput } from "./useMaskedInput";

const InputMask = [/\d/, /\d/, "/", /\d/, /\d/, "/", /\d/, /\d/, /\d/, /\d/];

// Date.parse() implementation is inconsistent accross browsers. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse.
function toDate(rawValue: string) {
    if (rawValue.length !== InputMask.length) {
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
        ? date.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })
        : "";
}

function datesAreEqual(x: Date, y: Date) {
    return x?.getTime() === y?.getTime();
}

function isTyping(inputValue: string) {
    return inputValue.length > 0 && inputValue.length < InputMask.length;
}

export interface UseDateInputProps {
    value?: Date | null;
    defaultValue?: Date;
    min?: Date;
    max?: Date;
    onChange?: ChangeEventHandler;
    onDateChange?: (event: SyntheticEvent, date: Date) => void;
    forwardedRef: ForwardedRef<any>;
}

export function useDateInput({
    value: valueProp,
    defaultValue,
    min,
    max,
    onChange,
    onDateChange,
    forwardedRef
}: UseDateInputProps) {
    const [inputValueRef, setInputValue] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback((newValue, { isInitial, isControlled }) => {
            // Keep input value in sync with the initial or controlled value and keep the value in a string form to faciliate internal manipulation.
            // Keep input value "mostly" in sync with the initial or controlled value.
            if (isInitial || isControlled) {
                const rawValue = newValue ? toNumericString(newValue) : "";

                // Do not sync the input value with the value when the user is typing. When in controlled mode, on every keypress the component will be
                // re-rendered with the NON updated value (since onDateChange is only called upon date completion) which will prevent the input value
                // from being updated in key press.
                if (!isTyping(inputValueRef.current)) {
                    setInputValue(rawValue);
                }
            }

            return undefined;
        }, [inputValueRef, setInputValue])
    });

    const [inputElement, setInputElement] = useState<HTMLInputElement>();
    const [hasFocus, setHasFocus] = useState(false);

    const ref = useMergedRefs(setInputElement, forwardedRef);

    const applyValue = useCallback((event, newDate) => {
        if (!datesAreEqual(value, newDate)) {
            setValue(newDate);

            if (!isNil(onDateChange)) {
                onDateChange(event, newDate);
            }
        }

        setInputValue(toNumericString(newDate), true);
    }, [onDateChange, value, setValue, setInputValue]);

    const applyRawValue = useCallback((event: ChangeEvent<HTMLInputElement>, rawValue: string) => {
        if (rawValue === "") {
            applyValue(event, null);
        } else {
            let newDate = toDate(rawValue);

            if (isNil(newDate)) {
                newDate = value ?? null;
            }

            applyValue(event, newDate);
        }
    }, [value, applyValue]);

    const syncInputValue = useCallback(() => {
        const stringValue = toNumericString(value);

        // When the value have not been applied, reset the input value to the last applied one.
        if (stringValue !== inputValueRef.current) {
            setInputValue(!isNil(value) ? stringValue : "", true);
        }


    }, [value, inputValueRef, setInputValue]);

    const clampValue = useCallback(event => {
        if (!isNil(value)) {
            if (!isNil(min) && min > value) {
                applyValue(event, min);
            } else if (!isNil(max) && max < value) {
                applyValue(event, max);
            }
        }
    }, [min, max, value, applyValue]);

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        const newValue = (event.target as HTMLInputElement).value;

        if (newValue === "" && !isNil(value)) {
            applyRawValue(event, newValue);
        } else if (newValue.length === InputMask.length) {
            applyRawValue(event, newValue);
        } else {
            setInputValue(newValue, true);
        }
    });

    const handleFocus = useEventCallback(() => {
        setHasFocus(true);
    });

    const handleBlur = useEventCallback(event => {
        clampValue(event);
        syncInputValue();

        setHasFocus(false);
    });

    const maskProps = useMaskedInput({
        inputElement,
        mask: InputMask
    });

    return mergeProps(
        {
            value: hasFocus ? inputValueRef.current : toLongString(value),
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            ref
        },
        maskProps
    );
}
