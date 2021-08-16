import "./NumberInput.css";

import {
    AriaLabelingProps,
    DomProps,
    InteractionStatesProps,
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
import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { CaretIcon } from "../../icons";
import {
    ChangeEvent,
    ChangeEventHandler,
    ComponentProps,
    ElementType,
    FocusEvent,
    FocusEventHandler,
    ForwardedRef,
    MouseEvent,
    ReactElement,
    SyntheticEvent,
    forwardRef,
    useCallback,
    useMemo
} from "react";
import { useFieldInputProps } from "../../field";
import { useInput, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { useInputGroupProps } from "../../input-group";
import { useToolbarProps } from "../../toolbar";

// Used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerNumberInputProps extends DomProps, InteractionStatesProps, AriaLabelingProps {
    /**
     * A controlled value.
     */
    value?: number | null;
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue?: number;
    /**
     * Whether or not the input is readonly.
     */
    readOnly?: boolean;
    /**
     * Whether or not a user input is required before form submission.
     */
    required?: boolean;
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder?: string;
    /**
     * The minimum value of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
     */
    min?: number;
    /**
     * The maximum value of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
     */
    max?: number;
    /**
     * The step used to increment or decrement the value. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
     */
    step?: number;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original event.
     * @param {number} value - The new value.
     * @returns {void}
     */
    onValueChange?: (event: SyntheticEvent, value: number) => void;
    /**
     * @ignore
     */
    onChange?: ChangeEventHandler;
    /**
     * @ignore
     */
    onFocus?: FocusEventHandler;
    /**
     * @ignore
     */
    onBlur?: FocusEventHandler;
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus?: boolean | number;
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon?: ReactElement;
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid?: boolean;
    /**
     * Whether or not to render a loader.
     */
    loading?: boolean;
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps?: Partial<BoxProps>;
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
    * @ignore
    */
    forwardedRef: ForwardedRef<any>;
}

interface SpinnerProps extends ComponentProps<"div"> {
    onIncrement?: (event: MouseEvent) => void;
    onDecrement?: (event: MouseEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    disableIncrement?: boolean;
    disableDecrement?: boolean;
}

function Spinner({
    onIncrement,
    onDecrement,
    onFocus,
    disableIncrement,
    disableDecrement,
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
                    className: "o-ui-number-input-spinner",
                    "aria-hidden": true
                }
            )}
        >
            <button
                onClick={handleIncrement}
                className="o-ui-number-input-spinner-increment"
                type="button"
                tabIndex={-1}
                disabled={disableIncrement}
                onFocus={onFocus}
                aria-label="Increment value"
            >
                <CaretIcon size="xs" />
            </button>
            <button
                onClick={handleDecrement}
                className="o-ui-number-input-spinner-decrement"
                type="button"
                tabIndex={-1}
                disabled={disableDecrement}
                onFocus={onFocus}
                aria-label="Decrement value"
            >
                <CaretIcon
                    size="xs"
                    className="o-ui-rotate-180"
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
        as = "div",
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
        onChange: useCallback((newValue, { isInitial, isControlled }) => {
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
            isInRange: !isAboveMax && !isBelowMin,
            isAboveMax,
            isBelowMin
        };
    }, [min, max]);

    const clampOrSetValue = (event: SyntheticEvent, newValue: number) => {
        if (!isNil(newValue)) {
            const { isInRange, isBelowMin, isAboveMax } = validateRange(newValue);

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
        onFocus: useEventCallback(event => {
            if (!isNil(onFocus)) {
                onFocus(event);
            }
        }),
        onBlur: useEventCallback(event => {
            clampOrSetValue(event, toNumber(inputValueRef.current));

            if (!isNil(onBlur)) {
                onBlur(event);
            }
        })
    });

    const { wrapperProps, inputProps, inputRef } = useInput({
        cssModule: "o-ui-number-input",
        id,
        value: inputValueRef.current,
        placeholder,
        required,
        validationState,
        onChange: handleChange,
        type: "number",
        autoFocus,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        forwardedRef
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
                        min,
                        max,
                        step,
                        "aria-label": ariaLabel,
                        "aria-labelledby": ariaLabelledBy
                    },
                    inputProps
                )}
            />
            <Spinner
                onIncrement={handleIncrement}
                onDecrement={handleDecrement}
                onFocus={handleStepperFocus}
                disableIncrement={readOnly || disabled || (!isNil(numericInputValue) && numericInputValue >= max)}
                disableDecrement={readOnly || disabled || (!isNil(numericInputValue) && numericInputValue <= min)}
                aria-hidden={loading}
            />
        </>
    );

    return (
        <Box
            {...mergeProps(
                wrapperPropsProp,
                wrapperProps,
                {
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
                    ),
                    as
                },
                focusWithinProps
            )}
        >
            {content}
        </Box>
    );
}

export const NumberInput = forwardRef<any, Omit<InnerNumberInputProps, "forwardedRef">>((props, ref) => (
    <InnerNumberInput {...props} forwardedRef={ref} />
));

export type NumberInputProps = ComponentProps<typeof NumberInput>;

NumberInput.displayName = "NumberInput";
