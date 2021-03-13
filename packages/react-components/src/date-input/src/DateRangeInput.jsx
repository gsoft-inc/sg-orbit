import "./DateRangeInput.css";

import { Box } from "../../box";
import { CalendarIcon, VerticalDotsIcon } from "../../icons";
import { CrossButton, IconButton } from "../../button";
import { Divider } from "../../divider";
import { Item } from "../../placeholders";
import { Menu, MenuTrigger } from "../../menu";
import { arrayOf, bool, elementType, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { augmentElement } from "../../../dist";
import { cssModule, mergeProps, omitProps, useAutoFocus, useControllableState, useEventCallback, useMergedRefs } from "../../shared";
import { forwardRef, useCallback, useRef, useState } from "react";
import { isNil, isNumber } from "lodash";
import { useDateInput } from "./useDateInput";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

/*
TODO:
    - accept a name prop and append "start" and "end"
    - hidden field pour form
    - roving focus
    - clear inputs on esc??? one at a time?
*/

const PresetShape = {
    text: string.isRequired,
    startDate: object.isRequired,
    endDate: object.isRequired
};

const propTypes = {
    /**
     * A controlled start date value.
     */
    startDate: object,
    /**
     * A controlled end date value.
     */
    endDate: object,
    /**
     * The initial value of start date.
     */
    defaultStartDate: object,
    /**
     * The initial value of end date.
     */
    defaultEndDate: object,
    /**
     * Temporary text that occupies both date inputs when they are empty.
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
     * Called when the date(s) are / is applied.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Object} startDate - Selected start date.
     * @param {Object} endDate - Selected end date.
     * @returns {void}
     */
    onDatesChange: func,
    /**
     * Array of pre-determined dates range.
     */
    presets: arrayOf(shape(PresetShape)),
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
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const DateInput = forwardRef(({
    value,
    placeholder,
    required,
    validationState,
    minDate,
    maxDate,
    onChange,
    onDateChange,
    autoFocus,
    disabled,
    readOnly,
    ...rest
}, ref) => {
    const inputRef = useMergedRefs(ref);

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus || disabled || readOnly,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const dateProps = useDateInput({
        value,
        placeholder,
        minDate,
        maxDate,
        onChange,
        onDateChange,
        autoFocus,
        forwardedRef: inputRef
    });

    return (
        <input
            {...mergeProps(
                rest,
                {
                    placeholder,
                    className: "o-ui-date-range-input-date-input",
                    type: "text",
                    disabled,
                    readOnly,
                    "aria-required": required ? true : undefined,
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    ref: inputRef
                },
                dateProps
            )}
        />
    );
});

function InnerDateRangeInput(props) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();

    const {
        startDate: startDateProp,
        endDate: endDateProp,
        defaultStartDate,
        defaultEndDate,
        placeholder,
        minDate,
        maxDate,
        required,
        validationState,
        onDatesChange,
        presets,
        autoFocus,
        fluid,
        disabled,
        readOnly,
        active,
        focus = false,
        hover,
        as = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        fieldProps
    );

    const [startDate, setStartDate] = useControllableState(startDateProp, defaultStartDate, null);
    const [endDate, setEndDate] = useControllableState(endDateProp, defaultEndDate, null);
    const [hasFocus, setHasFocus] = useState(focus);

    const startDateRef = useRef();
    const endDateRef = useRef();

    const applyDates = useCallback((event, newStartDate, newEndDate) => {
        if (startDate !== newStartDate || endDate !== newEndDate) {
            if (!isNil(onDatesChange)) {
                onDatesChange(event, newStartDate, newEndDate);
            }

            setStartDate(newStartDate);
            setEndDate(newEndDate);
        }
    }, [onDatesChange, startDate, setStartDate, endDate, setEndDate]);

    const handleStartDateChange = useEventCallback((event, newDate) => {
        if (!isNil(newDate) && !isNil(endDate) && newDate > endDate) {
            newDate = endDate;
        }

        applyDates(event, newDate, endDate);

        if (!isNil(newDate)) {
            // Jump to end date.
            endDateRef?.current.focus();
        }
    });

    const handleEndDateInputValueChange = useEventCallback(event => {
        if (event.target.value === "") {
            // Jump to start date.
            startDateRef?.current.focus();
        }
    });

    const handleEndDateChange = useEventCallback((event, newDate) => {
        if (!isNil(newDate) && !isNil(startDate) && newDate < startDate) {
            newDate = startDate;
        }

        applyDates(event, startDate, newDate);
    });

    const handleDateFocus = useEventCallback(() => {
        setHasFocus(true);
    });

    const handleDateBlur = useEventCallback(() => {
        setHasFocus(false);
    });

    const handleSelectPreset = useEventCallback((event, key) => {
        const preset = presets[key];

        if (!isNil(preset)) {
            applyDates(event, preset.startDate, preset.endDate);
        }
    });

    const handleClearDates = useEventCallback(event => {
        applyDates(event, null, null);

        startDateRef?.current.focus();
    });

    const hasValue = !isNil(startDate) || !isNil(endDate);

    const inputMarkup = (
        <Box
            className={cssModule(
                "o-ui-date-range-input",
                validationState,
                fluid && "fluid",
                disabled && "disabled",
                readOnly && "readonly",
                active && "active",
                hasFocus && "focus",
                hover && "hover"
            )}
            role="group"
        >
            <CalendarIcon className="o-ui-date-range-input-icon" />
            <DateInput
                value={startDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                minDate={minDate}
                onDateChange={handleStartDateChange}
                autoFocus={autoFocus}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                disabled={disabled}
                readOnly={readOnly}
                ref={startDateRef}
            />
            <Divider orientation="vertical" className="o-ui-date-range-input-divider" />
            <DateInput
                value={endDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                maxDate={maxDate}
                onChange={handleEndDateInputValueChange}
                onDateChange={handleEndDateChange}
                onFocus={handleDateFocus}
                onBlur={handleDateBlur}
                disabled={disabled}
                readOnly={readOnly}
                ref={endDateRef}
            />
            {hasValue && !disabled && !readOnly && <CrossButton
                onClick={handleClearDates}
                size="xs"
                condensed
                className="o-ui-date-range-input-clear-button"
                aria-label="Clear dates"
            />}
        </Box>
    );

    const presetsMarkup = !isNil(presets) && (
        <MenuTrigger onSelect={handleSelectPreset}>
            <IconButton
                shape="rounded"
                color="secondary"
                condensed
                aria-label="Date presets"
            >
                <VerticalDotsIcon />
            </IconButton>
            <Menu>
                {presets.map((x, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Item key={index}>
                        {x.text}
                    </Item>
                ))}
            </Menu>
        </MenuTrigger>
    );

    const container = !isNil(presets) ? (
        <Box
            className="o-ui-date-range-input-group"
            role="presentation"
        >
            {inputMarkup}
            {presetsMarkup}
        </Box>
    ) : inputMarkup;

    return augmentElement(container, mergeProps(
        rest,
        {
            as,
            ref: forwardedRef
        }
    ));
}

InnerDateRangeInput.propTypes = propTypes;

export const DateRangeInput = forwardRef((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

DateRangeInput.displayName = "DateRangeInput";
