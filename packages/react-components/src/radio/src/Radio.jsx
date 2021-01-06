import "./Radio.css";

import { Box } from "../../box";
import { Text } from "../../text";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import {
    cssModule,
    mergeClasses,
    mergeProps,
    omitProps,
    resolveChildren,
    useAutoFocus,
    useCheckableProps,
    useControllableState,
    useEventCallback,
    useForwardInputApi,
    useSlots
} from "../../shared";
import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";
import { isNil, isNumber } from "lodash";

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
     * Whether or not the radio should autoFocus on render.
     */
    autoFocus: oneOfType([bool, number]),
    /**
     * Whether or not the radio should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Called when the radio checked state change.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onChange: func,
    /**
     * Invert the order of the checkmark box and the label.
     */
    reverse: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: oneOfType([any, func]).isRequired
};

export function InnerRadio(props) {
    const [checkableProps] = useCheckableProps(props);

    const {
        value,
        name,
        checked,
        defaultChecked,
        autoFocus,
        validationState,
        onChange,
        onCheck,
        reverse,
        tabIndex,
        active,
        focus,
        hover,
        disabled,
        as = "label",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        omitProps(props, ["role"]),
        checkableProps
    );

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const labelRef = useRef();
    const inputRef = useRef();

    useAutoFocus(inputRef, {
        isDisabled: !autoFocus,
        delay: isNumber(autoFocus) ? autoFocus : undefined
    });

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(labelRef);
    });

    const handleChange = useEventCallback(event => {
        setIsChecked(!isChecked);

        if (!isNil(onChange)) {
            onChange(event);
        }
    });

    const handleCheck = useEventCallback(event => {
        console.log("handleCheck");

        onCheck(event, value);
    });

    const content = resolveChildren(children, { isChecked });

    const { text, icon, counter } = useSlots(content, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        text: {
            className: "o-ui-radio-label"
        },
        icon: {
            size: "sm",
            className: "o-ui-radio-icon"
        },
        counter: {
            reverse,
            pushed: true,
            className: "o-ui-radio-counter"
        }
    }), [reverse]));

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-radio",
                    isChecked && "checked",
                    reverse && "reverse",
                    validationState && validationState,
                    disabled && "disabled",
                    active && "active",
                    focus && "focus",
                    hover && "hover"
                ),
                className
            )}
            as={as}
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
                data-type={typeof(value)}
                aria-invalid={validationState === "invalid"}
                ref={inputRef}
            />
            <span className="o-ui-radio-button"></span>
            {text}
            {icon}
            {counter}
        </Box>
    );
}

InnerRadio.propTypes = propTypes;

export const Radio = forwardRef((props, ref) => (
    <InnerRadio {...props} forwardedRef={ref} />
));

Radio.displayName = "Radio";
