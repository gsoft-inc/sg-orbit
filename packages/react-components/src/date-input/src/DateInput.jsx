import { CalendarIcon } from "../../icons";
import { TextInput } from "../../input";
import { bool, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useCallback, useState } from "react";
import { isNil } from "lodash";
import { mergeProps, useControllableState, useEventCallback, useMergedRefs, useRefState } from "../../shared";
import { useMaskedInput } from "./useMaskedInput";

/*
TODO:
    - value & defaultValue should be object (or Date);
    - mix & max date

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
    onChange,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}) {
    const [inputValueRef, setInputValue] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, "", {
        onChange: useCallback((newValue, { isInitial, isControlled }) => {
            const rawValue = newValue ? toString(newValue) : "";

            // Keep input value in sync with the initial or controlled value.
            if (isInitial || isControlled) {
                setInputValue(rawValue);
            }

            return rawValue;
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
        let newDate = null;

        if (rawValue !== "") {
            if (!isNaN(Date.parse(rawValue))) {
                newDate = toDate(rawValue);
            } else {
                reset();
            }
        }

        if (value !== newDate) {
            if (!isNil(onChange)) {
                onChange(event, newDate);
            }

            setValue(newDate);
        }
    }, [onChange, value, setValue, reset]);

    // TODO: Consider adding a defer before commit. If doing so might need to add an additional function layer to include the chars count in the defer. deferreddCommit.
    const handleChange = useEventCallback(event => {
        const newValue = event.target.value;

        if (newValue === "" || newValue.length === InputMask.length) {
            commit(event, newValue);
        }

        setInputValue(newValue, true);
    });

    // TODO: If adding a defer, don't forget to flush the defer before comparing the value of a reset.
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

    // const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    // const handleChange = useEventCallback(event => {
    //     // console.log(event.target.value);

    //     const newValue = event.target.value;

    //     // if (!isNil(onChange)) {
    //     //     if ()
    //     // }

    //     setValue(newValue);
    // });

    // return (
    //     <InputMask
    //         {...mergeProps(
    //             rest,
    //             {
    //                 value: inputValue,
    //                 onChange: handleChange,
    //                 mask: MaskFormat,
    //                 maskChar: MaskChar,
    //                 ref: forwardedRef
    //             }
    //         )}
    //     >
    //         {maskProps => (
    //             <TextInput
    //                 {...mergeProps(
    //                     rest,
    //                     {
    //                         icon: <CalendarIcon />,
    //                         wrapperProps: mergeProps(
    //                             wrapperProps ?? {},
    //                             {
    //                                 className: "o-ui-date-input"
    //                             }
    //                         ),
    //                         as
    //                     },
    //                     maskProps
    //                 )}
    //             />
    //         )}
    //     </InputMask>
    // );
}

InnerDateInput.propTypes = propTypes;

export const DateInput = forwardRef((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

DateInput.displayName = "DateInput";
