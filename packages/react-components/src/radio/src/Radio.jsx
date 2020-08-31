import "./Radio.css";

import { Label } from "../../text";
import { SlotProvider, cssModule, getSizeClass3, mergeClasses, useAutoFocus, useCheckableProps, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef, useImperativeHandle, useRef } from "react";
import { isFunction, isNil } from "lodash";

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
     * The value to associate with when in a group.
     */
    value: oneOfType([string, number]).isRequired,
    /**
     * A checkbox can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Invert the order the checkmark box and the label.
     */
    reverse: bool,
    /**
     * Called when the radio checked state change.
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
    children: oneOfType([any, func]).isRequired
};

const defaultProps = {
    as: "label"
};

export function InnerRadio(props) {
    const {
        value,
        name,
        checked,
        defaultChecked,
        autoFocus,
        autoFocusDelay,
        onChange,
        onCheck,
        size,
        reverse,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as: ElementType,
        className,
        children,
        forwardedRef,
        ...rest
    } = useCheckableProps(props);

    // Since this component render an input="radio" the role is unnecessary.
    delete rest["role"];

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const labelRef = useRef();
    const inputRef = useRef();

    useAutoFocus(inputRef, autoFocus, { delay: autoFocusDelay });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(labelRef);
    });

    let content = isFunction(children)
        ? children({ isChecked }, props)
        : children;

    if (typeof content === "string") {
        content = <Label>{content}</Label>;
    }

    const handleChange = useEventCallback(event => {
        setIsChecked(!isChecked);

        if (!isNil(onChange)) {
            onChange(event);
        }
    });

    const handleCheck = useEventCallback(event => {
        onCheck(event, value);
    });

    return (
        <ElementType
            data-testid="radio"
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-radio",
                    isChecked && "checked",
                    reverse && "reverse",
                    disabled && "disabled",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass3(size)
                ),
                className
            )}
            ref={labelRef}
        >
            <VisuallyHidden
                as="input"
                type="radio"
                value={value}
                name={name}
                checked={isChecked}
                onChange={!isNil(onCheck) ? handleCheck : handleChange}
                disabled={disabled}
                tabIndex={tabIndex}
                ref={inputRef}
            />
            <span className="o-ui-radio-button"></span>
            <SlotProvider
                slots={{
                    label: {
                        size,
                        className: "o-ui-radio-label"
                    },
                    icon: {
                        size,
                        className: "o-ui-radio-icon"
                    },
                    counter: {
                        size,
                        reverse,
                        className: "o-ui-radio-counter"
                    }
                }}
            >
                {content}
            </SlotProvider>
        </ElementType>
    );
}

InnerRadio.propTypes = propTypes;
InnerRadio.defaultProps = defaultProps;

export const Radio = forwardRef((props, ref) => (
    <InnerRadio {...props} forwardedRef={ref} />
));
