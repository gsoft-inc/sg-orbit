import "./DateRangeInput.css";

import { Box } from "../../box";
import { CalendarIcon, VerticalDotsIcon } from "../../icons";
import { ComponentProps, ElementType, ForwardedRef, SyntheticEvent, useCallback, useRef, useState } from "react";
import { CrossButton, IconButton } from "../../button";
import { Divider } from "../../divider";
import {
    InteractionStatesProps,
    Keys,
    augmentElement,
    cssModule,
    forwardRef,
    isNil,
    isNumber,
    mergeProps,
    omitProps,
    useAutoFocus,
    useControllableState,
    useEventCallback,
    useMergedRefs
} from "../../shared";
import { Item } from "../../collection";
import { Menu, MenuTrigger } from "../../menu";
import { useDateInput } from "./useDateInput";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface DatePreset {
    text: string;
    startDate: Date;
    endDate: Date;
}

export interface InnerDateRangeInputProps extends InteractionStatesProps { /**
     * @ignore
     */
    name?: string;
    /**
     * A controlled start date value.
     */
    startDate?: Date;
    /**
     * A controlled end date value.
     */
    endDate?: Date;
    /**
     * The initial value of start date.
     */
    defaultStartDate?: Date;
    /**
     * The initial value of end date.
     */
    defaultEndDate?: Date;
    /**
     * Temporary text that occupies both date inputs when they are empty.
     */
    placeholder?: string;
    /**
     * The minimum (inclusive) date.
     */
    minDate?: Date;
    /**
     * The maximum (inclusive) date.
     */
    maxDate?: Date;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the date(s) are / is applied.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {Object} startDate - Selected start date.
     * @param {Object} endDate - Selected end date.
     * @returns {void}
     */
    onDatesChange?: (event: SyntheticEvent, startDate: Date, endDate: Date) => void;
    /**
     * Array of pre-determined dates range.
     */
    presets?: DatePreset[];
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

const DateInput = forwardRef<any, "input">(({
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
        minDate,
        maxDate,
        onChange,
        onDateChange,
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

export function InnerDateRangeInput(props: InnerDateRangeInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();

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
        name,
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

    const startDateRef = useRef<HTMLElement>();
    const endDateRef = useRef<HTMLElement>();

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

    const handleKeyDown = useEventCallback(event => {
        if (event.key === Keys.esc) {
            event.preventDefault();
            handleClearDates(event);
        }
    });

    const hasValue = !isNil(startDate) || !isNil(endDate);

    const inputMarkup = (
        <Box
            onKeyDown={handleKeyDown}
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
            role={!isInField ? "group" : undefined}
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
                name={!isNil(name) ? `${name}-start-date` : undefined}
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
                name={!isNil(name) ? `${name}-end-date` : undefined}
                tabIndex={hasFocus ? "0" : "-1"}
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
        <MenuTrigger>
            <IconButton
                shape="rounded"
                color="secondary"
                condensed
                aria-label="Date presets"
            >
                <VerticalDotsIcon />
            </IconButton>
            <Menu onSelectionChange={handleSelectPreset}>
                {presets.map((x, index) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Item key={index.toString()}>
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

    // HACK: Returning the augmented element in a fragment to comply with react-docgen.
    return (
        <>
            {augmentElement(container, mergeProps(
                rest,
                {
                    as,
                    ref: forwardedRef
                }
            ))}
        </>
    );
}

export const DateRangeInput = forwardRef<InnerDateRangeInputProps>((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

export type DateRangeInputProps = ComponentProps<typeof DateRangeInput>

DateRangeInput.displayName = "DateRangeInput";
