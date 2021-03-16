import "./DateInput.css";

import { CalendarIcon } from "../../icons";
import { TextInput } from "../../text-input";
import { bool, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useDateInput } from "./useDateInput";

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
     * Called when the date change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {object} date - The new date value.
     * @returns {void}
     */
    onDateChange: func,
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid: bool,
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerDateInput({
    value,
    defaultValue,
    minDate,
    maxDate,
    onChange,
    onDateChange,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}) {

    const dateProps = useDateInput({
        value,
        defaultValue,
        minDate,
        maxDate,
        onChange,
        onDateChange,
        forwardedRef
    });

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    icon: <CalendarIcon />,
                    wrapperProps: mergeProps(
                        wrapperProps ?? {},
                        {
                            className: "o-ui-date-input"
                        }
                    ),
                    as
                },
                dateProps
            )}
        />
    );
}

InnerDateInput.propTypes = propTypes;

export const DateInput = forwardRef((props, ref) => (
    <InnerDateInput {...props} forwardedRef={ref} />
));

DateInput.displayName = "DateInput";
