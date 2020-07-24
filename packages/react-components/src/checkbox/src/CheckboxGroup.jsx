import { CheckableContext, augmentElement, useControllableState, useEventCallback } from "../../shared";
import { Children, forwardRef } from "react";
import { Inline } from "@react-components/layout";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";

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
     * Called when any of the children is checked or unchecked..
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {string[] | number[]} value - The new value.
     * @returns {void}
     */
    onChange: func,
    /**
     * Flex direction to display the children.
     */
    direction: oneOf(["row", "column"]),
    /**
     * Children size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Whether or not the checkbox group is disabled.
     */
    disabled: bool,
    /**
     * Whether or not the checkbox group is read only.
     */
    readOnly: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    // TODO: replace by Flex once available.
    as: Inline
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

export function InnerCheckboxGroup({
    value,
    defaultValue,
    onChange,
    direction,
    size,
    disabled,
    readOnly,
    as: ElementType,
    children,
    forwardedRef,
    ...rest
}) {
    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

    const handleCheck = useEventCallback((event, newValue) => {
        const newCheckedValue = arrayToggleValue(checkedValue, newValue);

        setCheckedValue(newCheckedValue);

        if (!isNil(onChange)) {
            onChange(event, newCheckedValue);
        }
    });

    return (
        <ElementType
            {...rest}
            gap={2}
            role="group"
            aria-disabled={disabled}
            ref={forwardedRef}
        >
            <CheckableContext.Provider
                value={{
                    onCheck: handleCheck,
                    checkedValue
                }}
            >
                {Children.map(children, x => {
                    return augmentElement(x, {
                        size,
                        disabled,
                        readOnly,
                        role: "checkbox"
                    });
                })}
            </CheckableContext.Provider>
        </ElementType>
    );
}

InnerCheckboxGroup.propTypes = propTypes;
InnerCheckboxGroup.defaultProps = defaultProps;

export const CheckboxGroup = forwardRef((props, ref) => (
    <InnerCheckboxGroup { ...props } forwardedRef={ref} />
));

