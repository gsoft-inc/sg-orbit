import { Box } from "../../box";
import { Button } from "./Button";
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
     * The value to associate with when in a group.
     */
    value: oneOfType([string, number]),
    /**
     * Called when the toggle button checked state change.
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
     * The toggle button color accent.
     */
    color: oneOf(["primary", "secondary"]),
    /**
     * The toggle button shape.
     */
    shape: oneOf(["pill", "rounded", "circular"]),
    /**
     * Whether or not the toggle button should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * A toggle button can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * Whether or not the toggle button is disabled.
     */
    disabled: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerToggleButton(props) {
    const [checkableProps] = useCheckableProps(props);

    const {
        variant = "solid",
        shape = "pill",
        checked,
        defaultChecked,
        value,
        onChange,
        onCheck,
        active,
        as = Button,
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
        onCheck,
        active,
        forwardedRef
    });

    const content = resolveChildren(children, { isChecked });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    as
                },
                buttonProps
            )}
        >
            {content}
        </Box>
    );
}

InnerToggleButton.propTypes = propTypes;

export const ToggleButton = slot("button", forwardRef((props, ref) => (
    <InnerToggleButton {...props} forwardedRef={ref} />
)));

ToggleButton.displayName = "ToggleButton";


