import { CheckableContext, augmentElement, useControllableState, useEventCallback } from "../../shared";
import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { useGroupInput } from "../../input";
import { useToolbarProps } from "../../toolbar";

const propTypes = {
    /**
   * The value of the checkbox group.
   */
    value: oneOfType([arrayOf(string), arrayOf(number)]),
    /**
     * The initial value of `value`.
     */
    defaultValue: oneOfType([arrayOf(string), arrayOf(number)]),
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether the group should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when any of the children is checked or unchecked..
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string[] | number[]} value - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Orientation of the children.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The space between elements.
     */
    gap: oneOfType([oneOf([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]), string]),
    /**
     * Whether elements are forced onto one line or can wrap onto multiple lines
     */
    wrap: bool,
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Invert the order of the checkbox and the label of all children.
     */
    reverse: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func]).isRequired
};

const defaultProps = {
    orientation: "horizontal",
    as: "div"
};

function arrayToggleValue(array, value) {
    if (isNil(array)) {
        return [value];
    }

    const index = array.indexOf(value);

    if (index !== -1) {
        const newArray = [...array];
        newArray.splice(index, 1);

        return newArray;
    }

    return [...array, value];
}

export function InnerCheckboxGroup(props) {
    const {
        value,
        defaultValue,
        required,
        validationState,
        onChange,
        orientation,
        gap,
        wrap,
        size,
        reverse,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = useToolbarProps(props, { addNavigationMode: false });

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

    const {
        groupProps,
        itemProps
    } = useGroupInput({
        required,
        validationState,
        orientation,
        gap,
        wrap,
        size,
        reverse,
        disabled,
        ref: forwardedRef
    });

    const handleCheck = useEventCallback((event, newValue) => {
        const newCheckedValue = arrayToggleValue(checkedValue, newValue);

        setCheckedValue(newCheckedValue);

        if (!isNil(onChange)) {
            onChange(event, newCheckedValue);
        }
    });

    const items = isFunction(children)
        ? children({ checkedValue })
        : children;

    return (
        <Flex
            data-testid="checkbox-group"
            {...rest}
            {...groupProps}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(items, x => {
                    return augmentElement(x, {
                        ...itemProps,
                        role: "checkbox"
                    });
                })}
            </CheckableContext.Provider>
        </Flex>
    );
}

InnerCheckboxGroup.propTypes = propTypes;
InnerCheckboxGroup.defaultProps = defaultProps;

export const CheckboxGroup = forwardRef((props, ref) => (
    <InnerCheckboxGroup {...props} forwardedRef={ref} />
));

