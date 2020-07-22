import { Button } from "./Button";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isFunction, isNil } from "lodash";
import { useChainedEventCallback, useCheckableContext, useControllableState } from "../../shared";

const propTypes = {
    /**
     * A controlled checked value.
     */
    checked: bool,
    /**
     * The initial value of `checked`.
     */
    defaultChecked: bool,
    /**
     * 	The value to associate with when his part of a group.
     */
    value: oneOfType([string, number]),
    /**
     * Called when the button checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isChecked - Whether or not the button is checked.
     * @returns {void}
     */
    onChange: func,
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * The color accent.
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
    children: oneOfType([any, func]).isRequired
};

const defaultProps = {
    variant: "solid",
    as: Button
};

export function InnerToggleButton(props) {
    const {
        checked,
        defaultChecked,
        value,
        onChange,
        onClick,
        active,
        as: ElementType,
        children,
        forwardedRef,
        ...rest
    } = props;

    const { isCheckedValue, onCheck } = useCheckableContext(value);

    const [isChecked, setIsChecked] = useControllableState(!isNil(isCheckedValue) ? isCheckedValue : checked, defaultChecked, false);

    const handleClick = useChainedEventCallback(onClick, event => {
        setIsChecked(!isChecked);

        if (!isNil(onCheck)) {
            onCheck(event, value);
        }

        if (!isNil(onChange)) {
            onChange(event, !isChecked);
        }
    });

    const content = isFunction(children)
        ? children({ isChecked }, props)
        : children;

    return (
        <ElementType
            data-testid="toggle-button"
            {...rest}
            onClick={handleClick}
            active={active || isChecked}
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


