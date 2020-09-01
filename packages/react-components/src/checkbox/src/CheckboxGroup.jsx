import { CheckableContext, augmentElement, useControllableState, useEventCallback } from "../../shared";
import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { InputLabel, useInputGroup } from "../../input";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
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
     * Label identifying the checkbox group.
     */
    label: string,
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Additional text to describe the checkbox group.
     */
    description: string,
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
     * Whether the checkbox group is disabled.
     */
    disabled: bool,
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
    const {
        value,
        defaultValue,
        label,
        required,
        description,
        onChange,
        orientation = "horizontal",
        gap,
        wrap,
        size,
        disabled,
        as = "div",
        children,
        forwardedRef,
        ...rest
    } = useToolbarProps(props, { addNavigationMode: false });

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

    const { groupProps, itemsProps, labelProps } = useInputGroup({
        ...rest,
        role: "group",
        labelIdPrefix: "o-ui-checkbox-group-label",
        label,
        required,
        description,
        orientation,
        gap,
        wrap,
        size,
        disabled,
        as,
        ref: forwardedRef
    });

    const handleCheck = useEventCallback((event, newValue) => {
        const newCheckedValue = arrayToggleValue(checkedValue, newValue);

        setCheckedValue(newCheckedValue);

        if (!isNil(onChange)) {
            onChange(event, newCheckedValue);
        }
    });

    const labelMarkup = labelProps && (
        <InputLabel {...labelProps} />
    );

    const renderItems = (additionalProps = {}) => {
        const items = isFunction(children)
            ? children({ checkedValue })
            : children;

        return (
            <Flex
                {...additionalProps}
                {...itemsProps}
                alignItems="start"
            >
                <CheckableContext.Provider
                    value={{
                        onCheck: handleCheck,
                        checkedValue
                    }}
                >
                    {Children.map(items, x => {
                        return augmentElement(x, {
                            size,
                            disabled,
                            role: "checkbox"
                        });
                    })}
                </CheckableContext.Provider>
            </Flex>
        );
    };

    return (
        !labelMarkup ? renderItems(groupProps) : (
            <Flex
                {...groupProps}
                direction="column"
                gap={2}
            >
                {labelMarkup}
                {renderItems()}
            </Flex>
        )
    );
}

InnerCheckboxGroup.propTypes = propTypes;

export const CheckboxGroup = forwardRef((props, ref) => (
    <InnerCheckboxGroup {...props} forwardedRef={ref} />
));

