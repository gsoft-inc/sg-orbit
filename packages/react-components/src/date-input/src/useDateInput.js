import { isNil } from "lodash";
import { mergeProps, useChainedEventCallback, useControllableState, useEventCallback, useMergedRefs, useRefState } from "../../shared";
import { useCallback, useState } from "react";
import { useMaskedInput } from "./useMaskedInput";

const InputMask = [/[0-3]/, /[0-9]/, "/", /[0-1]/, /[0-9]/, "/", /\d/, /\d/, /\d/, /\d/];

// Date.parse() implementation is inconsistent accross browsers. See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse.
function toDate(rawValue) {
    if (rawValue.length !== InputMask.length) {
        return null;
    }

    const parts = rawValue.split("/");

    if (parts.length !== 3) {
        return null;
    }

    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const adjustedMonth = month > 0 ? month -1 : month;
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

function toNumericString(date) {
    if (isNil(date)) {
        return "";
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${day.length === 1 ? `0${day}` : day}/${month.length === 1 ? `0${month}` : month}/${year}`;
}

function toLongString(date) {
    return !isNil(date)
        ? date.toLocaleDateString(undefined, { weekday: "short", year: "numeric", month: "short", day: "numeric" })
        : "";
}

function isTyping(inputValue) {
    return inputValue.length > 0 && inputValue.length < InputMask.length;
}

export function useDateInput({
    value: valueProp,
    defaultValue,
    minDate,
    maxDate,
    onChange,
    onDateChange,
    forwardedRef
}) {
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
        }, [inputValueRef, setInputValue])
    });

    const [inputElement, setInputElement] = useState();
    const [hasFocus, setHasFocus] = useState(false);

    const ref = useMergedRefs(setInputElement, forwardedRef);

    const reset = useCallback(() => {
        const stringValue = toNumericString(value);

        // Reset the value to the last selected one.
        if (stringValue !== inputValueRef.current) {
            setInputValue(value ? stringValue : "", true);
        }
    }, [value, inputValueRef, setInputValue]);

    const commit = useCallback((event, rawValue) => {
        if (toNumericString(value) !== rawValue) {
            let newDate = null;

            if (rawValue !== "") {
                newDate = toDate(rawValue);

                if (isNil(newDate)) {
                    reset();

                    return;
                }
            }

            if (!isNil(onDateChange)) {
                onDateChange(event, newDate);
            }

            setValue(newDate);
        }

        setInputValue(rawValue, true);
    }, [onDateChange, value, setValue, setInputValue, reset]);

    const handleChange = useChainedEventCallback(onChange, event => {
        const newValue = event.target.value;

        if (newValue === "") {
            commit(event, newValue);
        } else if (newValue.length === InputMask.length) {
            let adjustedValue = newValue;

            if (!isNil(minDate) || !isNil(maxDate)) {
                const newDate = toDate(newValue);

                if (minDate > newDate) {
                    adjustedValue = toNumericString(minDate);
                } else if (maxDate < newDate) {
                    adjustedValue = toNumericString(maxDate);
                }
            }

            commit(event, adjustedValue);
        } else {
            setInputValue(newValue, true);
        }
    });

    const handleFocus = useEventCallback(() => {
        setHasFocus(true);
    });

    const handleBlur = useEventCallback(() => {
        reset();
        setHasFocus(false);
    });

    const maskProps = useMaskedInput({
        inputElement,
        mask: InputMask
    });

    return mergeProps(
        {
            value: hasFocus ? inputValueRef.current: toLongString(value),
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            ref
        },
        maskProps
    );
}
