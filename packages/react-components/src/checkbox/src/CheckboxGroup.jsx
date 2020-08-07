import { CheckableContext, SIZE, augmentElement, useControllableState, useEventCallback } from "../../shared";
import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { any, arrayOf, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { isFunction, isNil } from "lodash";
import { useToolbarProps } from "../../toolbar/src/ToolbarContext";

const SIZE_GAP = {
    "horizontal": {
        [SIZE.small]: 4,
        [SIZE.medium]: 5,
        [SIZE.large]: 6
    },
    "vertical": {
        [SIZE.small]: 2,
        [SIZE.medium]: 3,
        [SIZE.large]: 4
    }
};

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
     * Whether the checkbox group is read only.
     */
    readOnly: bool,
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
        onChange,
        orientation = "horizontal",
        gap,
        wrap,
        size,
        disabled,
        readOnly,
        children,
        forwardedRef,
        ...rest
    } = useToolbarProps(props, { addNavigationMode: false });

    const [checkedValue, setCheckedValue] = useControllableState(value, defaultValue, []);

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
            {...rest}
            direction={orientation === "vertical" ? "column" : "row"}
            alignItems="start"
            gap={gap ?? SIZE_GAP[orientation][size ?? SIZE.medium]}
            wrap={!isNil(wrap) ? "wrap" : undefined}
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
                {Children.map(items, x => {
                    return augmentElement(x, {
                        size,
                        disabled,
                        readOnly,
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
    <InnerCheckboxGroup { ...props } forwardedRef={ref} />
));

