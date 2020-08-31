import "./Checkbox.css";

import { Label } from "../../text";
import { SlotProvider, useCheckableProps, useEventCallback } from "../../shared";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isFunction, isNil } from "lodash";
import { useCheckbox } from "./useCheckbox";

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
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        value,
        autoFocus,
        autoFocusDelay,
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
    } = useCheckableProps(props);

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
        checked,
        defaultChecked,
        indeterminate,
        defaultIndeterminate,
        autoFocus,
        autoFocusDelay,
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
        content = <Label>{content}</Label>;
    }

    return (
        <ElementType
            data-testid="checkbox"
            {...rest}
            {...wrapperProps}
        >
            <VisuallyHidden {...inputProps} />
            <span className="o-ui-checkbox-box" />
            <SlotProvider
                slots={{
                    label: {
                        size,
                        className: "o-ui-checkbox-label"
                    },
                    icon: {
                        size,
                        className: "o-ui-checkbox-icon"
                    },
                    counter: {
                        size,
                        reverse,
                        className: "o-ui-checkbox-counter"
                    }
                }}
            >
                {content}
            </SlotProvider>
        </ElementType>
    );
}

InnerCheckbox.propTypes = propTypes;

export const Checkbox = forwardRef((props, ref) => (
    <InnerCheckbox {...props} forwardedRef={ref} />
));
