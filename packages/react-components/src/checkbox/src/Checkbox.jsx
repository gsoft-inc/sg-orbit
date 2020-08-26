import "./Checkbox.css";

import { EmbeddedIcon, embeddedIconSlot } from "../../icons";
import { SlotProvider, mergeClasses, useCheckableProps, useEventCallback } from "../../shared";
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
    // /**
    //  * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
    //  */
    // icon: element,
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

const defaultProps = {
    as: "label"
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
        // icon,
        // counter,
        size,
        reverse,
        name,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        readOnly,
        as: ElementType,
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
        readOnly,
        className,
        forwardedRef
    });

    const content = isFunction(children)
        ? children({ isChecked, isIndeterminate }, props)
        : children;

    // const labelMarkup = label && (
    //     <span className="label">{label}</span>
    // );

    // const iconMarkup = !isNil(icon) && (
    //     <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    // );

    // TODO: Add reverse
    // const badgeMarkup = !isNil(badge) && embedBadge(badge, {
    //     size,
    //     disabled
    // });

    // const content = (
    //     <>
    //         {labelMarkup}
    //         {iconMarkup}
    //         {counter}
    //     </>
    // );

    return (
        <ElementType
            data-testid="checkbox"
            {...rest}
            {...wrapperProps}
            className={mergeClasses(
                "o-ui checkbox",
                wrapperProps.className
            )}
        >
            <VisuallyHidden {...inputProps} />
            <span className="box" />
            <SlotProvider
                slots={{
                    label: {
                        size
                    },
                    icon: embeddedIconSlot({
                        size
                    })
                    // counter:
                }}
            >
                {content}
            </SlotProvider>
        </ElementType>
    );
}

InnerCheckbox.propTypes = propTypes;
InnerCheckbox.defaultProps = defaultProps;

export const Checkbox = forwardRef((props, ref) => (
    <InnerCheckbox {...props} forwardedRef={ref} />
));
