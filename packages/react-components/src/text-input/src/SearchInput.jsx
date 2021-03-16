import "./SearchInput.css";

import { CrossButton } from "../../button";
import { Keys, forwardRef, isNilOrEmpty, mergeProps, useControllableState, useEventCallback } from "../../shared";
import { TextInput } from "../../text-input";
import { bool, element, elementType, func, number, object, oneOf, oneOfType, string } from "prop-types";

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
     * Additional props to render on the wrapper element.
     */
    wrapperProps: object,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

export function InnerSearchInput({
    value: valueProp,
    defaultValue,
    wrapperProps,
    as = "input",
    forwardedRef,
    ...rest
}) {
    const [value, setValue] = useControllableState(valueProp, defaultValue, "");

    const handleChange = useEventCallback(event => {
        setValue(event.target.value);
    });

    const handleKeyDown = useEventCallback(event => {
        if (event.key === Keys.esc) {
            event.preventDefault();
            setValue("");
        }
    });

    const handleClearButtonClick = useEventCallback(() => {
        setValue("");
    });

    const clearButtonMarkup = !isNilOrEmpty(value) && (
        <CrossButton
            onClick={handleClearButtonClick}
            size="xs"
            condensed
            className="o-ui-search-input-clear-button"
            aria-label="Clear value"
        />
    );

    return (
        <TextInput
            {...mergeProps(
                rest,
                {
                    value,
                    button: clearButtonMarkup || undefined,
                    onChange: handleChange,
                    onKeyDown: handleKeyDown,
                    wrapperProps: mergeProps(wrapperProps ?? {}, {
                        className: "o-ui-search-input"
                    }),
                    type: "search",
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
