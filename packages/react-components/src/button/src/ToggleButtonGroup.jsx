import { ButtonGroup } from "./ButtonGroup";
import { Children, forwardRef, useMemo } from "react";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, useAutoControlledState, useEventCallback } from "../../shared";
import { isNil } from "lodash";

const propTypes = {
    /**
     * A controlled selected value within the group or an array of selected values when `exclusive` is `false`. The value must have reference equality with the option in order to be selected.
     */
    value: any,
    /**
     * The initial value of `value`.
     */
    defaultValue: any,
    /**
     * Called when any of the buttons selection state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {any} selectedValue - The selected button values. When `exclusive` is `true` this is a single value; when `false` an array of selected values. If no value is selected and `exclusive` is `true` the value is null; when false an empty array.
     * @returns {void}
     */
    onChange: func,
    /**
     * Whether or not to enforce a single selected option.
     */
    exclusive: bool,
    /**
     * Buttons size.
     */
    size: oneOf(["small", "medium", "large"]),
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
    as: ButtonGroup
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

function ToggleButtonGroupItem({ selected, onChange, children, ...rest }) {
    const handleChange = useEventCallback((event, data) => {
        onChange(event, data);
    });

    return augmentElement(children, {
        ...rest,
        selected,
        onChange: handleChange
    });
}

export function InnerToggleButtonGroup({ value, defaultValue, onChange, exclusive, as: ElementType, children, forwardedRef, ...rest }) {
    const [selectedValue, setSelectedValue] = useAutoControlledState(value, defaultValue, exclusive ? null : []);

    const handleChange = useEventCallback((event, { value: toggledValue }) => {
        let newSelectedValue;

        if (exclusive) {
            newSelectedValue = toggledValue === selectedValue ? null : toggledValue;
        } else {
            newSelectedValue = arrayToggleValue(selectedValue, toggledValue);
        }

        setSelectedValue(newSelectedValue);

        if (!isNil(onChange)) {
            onChange(event, newSelectedValue);
        }
    });

    const normalizedValues = useMemo(() => isNil(selectedValue) ? [] : [].concat(selectedValue), [selectedValue]);

    return (
        <ElementType
            {...rest}
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return (
                    <ToggleButtonGroupItem
                        selected={normalizedValues.indexOf(x.props.value) !== -1}
                        onChange={handleChange}
                    >
                        {x}
                    </ToggleButtonGroupItem>
                );
            })}
        </ElementType>
    );
}

InnerToggleButtonGroup.propTypes = propTypes;
InnerToggleButtonGroup.defaultProps = defaultProps;

export const ToggleButtonGroup = forwardRef((props, ref) => (
    <InnerToggleButtonGroup { ...props } forwardedRef={ref} />
));
