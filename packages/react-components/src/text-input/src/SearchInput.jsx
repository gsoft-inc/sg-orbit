import "./SearchInput.css";

import { CrossButton } from "../../button";
import { Keys, forwardRef, isNilOrEmpty, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { MagnifierIcon } from "../../icons";
import { TextInput } from "../../text-input";
import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { isNil, isUndefined } from "lodash";
import { useCallback } from "react";

const propTypes = {
    /**
     * A controlled value.
     */
    value: string,
    /**
     * The default value of `value` when uncontrolled.
     */
    defaultValue: string,
    /**
     * Temporary text that occupies the input when it is empty.
     */
    placeholder: string,
    /**
     * Whether or not a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether or not the input should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the input value change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string} value - The new input value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Whether or not the input should autofocus on render.
     */
    autoFocus: oneOfType([bool, number]),
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
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerSearchInput({
    value,
    defaultValue,
    onChange,
    onKeyDown,
    icon,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}) {
    const [inputValue, setValue] = useControllableState(value, defaultValue, "");

    const updateValue = useCallback((event, newValue) => {
        if (!isNil(onChange)) {
            onChange(event, newValue);
        }

        setValue(newValue);
    }, [onChange, setValue]);

    const clear = useCallback(event => {
        updateValue(event, "");
    }, [updateValue]);

    const handleChange = useEventCallback(event => {
        updateValue(event, event.target.value);
    });

    const handleKeyDown = useEventCallback(event => {
        if (!isNil(onKeyDown)) {
            onKeyDown(event);
        }

        if (!event.isPropagationStopped()) {
            if (event.key === Keys.esc) {
                event.preventDefault();
                clear(event);
            }
        }
    });

    const handleClear = useEventCallback(event => {
        clear(event);
    });

    const clearButtonMarkup = !isNilOrEmpty(inputValue) && (
        <CrossButton
            onClick={handleClear}
            size="xs"
            condensed
            className="o-ui-search-input-clear-button"
            title="Clear value"
            aria-label="Clear value"
        />
    );

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    value: inputValue,
                    button: clearButtonMarkup || undefined,
                    onChange: handleChange,
                    onKeyDown: handleKeyDown,
                    icon: isUndefined(icon) ? <MagnifierIcon /> : icon,
                    wrapperProps: mergeProps(wrapperProps ?? {}, {
                        className: "o-ui-search-input"
                    }),
                    type: "search",
                    autoCorrect: "off",
                    spellCheck: "false",
                    autoComplete: "off",
                    as,
                    ref: forwardedRef
                }
            )}
        />
    );
}

InnerSearchInput.propTypes = propTypes;

export const SearchInput = forwardRef((props, ref) => (
    <InnerSearchInput {...props} forwardedRef={ref} />
));

SearchInput.displayName = "SearchInput";
