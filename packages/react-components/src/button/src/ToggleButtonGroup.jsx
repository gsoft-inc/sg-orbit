import { ButtonGroup } from "./ButtonGroup";
import { Children, cloneElement, forwardRef } from "react";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { isNil } from "lodash";
import { useAutoControlledState, useChainedEventCallback, useEventCallback } from "../../shared";

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
     * Called when the button selection state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {{value: any, isSelected: bool}} data - Event data.
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
    as: "div"
};

function ToggleButtonGroupItem({ selected, onChange, children, ...rest }) {
    const handleChange = useChainedEventCallback(children.props.onChange, (event, data) => {
        onChange(event, data);
    });

    return cloneElement(children, {
        ...rest,
        selected,
        onChange: handleChange
    });
}

export function InnerToggleButtonGroup({ value, defaultValue, onChange, exclusive, children, forwardedRef, ...rest }) {
    const [selectedValue, setSelectedValue] = useAutoControlledState(value, defaultValue);

    const normalizedValues = isNil(selectedValue)
        ? []
        : [].concat(selectedValue);

    const handleChange = useEventCallback((event, { value: toggledValue }) => {
        let newSelectedValue;

        if (exclusive) {
            newSelectedValue = toggledValue;
        } else {
            const index = normalizedValues.indexOf(toggledValue);

            if (index !== -1) {
                newSelectedValue = [...normalizedValues];
                newSelectedValue.splice(index, 1);
            } else {
                newSelectedValue = [...normalizedValues, toggledValue];
            }
        }

        if (newSelectedValue !== selectedValue) {
            setSelectedValue(newSelectedValue);

            if (!isNil(onChange)) {
                onChange(event, newSelectedValue);
            }
        }
    });

    return (
        <ButtonGroup
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
        </ButtonGroup>
    );
}

InnerToggleButtonGroup.propTypes = propTypes;
InnerToggleButtonGroup.defaultProps = defaultProps;

export const ToggleButtonGroup = forwardRef((props, ref) => (
    <InnerToggleButtonGroup { ...props } forwardedRef={ref} />
));
