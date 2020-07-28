import { Button } from "./Button";
import { any, bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isFunction } from "lodash";
import { useToggleButton } from "./useToggleButton";

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
     * 	The value to associate with when in a group.
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
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before the text.
     */
    iconLeft: element,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    iconRight: element,
    /**
     * Whether or not the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
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
     * Component children.
     */
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

    const { isChecked, buttonProps } = useToggleButton({
        checked,
        defaultChecked,
        value,
        onChange,
        onClick,
        active,
        forwardedRef,
        ...rest
    });

    const content = isFunction(children)
        ? children({ isChecked }, props)
        : children;

    return (
        <ElementType
            data-testid="toggle-button"
            {...buttonProps}
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


