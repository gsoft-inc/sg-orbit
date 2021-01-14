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
     * Called when the toggle icon button checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @param {bool} isChecked - Whether the button is checked.
     * @returns {void}
     */
    onChange: func,
    /**
     * The style to use.
     */
    variant: oneOf(["solid", "outline"]),
    /**
     * The toggle icon button color accent.
     */
    color: oneOf(["primary", "secondary"]),
    /**
     * The toggle icon button shape.
     */
    shape: oneOf(["rounded", "circular"]),
    /**
     * Whether or not the toggle icon button content should takes additional space.
     */
    condensed: bool,
    /**
     * Whether or not the toggle icon button should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * A toggle icon button can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * Whether or not the toggle icon button is disabled.
     */
    disabled: bool,
    /**
     * A label providing an accessible name to the toggle icon button. See [WCAG](https://www.w3.org/TR/WCAG20-TECHS/ARIA14.html).
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
     * React children.
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
        active,
        forwardedRef
    });

    const content = resolveChildren(children, { isChecked });

    return (
        <ElementType
            {...mergeProps(
                rest,
                buttonProps
            )}
        >
            {content}
        </ElementType>
    );
}

InnerToggleIconButton.propTypes = propTypes;

export const ToggleIconButton = slot("button", forwardRef((props, ref) => (
    <InnerToggleIconButton {...props} forwardedRef={ref} />
)));

ToggleIconButton.displayName = "ToggleIconButton";
