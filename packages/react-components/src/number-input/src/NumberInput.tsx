import "./NumberInput.css";

import {
    AriaLabelingProps,
    DomProps,
    InteractionStatesProps,
    cssModule,
    forwardRef,
    isNil,
    mergeClasses,
    mergeProps,
    omitProps,
    useChainedEventCallback,
    useControllableState,
    useEventCallback
} from "../../shared";
import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { CaretIcon } from "../../icons";
import { ChangeEvent, ComponentProps, ElementType, FocusEvent, ForwardedRef, MouseEvent, ReactElement, SyntheticEvent, useCallback } from "react";
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
     * Clamps the input value between min & max boundaries.
     */
    // clampValue?: boolean;
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState?: "valid" | "invalid";
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {number} value - The new value.
     * @returns {void}
     */
    onValueChange?: (event: SyntheticEvent, value: number) => void;
    /**
     * @ignore
     */
    onChange?: (event: SyntheticEvent) => void;
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

export interface SpinnerProps extends ComponentProps<"div"> {
    onIncrement?: (event: MouseEvent) => void;
    onDecrement?: (event: MouseEvent) => void;
    onFocus?: (event: FocusEvent) => void;
    disabled?: boolean;
}

function Spinner({
    onIncrement,
    onDecrement,
    onFocus,
    disabled,
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
                disabled={disabled}
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
                disabled={disabled}
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
        value,
        defaultValue,
        placeholder,
        min,
        max,
        step = 1,
        required,
        validationState,
        onValueChange,
        onChange,
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

    const [inputValue, setValue] = useControllableState(value, defaultValue, null);

    const updateValue = (event: SyntheticEvent, newValue: number) => {
        if (newValue !== inputValue) {
            if (!isNil(onValueChange)) {
                onValueChange(event, newValue);
            }

            setValue(newValue);
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

    const clampValue = (event: SyntheticEvent, newValue: number) => {
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
    };

    const applyStep = (event: SyntheticEvent, factor: number) => {
        if (!isNil(inputValue)) {
            const precision = Math.max(countDecimalPlaces(inputValue), countDecimalPlaces(step));
            const newValue = toFixed(inputValue + factor * step, precision);

            clampValue(event, newValue);
        } else {
            updateValue(event, factor * step);
        }
    };

    const handleChange = useChainedEventCallback(onChange, (event: ChangeEvent<HTMLInputElement>, newValue: string) => {
        clampValue(event, toNumber(newValue));
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

    const { wrapperProps, inputProps, inputRef } = useInput({
        cssModule: "o-ui-number-input",
        id,
        value: !isNil(inputValue) ? inputValue : "",
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

    const iconMarkup = useInputIcon(icon, { disabled });

    const content = (
        <>
            {iconMarkup}
            <input
                {...mergeProps(
                    rest,
                    {
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
                disabled={readOnly || disabled}
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
                }
            )}
        >
            {content}
        </Box>
    );
}

export const NumberInput = forwardRef<InnerNumberInputProps>((props, ref) => (
    <InnerNumberInput {...props} forwardedRef={ref} />
));

export type NumberInputProps = ComponentProps<typeof NumberInput>;

NumberInput.displayName = "NumberInput";
