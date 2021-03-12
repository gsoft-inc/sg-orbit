import "./DateRangeInput.css";

import { Box } from "../../box";
import { CalendarIcon, FilterIcon, VerticalDotsIcon } from "../../icons";
import { Divider } from "../../divider";
import { IconButton } from "../../button";
import { Item } from "../../placeholders";
import { Menu, MenuTrigger } from "../../menu";
import { arrayOf, bool, elementType, func, number, object, oneOf, oneOfType, shape, string } from "prop-types";
import { cssModule, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { forwardRef, useCallback, useState } from "react";
import { isNil } from "lodash";
import { useDateInput } from "./useDateInput";

/*
TODO:
    - try an inline date range with a button / select for presets
    - hidden field pour form
    - required?

    - start date cannot be > end date. When it happens, autofix
    - presets
    - roving focus
    - support toolbar
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
    minDate,
    maxDate,
    onDateChange,
    ...rest
}, ref) => {
    const dateProps = useDateInput({
        value,
        placeholder,
        minDate,
        maxDate,
        onDateChange,
        forwardedRef: ref
    });

    return (
        <input
            {...mergeProps(
                rest,
                {
                    placeholder,
                    className: "o-ui-date-range-input-date-input",
                    type: "text",
                    ref
                },
                dateProps
            )}
        />
    );
});

function InnerDateRangeInput({
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
}) {
    const [startDate, setStartDate] = useControllableState(startDateProp, defaultStartDate, null);
    const [endDate, setEndDate] = useControllableState(endDateProp, defaultEndDate, null);
    const [hasFocus, setHasFocus] = useState(focus);

    const handleStartDateChange = useEventCallback((event, newDate) => {
        setStartDate(newDate);
    });

    const handleEndDateChange = useEventCallback((event, newDate) => {
        setEndDate(newDate);
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
            setStartDate(preset.startDate);
            setEndDate(preset.endDate);
        }
    });

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

    // TODO: je switch le "rest" selon mon main container

    return (
        <Box className="o-ui-date-range-input-group">
            <Box
                {...mergeProps(
                    rest,
                    {
                        className: cssModule(
                            "o-ui-date-range-input",
                            validationState,
                            fluid && "fluid",
                            disabled && "disabled",
                            readOnly && "readonly",
                            active && "active",
                            hasFocus && "focus",
                            hover && "hover"
                        ),
                        role: "presentation",
                        as,
                        ref: forwardedRef
                    }
                )}
            >
                <CalendarIcon className="o-ui-date-range-input-icon" />
                <DateInput
                    value={startDate}
                    placeholder={placeholder}
                    onDateChange={handleStartDateChange}
                    minDate={minDate}
                    onFocus={handleDateFocus}
                    onBlur={handleDateBlur}
                />
                <Divider orientation="vertical" className="o-ui-date-range-input-divider" />
                <DateInput
                    value={endDate}
                    placeholder={placeholder}
                    onDateChange={handleEndDateChange}
                    maxDate={maxDate}
                    onFocus={handleDateFocus}
                    onBlur={handleDateBlur}
                />
            </Box>
            {presetsMarkup}
        </Box>
    );
}

InnerDateRangeInput.propTypes = propTypes;

export const DateRangeInput = forwardRef((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

DateRangeInput.displayName = "DateRangeInput";
