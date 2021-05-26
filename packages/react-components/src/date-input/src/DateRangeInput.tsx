import "./DateRangeInput.css";

import { Box } from "../../box";
import { ChangeEvent, ComponentProps, ElementType, FocusEvent, ForwardedRef, KeyboardEvent, SyntheticEvent, useCallback, useImperativeHandle, useRef, useState } from "react";
import { ClearInputGroupContext, InputGroup, useInputGroupProps } from "../../input-group";
import { CrossButton, IconButton } from "../../button";
import { DisclosureArrow } from "../../disclosure";
import { Divider } from "../../divider";
import {
    InteractionStatesProps,
    Keys,
    augmentElement,
    cssModule,
    forwardRef,
    isNil,
    isNilOrEmpty,
    isNumber,
    mergeProps,
    omitProps,
    useAutoFocus,
    useControllableState,
    useEventCallback,
    useFocusWithin,
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

export interface InnerDateRangeInputProps extends InteractionStatesProps {
    /**
     * @ignore
     */
    name?: string;
    /**
     * A controlled start date value.
     */
    startDate?: Date | null;
    /**
     * A controlled end date value.
     */
    endDate?: Date | null;
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
    min?: Date;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
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
     * @ignore
     */
    onFocus?: (event: FocusEvent) => void;
    /**
     * @ignore
     */
    onBlur?: (event: FocusEvent) => void;
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
    placeholder = "dd/mm/yyyy",
    required,
    validationState,
    min,
    max,
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
        min,
        max,
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

const RangeInput = forwardRef<any>((props, ref) => {
    const [inputGroupProps] = useInputGroupProps();

    const {
        startDate,
        endDate,
        placeholder,
        min,
        max,
        required,
        validationState,
        onDatesChange,
        onFocus,
        onBlur,
        autoFocus,
        fluid,
        disabled,
        readOnly,
        active,
        focus = false,
        hover,
        name,
        isInField,
        ...rest
    } = mergeProps(
        props,
        inputGroupProps
    );

    const [hasFocus, setHasFocus] = useState(focus);

    const containerRef = useRef<HTMLElement>();
    const startDateRef = useRef<HTMLInputElement>();
    const endDateRef = useRef<HTMLInputElement>();

    useImperativeHandle(ref, () => {
        const element = containerRef.current;

        element.focus = () => {
            startDateRef.current?.focus();
        };

        return element;
    });

    const handleStartDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(endDate) && newDate > endDate) {
            newDate = endDate;
        }

        onDatesChange(event, newDate, endDate);

        if (!isNil(newDate)) {
            endDateRef.current?.focus();
        }
    });

    const handleEndDateInputValueChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        // @ts-ignore
        const newCharacter = event.nativeEvent.data;

        // If the new character is not a digit, we don't want to do anything since the new character will be removed by the mask input.
        // The digit is test with a regex because this is how our mask input third party is doing it and we want to be consistant.
        if (/\d/.test(newCharacter)) {
            if (isNilOrEmpty(event.target.value)) {
                startDateRef.current?.focus();
            }
        }
    });

    const handleEndDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(startDate) && newDate < startDate) {
            newDate = startDate;
        }

        onDatesChange(event, startDate, newDate);
    });

    const handleClearDates = useEventCallback((event: SyntheticEvent) => {
        onDatesChange(event, null, null);

        startDateRef?.current.focus();
    });

    const handleContainerKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.esc) {
            event.preventDefault();
            handleClearDates(event);
        }
    });

    const handleEndDateKeyDown = useEventCallback((event: KeyboardEvent) => {
        if (event.key === Keys.backspace) {
            if (isNilOrEmpty(endDateRef.current?.value)) {
                startDateRef.current?.focus();
            }
        }
    });

    const focusWithinProps = useFocusWithin({
        onFocus: useEventCallback((event: FocusEvent) => {
            if (!isNil(onFocus)) {
                onFocus(event);
            }

            setHasFocus(true);
        }),
        onBlur: useEventCallback((event: FocusEvent) => {
            if (!isNil(onBlur)) {
                onBlur(event);
            }

            setHasFocus(false);
        })
    });

    const hasValue = !isNil(startDate) || !isNil(endDate);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    onKeyDown: handleContainerKeyDown,
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
                    role: !isInField ? "group" : undefined,
                    ref: containerRef
                },
                focusWithinProps
            )}
        >
            <DateInput
                value={startDate}
                placeholder={placeholder}
                required={required}
                validationState={validationState}
                min={min}
                max={max}
                onDateChange={handleStartDateChange}
                autoFocus={autoFocus}
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
                min={min}
                max={max}
                onChange={handleEndDateInputValueChange}
                onDateChange={handleEndDateChange}
                onKeyDown={handleEndDateKeyDown}
                disabled={disabled}
                readOnly={readOnly}
                name={!isNil(name) ? `${name}-end-date` : undefined}
                tabIndex={hasFocus ? 0 : -1}
                ref={endDateRef}
            />
            {hasValue && !disabled && !readOnly &&
                <ClearInputGroupContext>
                    <CrossButton
                        onClick={handleClearDates}
                        size="xs"
                        condensed
                        className="o-ui-date-range-input-clear-button"
                        aria-label="Clear dates"
                    />
                </ClearInputGroupContext>}
        </Box>
    );
});

export function InnerDateRangeInput(props: InnerDateRangeInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps, isInField] = useFieldInputProps();
    const [inputGroupProps] = useInputGroupProps();

    const {
        startDate: startDateProp,
        endDate: endDateProp,
        defaultStartDate,
        defaultEndDate,
        placeholder,
        min,
        max,
        required,
        validationState,
        onDatesChange,
        onFocus,
        onBlur,
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
        fieldProps,
        inputGroupProps
    );

    const [startDate, setStartDate] = useControllableState(startDateProp, defaultStartDate, null);
    const [endDate, setEndDate] = useControllableState(endDateProp, defaultEndDate, null);

    const containerRef = useRef<HTMLElement>();
    const rangeRef = useRef<HTMLInputElement>();

    useImperativeHandle(forwardedRef, () => {
        // For presets, used the input group container as the ref element.
        if (!isNil(presets)) {
            const element = containerRef.current;

            element.focus = () => {
                rangeRef.current?.focus();
            };

            return element;
        }

        return rangeRef.current;
    });

    const applyDates = useCallback((event: SyntheticEvent, newStartDate: Date, newEndDate: Date) => {
        if (startDate !== newStartDate || endDate !== newEndDate) {
            if (!isNil(onDatesChange)) {
                onDatesChange(event, newStartDate, newEndDate);
            }

            setStartDate(newStartDate);
            setEndDate(newEndDate);
        }
    }, [onDatesChange, startDate, setStartDate, endDate, setEndDate]);

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, keys: string[]) => {
        const index = parseInt(keys[0]);
        const preset = presets[index];

        if (!isNil(preset)) {
            applyDates(event, preset.startDate, preset.endDate);

            rangeRef.current?.focus();
        }
    });

    const rangeMarkup = (
        <RangeInput
            startDate={startDate}
            endDate={endDate}
            placeholder={placeholder}
            min={min}
            max={max}
            required={required}
            validationState={validationState}
            onDatesChange={applyDates}
            onFocus={onFocus}
            onBlur={onBlur}
            autoFocus={autoFocus}
            fluid={fluid}
            disabled={disabled}
            readOnly={readOnly}
            active={active}
            focus={focus}
            hover={hover}
            name={name}
            isInField={isInField}
            ref={rangeRef}
        />
    );

    if (!isNil(presets)) {
        return (
            <InputGroup
                {...mergeProps(
                    rest,
                    {
                        as,
                        ref: containerRef
                    }
                )}
            >
                {rangeMarkup}
                <MenuTrigger>
                    <IconButton
                        disabled={disabled || readOnly}
                        aria-label="Date presets"
                    >
                        <DisclosureArrow />
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
            </InputGroup>
        );
    }

    return (
        <ClearInputGroupContext>
            {augmentElement(rangeMarkup, mergeProps(
                rest,
                {
                    as,
                    ref: containerRef
                }
            ))}
        </ClearInputGroupContext>
    );
}

export const DateRangeInput = forwardRef<InnerDateRangeInputProps>((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

export type DateRangeInputProps = ComponentProps<typeof DateRangeInput>;

DateRangeInput.displayName = "DateRangeInput";
