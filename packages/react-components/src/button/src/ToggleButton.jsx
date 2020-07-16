import { Button } from "./Button";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isFunction, isNil } from "lodash";
import { useAutoControlledState, useChainedEventCallback } from "../../shared";

const propTypes = {
    /**
     * A controlled selected state value.
     */
    selected: bool,
    /**
     * The initial value of `selected`.
     */
    defaultSelected: bool,
    /**
     * 	The value to associate with the button when it's selected.
     */
    value: any.isRequired,
    /**
     * Called when the button selection state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {{value: any, isSelected: bool}} data - Event data.
     * @returns {void}
     */
    onChange: func,
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * Color accent to use.
     */
    color: oneOf(["primary", "secondary"]),
    /**
     * Whether or not the button should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * A button can have a circular form.
     */
    circular: bool,
    /**
     * A button can vary in size.
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
    variant: "solid",
    as: Button
};

export function InnerToggleButton(props) {
    const { selected, defaultSelected, value, onChange, onClick, active, as: ElementType, children, forwardedRef, ...rest } = props;

    const [isSelected, setIsSelected] = useAutoControlledState(selected, defaultSelected, false);

    const handleClick = useChainedEventCallback(onClick, event => {
        setIsSelected(!isSelected);

        if (!isNil(onChange)) {
            onChange(event, { value, isSelected: !isSelected });
        }
    });

    const content = isFunction(children)
        ? children({ isSelected }, props)
        : children;

    return (
        <ElementType
            data-testid="toggle-button"
            {...rest}
            onClick={handleClick}
            active={active || isSelected}
            ref={forwardedRef}
        >
            {content}
        </ElementType>
    );
}

InnerToggleButton.propTypes = propTypes;
InnerToggleButton.defaultProps = defaultProps;

export const ToggleButton = forwardRef((props, ref) => (
    <InnerToggleButton { ...props } forwardedRef={ref} />
));


