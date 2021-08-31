import "./NumberInput.css";

import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { CaretIcon } from "../../icons";
import {
    ChangeEvent,
    ChangeEventHandler,
    ComponentProps,
    FocusEvent,
    FocusEventHandler,
    MouseEvent,
    ReactElement,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useMemo
} from "react";
import {
    InteractionProps,
    InternalProps,
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
import { useFieldInputProps } from "../../field";
import { useInput, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { useInputGroupProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

const DefaultElement = "div";

export interface InnerNumberInputProps extends InternalProps, InteractionProps, Omit<ComponentProps<"input">, "onChange" | "autoFocus"> {
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: number;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
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
     * @ignore
     */
    onBlur?: FocusEventHandler;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * @ignore
     */
    onFocus?: FocusEventHandler;
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {number} value - The new value.
     * @returns {void}
     */
    onValueChange?: (event: SyntheticEvent, value: number) => void;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * The step used to increment or decrement the value.
     */
    step?: number;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * A controlled value.
     */
    value?: number | null;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
}

interface SpinnerProps extends ComponentProps<"div"> {
    disableDecrement?: boolean;
    disableIncrement?: boolean;
    onDecrement?: (event: MouseEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    onIncrement?: (event: MouseEvent) => void;
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
        <div
            {...mergeProps(
                rest,
                {
                    "aria-hidden": true,
                    className: "o-ui-number-input-spinner"
                }
            )}
        >
            <button
                aria-label="Increment value"
                className="o-ui-number-input-spinner-increment"
                disabled={disableIncrement}
                onClick={handleIncrement}
                onFocus={onFocus}
                tabIndex={-1}
                type="button"
            >
                <CaretIcon size="xs" />
            </button>
            <button
                aria-label="Decrement value"
                className="o-ui-number-input-spinner-decrement"
                disabled={disableDecrement}
                onClick={handleDecrement}
                onFocus={onFocus}
                tabIndex={-1}
                type="button"
            >
                <CaretIcon
                    className="o-ui-rotate-180"
                    size="xs"
                />
            </button>
        </div>
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
        id,
        value: valueProp,
        defaultValue,
        placeholder,
        min,
        max,
        step = 1,
        required,
        validationState,
        onValueChange,
        onChange,
        onFocus,
        onBlur,
        autoFocus,
        icon,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledBy,
        wrapperProps: wrapperPropsProp,
        as = DefaultElement,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        wrappedInputPropsAdapter(contextualProps)
    );

    if (isNil(ariaLabel) && isNil(ariaLabelledBy) && isNil(placeholder)) {
        console.error("An input component must either have an \"aria-label\" attribute, an \"aria-labelledby\" attribute or a \"placeholder\" attribute.");
    }

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
    });

    const handleDecrement = useEventCallback((event: MouseEvent) => {
        applyStep(event, -1);
    });

    const handleStepperFocus = useEventCallback(() => {
        inputRef.current.focus();
    });

    const focusWithinProps = useFocusWithin({
        onBlur: useEventCallback(event => {
            clampOrSetValue(event, toNumber(inputValueRef.current));

            if (!isNil(onBlur)) {
                onBlur(event);
            }
        }),
        onFocus: useEventCallback(event => {
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
        fluid,
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

    const content = (
        <>
            {iconMarkup}
            <input
                {...mergeProps(
                    rest,
                    {
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledBy,
                        max,
                        min,
                        step
                    },
                    inputProps
                )}
            />
            <Spinner
                aria-hidden={loading}
                disableDecrement={readOnly || disabled || (!isNil(numericInputValue) && numericInputValue <= min)}
                disableIncrement={readOnly || disabled || (!isNil(numericInputValue) && numericInputValue >= max)}
                onDecrement={handleDecrement}
                onFocus={handleStepperFocus}
                onIncrement={handleIncrement}
            />
        </>
    );

    return (
        <Box
            {...mergeProps(
                wrapperPropsProp,
                wrapperProps,
                {
                    as,
                    className: mergeClasses(
                        cssModule(
                            "o-ui-input",
                            iconMarkup && "has-icon",
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

export const NumberInput = forwardRef<any, OmitInternalProps<InnerNumberInputProps>>((props, ref) => (
    <InnerNumberInput {...props} forwardedRef={ref} />
));

export type NumberInputProps = ComponentProps<typeof NumberInput>;
