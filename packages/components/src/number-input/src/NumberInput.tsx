import { AbstractInputProps, adaptInputStylingProps, useInput, useInputIcon, useInputSpinner } from "../../input";
import { Box, BoxProps } from "../../box";
import { ChangeEvent, ComponentProps, FocusEvent, FocusEventHandler, MouseEvent, ReactElement, Ref, SyntheticEvent, forwardRef, useCallback, useMemo } from "react";
import { Div, HtmlButton } from "../../html";
import {
    OmitInternalProps,
    cssModule,
    isNil,
    isNilOrEmpty,
    mergeClasses,
    mergeProps,
    omitProps,
    useChainedEventCallback,
    useControllableState,
    useEventCallback,
    useFocusWithin,
    useRefState
} from "../../shared";
import { ResponsiveProp, useResponsiveValue } from "../../styling";

import { ChevronMinorIcon } from "../../icons";
import { useFieldInputProps } from "../../field";
import { useInputGroupProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

const DefaultElement = "input";

export interface InnerNumberInputProps extends Omit<AbstractInputProps<typeof DefaultElement>, "max" | "min" | "step" | "value"> {
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: ResponsiveProp<boolean>;
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon?: ReactElement;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * The maximum value of the input.
     */
    max?: number;
    /**
     * The minimum value of the input.
     */
    min?: number;
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {number} value - The new value.
     * @returns {void}
     */
    onValueChange?: (event: SyntheticEvent, value: number) => void;
    /**
     * The step used to increment or decrement the value.
     */
    step?: number;
    /**
     * A controlled value.
     */
    value?: number | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
}

interface SpinnerProps extends Omit<ComponentProps<"div">, "ref"> {
    disableDecrement?: boolean;
    disableIncrement?: boolean;
    onDecrement?: (event: MouseEvent) => void;
    onFocus?: FocusEventHandler;
    onIncrement?: (event: MouseEvent) => void;
    ref?: Ref<any>;
}

function Spinner({
    disableDecrement,
    disableIncrement,
    onDecrement,
    onFocus,
    onIncrement,
    ...rest
}: SpinnerProps) {
    const handleIncrement = useEventCallback((event: MouseEvent) => {
        onIncrement(event);
    });

    const handleDecrement = useEventCallback((event: MouseEvent) => {
        onDecrement(event);
    });

    return (
        <Div
            {...mergeProps(
                rest,
                {
                    "aria-hidden": true,
                    className: "o-ui-number-input-spinner"
                }
            )}
        >
            <HtmlButton
                aria-label="Increment value"
                className="o-ui-number-input-spinner-increment"
                disabled={disableIncrement}
                onClick={handleIncrement}
                onFocus={onFocus}
                tabIndex={-1}
                type="button"
            >
                <ChevronMinorIcon
                    transform="rotate(270deg)"
                />
            </HtmlButton>
            <HtmlButton
                aria-label="Decrement value"
                className="o-ui-number-input-spinner-decrement"
                disabled={disableDecrement}
                onClick={handleDecrement}
                onFocus={onFocus}
                tabIndex={-1}
                type="button"
            >
                <ChevronMinorIcon
                    transform="rotate(90deg)"
                />
            </HtmlButton>
        </Div>
    );
}

function countDecimalPlaces(value: number) {
    return (value.toString().split(".")[1] || []).length;
}

function toNumber(value: string) {
    if (isNilOrEmpty(value)) {
        return null;
    }

    const result = parseFloat(value);

    if (isNaN(result)) {
        return null;
    }

    return result;
}

function toFixed(value: number, precision: number) {
    return parseFloat(value.toFixed(precision));
}

export function InnerNumberInput(props: InnerNumberInputProps) {
    const [toolbarProps] = useToolbarProps();
    const [fieldProps] = useFieldInputProps();
    const [inputGroupProps, isInGroup] = useInputGroupProps();

    const contextualProps = mergeProps(
        {},
        omitProps(toolbarProps, ["orientation"]),
        fieldProps,
        inputGroupProps
    );

    const {
        active,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        as = DefaultElement,
        autoFocus,
        defaultValue,
        disabled,
        fluid,
        focus,
        forwardedRef,
        hover,
        icon,
        id,
        loading,
        max,
        min,
        onBlur,
        onChange,
        onFocus,
        onValueChange,
        placeholder,
        readOnly,
        required,
        step = 1,
        validationState,
        value: valueProp,
        wrapperProps: { as: wrapperAs = "div", ...userWrapperProps } = {},
        ...rest
    } = adaptInputStylingProps(props, contextualProps);

    if (isNil(ariaLabel) && isNil(ariaLabelledBy) && isNil(placeholder)) {
        console.error("An input component must either be wrapped inside a `<Field>` component with a `<Label>`, have an \"aria-label\" attribute, an \"aria-labelledby\" attribute or a \"placeholder\" attribute.");
    }

    const fluidValue = useResponsiveValue(fluid);

    const [inputValueRef, setInputValue] = useRefState("");

    const [value, setValue] = useControllableState(valueProp, defaultValue, null, {
        onChange: useCallback((newValue, { isControlled, isInitial }) => {
            // Keep input value "mostly" in sync with the initial or controlled value.
            if (isInitial || isControlled) {
                const rawValue = isNil(newValue) ? "" : newValue.toString();

                setInputValue(rawValue);
            }

            return undefined;
        }, [setInputValue])
    });

    const updateValue = (event: SyntheticEvent, newValue: number) => {
        if (newValue !== value) {
            setValue(newValue);

            if (!isNil(onValueChange)) {
                onValueChange(event, newValue);
            }
        }

        const newInputValue = isNil(newValue) ? "" : newValue.toString();

        if (newInputValue !== inputValueRef.current) {
            setInputValue(newInputValue, true);
        }
    };

    const validateRange = useCallback(newValue => {
        let isAboveMax = false;
        let isBelowMin = false;

        if (!isNil(newValue)) {
            if (!isNil(max) && newValue > max) {
                isAboveMax = true;
            } else if (!isNil(min) && newValue < min) {
                isBelowMin = true;
            }
        }

        return {
            isAboveMax,
            isBelowMin,
            isInRange: !isAboveMax && !isBelowMin
        };
    }, [min, max]);

    const clampOrSetValue = (event: SyntheticEvent, newValue: number) => {
        if (!isNil(newValue)) {
            const { isAboveMax, isBelowMin, isInRange } = validateRange(newValue);

            if (isInRange) {
                updateValue(event, newValue);
            } else {
                if (isBelowMin) {
                    updateValue(event, min);
                } else if (isAboveMax) {
                    updateValue(event, max);
                }
            }
        }
    };

    const applyStep = (event: SyntheticEvent, factor: number) => {
        const inputValue = toNumber(inputValueRef.current);

        if (!isNil(inputValue)) {
            const precision = Math.max(countDecimalPlaces(inputValue), countDecimalPlaces(step));
            const newValue = toFixed(inputValue + factor * step, precision);

            clampOrSetValue(event, newValue);
        } else {
            clampOrSetValue(event, factor * step);
        }
    };

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value, true);
    });

    const handleIncrement = useEventCallback((event: MouseEvent) => {
        applyStep(event, 1);
        inputRef.current.focus();
    });

    const handleDecrement = useEventCallback((event: MouseEvent) => {
        applyStep(event, -1);
        inputRef.current.focus();
    });

    const focusWithinProps = useFocusWithin({
        onBlur: useEventCallback((event: FocusEvent<HTMLInputElement>) => {
            clampOrSetValue(event, toNumber(inputValueRef.current));

            if (!isNil(onBlur)) {
                onBlur(event);
            }
        }),
        onFocus: useEventCallback((event: FocusEvent<HTMLInputElement>) => {
            if (!isNil(onFocus)) {
                onFocus(event);
            }
        })
    });

    const { inputProps, inputRef, wrapperProps } = useInput({
        active,
        autoFocus,
        cssModule: "o-ui-number-input",
        disabled,
        fluid: fluidValue,
        focus,
        forwardedRef,
        hover,
        id,
        loading,
        onChange: handleChange,
        placeholder,
        readOnly,
        required,
        type: "number",
        validationState,
        value: inputValueRef.current
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const numericInputValue = useMemo(() => toNumber(inputValueRef.current), [inputValueRef.current]);

    const iconMarkup = useInputIcon(icon, { disabled });

    const loadingMarkup = useInputSpinner(loading);

    const content = (
        <>
            {iconMarkup}
            <Box
                {...mergeProps(
                    rest,
                    {
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledBy,
                        as,
                        max,
                        min,
                        step
                    },
                    inputProps
                )}
            />
            <Spinner
                aria-hidden={loading}
                aria-label="Loading..."
                disableDecrement={readOnly || disabled || (!isNil(numericInputValue) && numericInputValue <= min)}
                disableIncrement={readOnly || disabled || (!isNil(numericInputValue) && numericInputValue >= max)}
                onDecrement={handleDecrement}
                onIncrement={handleIncrement}
            />
            {loadingMarkup}
        </>
    );

    return (
        <Box
            {...mergeProps(
                userWrapperProps,
                wrapperProps,
                {
                    as: wrapperAs,
                    className: mergeClasses(
                        cssModule(
                            "o-ui-input",
                            iconMarkup && "has-icon",
                            disabled && "disabled",
                            isInGroup && "in-group"
                        ),
                        cssModule(
                            "o-ui-number-input",
                            isInGroup && "in-group"
                        )
                    )
                },
                focusWithinProps
            )}
        >
            {content}
        </Box>
    );
}

InnerNumberInput.defaultElement = DefaultElement;

/**
 * A number input is used to let the user enter a numeric value.
 *
 * [Documentation](https://orbit.sharegate.design/?path=/docs/number-input--default-story)
*/
export const NumberInput = forwardRef<any, OmitInternalProps<InnerNumberInputProps>>((props, ref) => (
    <InnerNumberInput {...props} forwardedRef={ref} />
));

export type NumberInputProps = ComponentProps<typeof NumberInput>;
