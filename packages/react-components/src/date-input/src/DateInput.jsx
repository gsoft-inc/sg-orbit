import { CalendarIcon } from "../../icons";
import { TextInput } from "../../input";
import { bool, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useState } from "react";
import { isNil } from "lodash";
import { mergeProps, useControllableState, useEventCallback, useMergedRefs, useRefState } from "../../shared";
import { useMaskedInput } from "./useMaskedInput";

/*
TODO:
    - try an inline date range with a button / select for presets
*/

const propTypes = {
    /**
     * A controlled value.
     */
    value: object,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: object,
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder: string,
    /**
     * The minimum (inclusive) date.
     */
    minDate: object,
    /**
     * The maximum (inclusive) date.
     */
    maxDate: object,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not the input is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the input is readonly.
     */
    readOnly: bool,
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const InputMask = [/[0-3]/, /[0-9]/, "/", /[0-1]/, /[0-9]/, "/", /\d/, /\d/, /\d/, /\d/];

function toDate(rawValue) {
    const parts = rawValue.split("/");

    const year = parseInt(parts[2]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[0]);

    return new Date(year, month > 0 ? month -1 : month, day);
}

function toString(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    return `${day.length === 1 ? `0${day}` : day}/${month.length === 1 ? `0${month}` : month}/${year}`;
}

export function InnerDateInput({
    value: valueProp,
    defaultValue,
    minDate,
    maxDate,
    onChange,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}) {
    const [inputValueRef, setInputValue] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, "", {
        onChange: useCallback((newValue, { isInitial, isControlled }) => {
            // Keep input value in sync with the initial or controlled value and keep the value string form to faciliate internal manipulation.
            if (isInitial || isControlled) {
                const rawValue = newValue ? toString(newValue) : "";
                setInputValue(rawValue);

                return rawValue;
            }
        }, [setInputValue])
    });

    const [inputElement, setInputElement] = useState();

    const ref = useMergedRefs(setInputElement, forwardedRef);

    const reset = useCallback(() => {
        // Reset the value to the last selected one.
        if (value !== inputValueRef.current) {
            setInputValue(value ?? "", true);
        }
    }, [value, inputValueRef, setInputValue]);

    const commit = useCallback((event, rawValue) => {
        if (value !== rawValue) {
            let newDate = null;

            if (rawValue !== "") {
                if (!isNaN(Date.parse(rawValue))) {
                    newDate = toDate(rawValue);
                } else {
                    reset();

                    return;
                }
            }

            if (!isNil(onChange)) {
                onChange(event, newDate);
            }

            setValue(rawValue);
        }

        setInputValue(rawValue, true);
    }, [onChange, value, setValue, setInputValue, reset]);

    const handleChange = useEventCallback(event => {
        const newValue = event.target.value;

        if (newValue === "") {
            commit(event, newValue);
        } else if (newValue.length === InputMask.length) {
            if (!isNil(minDate) || !isNil(maxDate)) {
                const newDate = toDate(newValue);

                if (minDate > newDate) {
                    commit(event, toString(minDate));
                } else if (maxDate < newDate) {
                    commit(event, toString(maxDate));
                } else {
                    commit(event, newValue);
                }
            }
        } else {
            setInputValue(newValue, true);
        }
    });

    const handleBlur = useEventCallback(() => {
        reset();
    });

    const maskProps = useMaskedInput({
        inputElement,
        mask: InputMask
    });

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    value: inputValueRef.current,
                    onChange: handleChange,
                    onBlur: handleBlur,
                    icon: <CalendarIcon />,
                    wrapperProps: mergeProps(
                        wrapperProps ?? {},
                        {
                            className: "o-ui-date-input"
                        }
                    ),
                    as,
                    ref
                },
                maskProps
            )}
        />
    );
}

InnerDateInput.propTypes = propTypes;

export const DateInput = forwardRef((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

DateInput.displayName = "DateInput";
