import { IconButton } from "./IconButton";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, resolveChildren, slot, useCheckableProps } from "../../shared";
import { useToggleButton } from "./useToggleButton";

const propTypes = {
    /**
     * A controlled checked value.
     */
    checked: bool,
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked: bool,
    /**
     * 	The value to associate with when in a group.
     */
    value: oneOfType([string, number]),
    /**
     * Called when the button checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isChecked - Whether the button is checked.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["solid", "outline", "ghost"]),
    /**
     * The color accent.
     */
    color: oneOf(["primary", "secondary"]),
    /**
     * The button shape.
     */
    shape: oneOf(["rounded", "circular"]),
    /**
     * Whether or not the button content should takes additional space.
     */
    condensed: bool,
    /**
     * Whether the button should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * The delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * A button can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * A label providing an accessible name to the button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
     */
    "aria-label": string.isRequired,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerToggleIconButton(props) {
    const [checkableProps] = useCheckableProps(props);

    const {
        variant = "solid",
        shape = "circular",
        checked,
        defaultChecked,
        value,
        onChange,
        onClick,
        active,
        as: ElementType = IconButton,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        checkableProps
    );

    const { isChecked, buttonProps } = useToggleButton({
        variant,
        shape,
        checked,
        defaultChecked,
        value,
        onChange,
        onClick,
        active,
        forwardedRef
    });

    const content = resolveChildren(children, { isChecked });

    return (
        <ElementType
            {...rest}
            {...buttonProps}
        >
            {content}
        </ElementType>
    );
}

InnerToggleIconButton.propTypes = propTypes;

export const ToggleIconButton = slot("button", forwardRef((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
)));
