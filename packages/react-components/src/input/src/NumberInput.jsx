import "./NumberInput.css";

import { Box } from "../../box";
import { CarretIcon } from "../../icons";
import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses, mergeProps, omitProps, useChainedEventCallback, useControllableState, useEventCallback } from "../../shared";
import { forwardRef, useCallback } from "react";
import { isNil } from "lodash";
import { useFieldInputProps } from "../../field";
import { useInput } from "./useInput";
import { useInputIcon } from "./useInputContent";
import { useMemo } from "react";
import { useToolbarProps } from "../../toolbar";
import { wrappedInputPropsAdapter } from "./wrappedInputPropsAdapter";

const propTypes = {
    /**
     * A controlled value.
     */
    value: number,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: number,
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder: string,
    /**
     * The minimum value of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
     */
    min: number,
    /**
     * The maximum value of the input. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
     */
    max: number,
    /**
     * The step used to increment or decrement the value. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).
     */
    step: number,
    /**
     * Clamps the input value between min & max boundaries.
     */
    clampValue: bool,
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {number} value - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["outline", "transparent"]),
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * [Icon](/?path=/docs/icon--default-story) component rendered before the value.
     */
    icon: element,
    /**
     * Whether or not the input take up the width of its container.
     */
    fluid: bool,
    /**
     * Whether or not to render a loader.
     */
    loading: bool,
    /**
     * Whether or not the input is disabled.
     */
    disabled: bool,
    /**
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function Spinner({
    onIncrement,
    onDecrement,
    onFocus,
    disabled,
    ...rest
}) {
    const handleIncrement = useEventCallback(event => {
        onIncrement(event);
    });

    const handleDecrement = useEventCallback(event => {
        onDecrement(event);
    });

    return (
        <div
            {...rest}
            className="o-ui-number-input-spinner"
            aria-hidden="true"
        >
            <button
                onClick={handleIncrement}
                className="o-ui-number-input-spinner-increment"
                type="button"
                tabIndex="-1"
                disabled={disabled}
                onFocus={onFocus}
            >
                <CarretIcon size="sm" />
            </button>
            <button
                onClick={handleDecrement}
                className="o-ui-number-input-spinner-decrement"
                type="button"
                tabIndex="-1"
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

function countDecimalPlaces(value) {
    return (value.toString().split(".")[1] || []).length;
}

function toNumber(value) {
    const result = parseFloat(value);

    if (isNaN(result)) {
        return null;
    }

    return result;
}

function toFixed(value, precision) {
    return parseFloat(value.toFixed(precision));
}

export function InnerNumberInput(props) {
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
        onBlur,
        variant = "outline",
        autoFocus,
        autoFocusDelay,
        icon,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        className,
        wrapperProps: userWrapperProps,
        as = "div",
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(toolbarProps, ["orientation"]),
        wrappedInputPropsAdapter(fieldProps)
    );

    const [inputValue, setValue] = useControllableState(value, defaultValue, null);

    const updateValue = (event, newValue) => {
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

    const isInRange = useMemo(() => validateRange(inputValue, min , max).isInRange, [inputValue, min, max, validateRange]);

    const clamp = event => {
        const { isAboveMax, isBelowMin } = validateRange(inputValue);

        if (isBelowMin) {
            updateValue(event, min);
        } else if (isAboveMax) {
            updateValue(event, max);
        }
    };

    const applyStep = (event, factor) => {
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

    const handleBlur = useChainedEventCallback(onBlur, event => {
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

    const {
        wrapperProps: { className: wrapperClassName, ...wrapperProps },
        inputProps,
        inputRef
    } = useInput({
        cssModule: "o-ui-number-input",
        id,
        value: !isNil(inputValue) ? inputValue : "",
        placeholder,
        required,
        validationState: !isInRange ? "invalid" : validationState,
        onChange: handleChange,
        variant,
        type: "number",
        autoFocus,
        autoFocusDelay,
        disabled,
        readOnly,
        fluid,
        loading,
        active,
        focus,
        hover,
        className,
        wrapperProps: userWrapperProps,
        forwardedRef
    });

    const iconMarkup = useInputIcon(icon, { disabled });

    const content = (
        <>
            {iconMarkup}
            <input
                {...rest}
                {...inputProps}
                onBlur={handleBlur}
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
            {...wrapperProps}
            className={mergeClasses(
                cssModule(
                    "o-ui-input",
                    iconMarkup && "has-icon"
                ),
                wrapperClassName
            )}
            as={as}
        >
            {content}
        </Box>
    );
}

InnerNumberInput.propTypes = propTypes;

export const NumberInput = forwardRef((props, ref) => (
    <InnerNumberInput {...props} forwardedRef={ref} />
));

NumberInput.displayName = "NumberInput";
