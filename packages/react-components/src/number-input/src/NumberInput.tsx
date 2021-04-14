import "./NumberInput.css";

import { Box, BoxProps as BoxPropsForDocumentation } from "../../box";
import { CarretIcon } from "../../icons";
import { ComponentProps, ElementType, ForwardedRef, ReactElement, SyntheticEvent, useCallback } from "react";
import { DomProps, InteractionStatesProps, cssModule, forwardRef, mergeProps, omitProps, useControllableState, useEventCallback } from "../../shared";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useInput, useInputIcon, wrappedInputPropsAdapter } from "../../input";
import { useMemo } from "react";
import { useToolbarProps } from "../../toolbar";

// used to generate BoxProps instead of any in the auto-generated documentation
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BoxProps extends BoxPropsForDocumentation { }

export interface InnerNumberInputProps extends DomProps, InteractionStatesProps {
    /**
     * A controlled value.
     */
    value?: number;
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
    clampValue?: boolean;
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
    onChange?: (event: SyntheticEvent, value: number) => void;
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
    onIncrement?: (event: SyntheticEvent) => void;
    onDecrement?: (event: SyntheticEvent) => void;
    onFocus?: (event: SyntheticEvent) => void;
    disabled?: boolean;
}

function Spinner({
    onIncrement,
    onDecrement,
    onFocus,
    disabled,
    ...rest
}: SpinnerProps) {
    const handleIncrement = useEventCallback(event => {
        onIncrement(event);
    });

    const handleDecrement = useEventCallback(event => {
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
            >
                <CarretIcon size="xs" />
            </button>
            <button
                onClick={handleDecrement}
                className="o-ui-number-input-spinner-decrement"
                type="button"
                tabIndex={-1}
                disabled={disabled}
                onFocus={onFocus}
            >
                <CarretIcon
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

    const {
        id,
        value,
        defaultValue,
        placeholder,
        min,
        max,
        step = 1,
        clampValue = true,
        required,
        validationState,
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
        wrapperProps: wrapperPropsProp,
        as = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        omitProps(wrappedInputPropsAdapter(fieldProps), ["size"])
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, null);

    const updateValue = (event: SyntheticEvent, newValue: number) => {
        setValue(newValue);

        if (!isNil(onChange)) {
            onChange(event, newValue);
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

    const isInRange = useMemo(() => validateRange(inputValue).isInRange, [inputValue, validateRange]);

    const clamp = (event: SyntheticEvent) => {
        const { isAboveMax, isBelowMin } = validateRange(inputValue);

        if (isBelowMin) {
            updateValue(event, min);
        } else if (isAboveMax) {
            updateValue(event, max);
        }
    };

    const applyStep = (event: SyntheticEvent, factor: number) => {
        if (!isNil(inputValue)) {
            const precision = Math.max(countDecimalPlaces(inputValue), countDecimalPlaces(step));
            const newValue = toFixed(inputValue + factor * step, precision);

            const { isInRange: inRange } = validateRange(newValue);

            if (inRange) {
                updateValue(event, newValue);
            }
            else {
                if (clampValue) {
                    clamp(event);
                }
            }
        } else {
            updateValue(event, factor * step);
        }
    };

    const handleChange = useEventCallback(event => {
        const newValue = toNumber(event.target.value);

        updateValue(event, newValue);
    });

    const handleBlur = useEventCallback(event => {
        if (clampValue) {
            clamp(event);
        }
    });

    const handleIncrement = useEventCallback(event => {
        applyStep(event, 1);
    });

    const handleDecrement = useEventCallback(event => {
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
        validationState: !isInRange ? "invalid" : validationState,
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
                    inputProps,
                    {
                        onBlur: handleBlur
                    }
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
                    className: cssModule(
                        "o-ui-input",
                        iconMarkup && "has-icon"
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
