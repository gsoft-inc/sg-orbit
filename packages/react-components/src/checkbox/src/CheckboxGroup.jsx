import "./CheckboxGroup.css";

import { CheckableContext, augmentElement, mergeProps, omitProps, useControllableState, useEventCallback } from "../../shared";
import { Children, forwardRef } from "react";
import { ClearFieldContext, useFieldInput } from "../../field";
import { ClearToolbarContext, useToolbar } from "../../toolbar";
import { Flex } from "../../layout";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { useGroupInput } from "../../input";

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
    size: oneOf(["sm", "md", "lg"]),
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
    const toolbarProps = useToolbar();

    const { isInField, ...fieldProps } = useFieldInput();

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
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        toolbarProps,
        omitProps(fieldProps, ["fluid"])
    );

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

    const { groupProps, itemProps } = useGroupInput({
        cssModule: "o-ui-checkbox-group",
        required,
        validationState,
        orientation: orientation ?? "horizontal",
        gap,
        wrap,
        size,
        reverse,
        disabled,
        isInField,
        className,
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
            <ClearToolbarContext>
                <ClearFieldContext>
                    <CheckableContext.Provider
                        value={{
                            onCheck: handleCheck,
                            checkedValue,
                            role: "checkbox"
                        }}
                    >
                        {Children.map(items, x => {
                            return augmentElement(x, itemProps);
                        })}
                    </CheckableContext.Provider>
                </ClearFieldContext>
            </ClearToolbarContext>
        </Flex>
    );
}

InnerCheckboxGroup.propTypes = propTypes;

export const CheckboxGroup = forwardRef((props, ref) => (
    <InnerCheckboxGroup {...props} forwardedRef={ref} />
));

