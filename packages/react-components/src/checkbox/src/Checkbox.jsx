import "./Checkbox.css";

import { ClearSlots, SlotProvider, useCheckableProps, useEventCallback, useSlotProps } from "../../shared";
import { Text, textSlot } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { counterSlot } from "../../counter";
import { forwardRef } from "react";
import { iconSlot } from "../../icons";
import { isFunction, isNil } from "lodash";
import { useCheckbox } from "./useCheckbox";
import { useValidationProps } from "../../field";

const propTypes = {
    /**
     * A controlled checked state value.
     */
    checked: bool,
    /**
     * The initial value of `checked` when uncontrolled.
     */
    defaultChecked: bool,
    /**
     * A controlled indeterminate state value.
     */
    indeterminate: bool,
    /**
     * The initial value of `indeterminate`.
     */
    defaultIndeterminate: bool,
    /**
     * The value to associate with when in a group.
     */
    value: oneOfType([string, number]),
    /**
     * Whether the checkbox should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
    /**
     * Whether a user input is required before form submission.
     */
    required: bool,
    /**
     * Whether the checkbox should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * A checkbox can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse: bool,
    /**
     * Called when the checkbox checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Component children.
     */
    children: oneOfType([any, func])
};

export function InnerCheckbox(props) {
    const {
        id,
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        value,
        autoFocus,
        autoFocusDelay,
        required,
        validationState,
        onChange,
        onCheck,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as: ElementType = "label",
        className,
        children,
        forwardedRef,
        ...rest
    } = useCheckableProps(useValidationProps(useSlotProps(props, ["checkbox", "input"])));

    // Unnecessary since the component render an input="checkbox".
    delete rest["role"];

    const handleCheck = useEventCallback(event => {
        onCheck(event, value);
    });

    const {
        isChecked,
        isIndeterminate,
        wrapperProps,
        inputProps
    } = useCheckbox({
        cssModule: "o-ui-checkbox",
        id,
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        autoFocus,
        autoFocusDelay,
        required,
        validationState,
        onChange: !isNil(onCheck) ? handleCheck : onChange,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        className,
        forwardedRef
    });

    let content = isFunction(children)
        ? children({ isChecked, isIndeterminate }, props)
        : children;

    if (typeof content === "string") {
        content = <Text>{content}</Text>;
    }

    return (
        <ElementType
            data-testid="checkbox"
            {...rest}
            {...wrapperProps}
        >
            <VisuallyHidden {...inputProps} />
            <span className="o-ui-checkbox-box" />
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: textSlot({
                            size,
                            className: "o-ui-checkbox-label"
                        }),
                        icon: iconSlot({
                            size,
                            className: "o-ui-checkbox-icon"
                        }),
                        counter: counterSlot({
                            size,
                            reverse,
                            className: "o-ui-checkbox-counter"
                        })
                    }}
                >
                    {content}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerCheckbox.propTypes = propTypes;

export const Checkbox = forwardRef((props, ref) => (
    <InnerCheckbox {...props} forwardedRef={ref} />
));
