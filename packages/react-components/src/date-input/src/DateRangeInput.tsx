import "./DateRangeInput.css";

import { AbstractInputProps } from "../../input";
import { Box } from "../../box";
import { ButtonPresets } from "./ButtonPresets";
import {
    ChangeEvent,
    ComponentProps,
    FocusEvent,
    KeyboardEvent,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useImperativeHandle,
    useMemo,
    useRef,
    useState
} from "react";
import { ClearInputGroupContext, InputGroup, useInputGroupProps } from "../../input-group";
import { CrossButton } from "../../button";
import { DateInputMask, useDateInput } from "./useDateInput";
import { Divider } from "../../divider";
import { HtmlInput } from "../../html";
import {
    Keys,
    OmitInternalProps,
    augmentElement,
    cssModule,
    isNil,
    isNilOrEmpty,
    isNumber,
    mergeProps,
    omitProps,
    useAutoFocus,
    useControllableState,
    useDisposables,
    useEventCallback,
    useFocusWithin,
    useMergedRefs
} from "../../shared";
import { MenuPresets } from "./MenuPresets";
import { areEqualDates, toMidnightDate } from "./dateUtils";
import { useFieldInputProps } from "../../field";
import { useToolbarProps } from "../../toolbar";

export interface DateRangePreset {
    endDate: Date;
    startDate: Date;
    text: string;
}

const DefaultElement = "div";

export interface InnerDateRangeInputProps extends Omit<AbstractInputProps<typeof DefaultElement>, "max" | "min"> {
    /* eslint-disable typescript-sort-keys/interface */
    /**
     * The initial value of start date.
     */
    defaultStartDate?: Date;
    /**
     * The initial value of end date.
     */
    defaultEndDate?: Date;
    /**
     * Whether or not the input is disabled.
     */
    disabled?: boolean;
    /**
     * A controlled end date value.
     */
    endDate?: Date | null;
    /* eslint-enable typescript-sort-keys/interface */
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * The maximum (inclusive) date.
     */
    max?: Date;
    /**
     * The minimum (inclusive) date.
     */
    min?: Date;
    /**
     * @ignore
     */
    name?: string;
    /**
     * Called when the date(s) are / is applied.
     * @param {SyntheticEvent} event - React's original event.
     * @param {Object} startDate - Selected start date.
     * @param {Object} endDate - Selected end date.
     * @returns {void}
     */
    onDatesChange?: (event: SyntheticEvent, startDate: Date, endDate: Date) => void;
    /**
     * Temporary text that occupies both date inputs when they are empty.
     */
    placeholder?: string;
    /**
     * Array of pre-determined dates range.
     */
    presets?: DateRangePreset[];
    /**
     * The presets style to use.
     */
    presetsVariant?: "compact" | "expanded";
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
     * A controlled start date value.
     */
    startDate?: Date | null;
}

const DateInput = forwardRef<HTMLInputElement, any>(({
    autoFocus,
    disabled,
    max,
    min,
    onChange,
    onDateChange,
    placeholder = "dd/mm/yyyy",
    readOnly,
    required,
    validationState,
    value,
    ...rest
}, ref) => {
    const inputRef = useMergedRefs(ref);

    useAutoFocus(inputRef, {
        delay: isNumber(autoFocus) ? autoFocus : undefined,
        isDisabled: !autoFocus || disabled || readOnly
    });

    const dateProps = useDateInput({
        forwardedRef: inputRef,
        max,
        min,
        onChange,
        onDateChange,
        value
    });

    return (
        <HtmlInput
            {...mergeProps(
                rest,
                {
                    "aria-invalid": validationState === "invalid" ? true : undefined,
                    "aria-required": required ? true : undefined,
                    className: "o-ui-date-range-input-date-input",
                    disabled,
                    placeholder,
                    readOnly,
                    ref: inputRef,
                    type: "text"
                },
                dateProps
            )}
        />
    );
});

const RangeInput = forwardRef<any, any>((props, ref) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, isInField] = useFieldInputProps();
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        active,
        as = "div",
        autoFocus,
        disabled,
        /* eslint-disable sort-destructure-keys/sort-destructure-keys */
        endDate,
        fluid,
        /* eslint-enable sort-destructure-keys/sort-destructure-keys */
        focus = false,
        hover,
        max,
        min,
        name,
        onBlur,
        onDatesChange,
        onFocus,
        placeholder,
        readOnly,
        required,
        startDate,
        validationState,
        ...rest
    } = mergeProps(
        props,
        inputGroupProps
    );

    const [hasFocus, setHasFocus] = useState(focus);

    const containerRef = useRef<HTMLElement>();
    const startDateRef = useRef<HTMLInputElement>();
    const endDateRef = useRef<HTMLInputElement>();

    const disposables = useDisposables();

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

        if (!isNil(onDatesChange)) {
            onDatesChange(event, newDate, endDate);
        }
    });

    const handleEndDateChange = useEventCallback((event: ChangeEvent<HTMLInputElement>, newDate) => {
        if (!isNil(newDate) && !isNil(startDate) && newDate < startDate) {
            newDate = startDate;
        }

        if (!isNil(onDatesChange)) {
            onDatesChange(event, startDate, newDate);
        }
    });

    const handleStartDateInputValueChange = useEventCallback((event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === DateInputMask.length) {
            // Defering because useDateInput is used in controlled mode and otherwise the value will not be updated when the value is clamped.
            disposables.requestAnimationFrame(() => {
                endDateRef.current?.focus();
            });
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

    const handleClearDates = useEventCallback((event: SyntheticEvent) => {
        // Deferring because otherwise the start date will not be blured which might result in not clearing the input properly.
        disposables.requestAnimationFrame(() => {
            startDateRef?.current.focus();
        });

        if (!isNil(onDatesChange)) {
            onDatesChange(event, null, null);
        }
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
        onBlur: useEventCallback((event: FocusEvent) => {
            setHasFocus(false);

            if (!isNil(onBlur)) {
                onBlur(event);
            }
        }),
        onFocus: useEventCallback((event: FocusEvent) => {
            setHasFocus(true);

            if (!isNil(onFocus)) {
                onFocus(event);
            }
        })
    });

    const hasValue = !isNil(startDate) || !isNil(endDate);

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as,
                    className: cssModule(
                        "o-ui-date-range-input",
                        validationState,
                        fluid && "fluid",
                        disabled && "disabled",
                        readOnly && "readonly",
                        active && "active",
                        hasFocus && "focus",
                        hover && "hover",
                        isInGroup && "in-group"
                    ),
                    onKeyDown: handleContainerKeyDown,
                    ref: containerRef,
                    role: !isInField ? "group" : undefined
                },
                focusWithinProps
            )}
        >
            <DateInput
                autoFocus={autoFocus}
                disabled={disabled}
                max={max}
                min={min}
                name={!isNil(name) ? `${name}-start-date` : undefined}
                onChange={handleStartDateInputValueChange}
                onDateChange={handleStartDateChange}
                placeholder={placeholder}
                readOnly={readOnly}
                ref={startDateRef}
                required={required}
                validationState={validationState}
                value={startDate}
            />
            <Divider className="o-ui-date-range-input-divider" orientation="vertical" />
            <DateInput
                disabled={disabled}
                max={max}
                min={min}
                name={!isNil(name) ? `${name}-end-date` : undefined}
                onChange={handleEndDateInputValueChange}
                onDateChange={handleEndDateChange}
                onKeyDown={handleEndDateKeyDown}
                placeholder={placeholder}
                readOnly={readOnly}
                ref={endDateRef}
                required={required}
                tabIndex={hasFocus ? 0 : -1}
                validationState={validationState}
                value={endDate}
            />
            {hasValue && !disabled && !readOnly &&
                <ClearInputGroupContext>
                    <CrossButton
                        aria-label="Clear dates"
                        className="o-ui-date-range-input-clear-button"
                        condensed
                        onClick={handleClearDates}
                        size="xs"
                    />
                </ClearInputGroupContext>}
        </Box>
    );
});

export function InnerDateRangeInput(props: InnerDateRangeInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const {
        active,
        as = DefaultElement,
        autoFocus,
        defaultEndDate,
        defaultStartDate,
        disabled,
        endDate: endDateProp,
        fluid,
        focus = false,
        forwardedRef,
        hover,
        max,
        min,
        name,
        onBlur,
        onDatesChange,
        onFocus,
        placeholder,
        presets,
        presetsVariant = "compact",
        readOnly,
        required,
        startDate: startDateProp,
        validationState,
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
        // For presets, used the group container as the ref element.
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
        if (!areEqualDates(startDate, newStartDate) || !areEqualDates(endDate, newEndDate)) {
            setStartDate(newStartDate);
            setEndDate(newEndDate);

            if (!isNil(onDatesChange)) {
                onDatesChange(event, newStartDate, newEndDate);
            }
        }
    }, [onDatesChange, startDate, setStartDate, endDate, setEndDate]);

    const handleSelectPreset = useEventCallback((event: SyntheticEvent, newIndex: number) => {
        const preset = presets[newIndex];

        if (!isNil(preset)) {
            applyDates(event, preset.startDate, preset.endDate);
        }
    });

    const presetsProps = useMemo(() => {
        if (!isNil(presets)) {
            const selectedIndex = presets.findIndex(x =>
                areEqualDates(toMidnightDate(x.startDate), toMidnightDate(startDate)) &&
                areEqualDates(toMidnightDate(x.endDate), toMidnightDate(endDate))
            );

            return {
                onSelectionChange: handleSelectPreset,
                selectedIndex: selectedIndex !== -1 ? selectedIndex : undefined,
                values: presets.map(x => x.text)
            };
        }

        return null;
    }, [presets, startDate, endDate, handleSelectPreset]);

    const rangeMarkup = (
        <RangeInput
            active={active}
            autoFocus={autoFocus}
            disabled={disabled}
            endDate={endDate}
            fluid={fluid}
            focus={focus}
            hover={hover}
            max={max}
            min={min}
            name={name}
            onBlur={onBlur}
            onDatesChange={applyDates}
            onFocus={onFocus}
            placeholder={placeholder}
            readOnly={readOnly}
            ref={rangeRef}
            required={required}
            startDate={startDate}
            validationState={validationState}
        />
    );

    if (!isNil(presetsProps)) {
        return presetsVariant === "compact"
            ? (
                <InputGroup
                    {...mergeProps(
                        rest,
                        {
                            as,
                            disabled,
                            fluid,
                            readOnly,
                            ref: containerRef
                        }
                    )}
                >
                    {rangeMarkup}
                    <MenuPresets {...presetsProps} />
                </InputGroup>
            )
            : (
                <Box
                    {...mergeProps(
                        rest,
                        {
                            as,
                            className: cssModule(
                                "o-ui-date-range-input-button-presets",
                                fluid && "fluid"
                            ),
                            ref: containerRef
                        }
                    )}
                >
                    {rangeMarkup}
                    {!disabled && !readOnly && (
                        <ButtonPresets {...presetsProps} />
                    )}
                </Box>
            );
    }

    return (
        <ClearInputGroupContext>
            {augmentElement(rangeMarkup, mergeProps(
                rest,
                {
                    as,
                    className: isInGroup ? "o-ui-date-range-input-in-group" : undefined,
                    ref: containerRef
                }
            ))}
        </ClearInputGroupContext>
    );
}

export const DateRangeInput = forwardRef<any, OmitInternalProps<InnerDateRangeInputProps>>((props, ref) => (
    <InnerDateRangeInput {...props} forwardedRef={ref} />
));

export type DateRangeInputProps = ComponentProps<typeof DateRangeInput>;
