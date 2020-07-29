import "./Radio.css";

import { EmbeddedIcon } from "../../icons";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { getSizeClass, mergeClasses, useAutoFocus, useCheckableProps, useControllableState, useEventCallback, useForwardInputApi } from "../../shared";
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
     * [Icon](/?path=/docs/components-icon--default-story) component rendered after the text.
     */
    icon: element,
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    badge: element,
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
        icon,
        badge,
        size,
        reverse,
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

    // Since this component render an input="radio" the role is unnecessary.
    delete rest["role"];

    const [isChecked, setIsChecked] = useControllableState(checked, defaultChecked, false);

    const labelRef = useRef();
    const inputRef = useRef();

    const setFocus = useCallback(() => {
        if (!isNil(labelRef.current)) {
            labelRef.current.focus();
        }
    }, [labelRef]);

    const autoFocusProps = useAutoFocus(autoFocus, autoFocusDelay, disabled, setFocus);

    const forwardInputApi = useForwardInputApi(inputRef);

    useImperativeHandle(forwardedRef, () => {
        return forwardInputApi(labelRef);
    });

    const label = isFunction(children)
        ? children({ isChecked }, props)
        : children;

    const labelMarkup = label && (
        <span className="label">{label}</span>
    );

    const iconMarkup = !isNil(icon) && (
        <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    );

    // TODO: Add reverse
    const badgeMarkup = !isNil(badge) && embedBadge(badge, {
        size,
        disabled
    });

    const content = (
        <>
            {labelMarkup}
            {iconMarkup}
            {badgeMarkup}
        </>
    );

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
                "o-ui radio",
                isChecked && "checked",
                iconMarkup && "with-icon",
                badgeMarkup && "with-badge",
                reverse && "reverse",
                disabled && "disabled",
                readOnly && "readonly",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className
            )}
            ref={labelRef}
        >
            <VisuallyHidden
                {...autoFocusProps}
                as="input"
                type="radio"
                value={value}
                name={name}
                checked={readOnly ? undefined : isChecked}
                onChange={readOnly ? undefined : !isNil(onCheck) ? handleCheck : handleChange}
                disabled={disabled}
                tabIndex={tabIndex}
                ref={inputRef}
            />
            <span className="button"></span>
            {content}
        </ElementType>
    );
}

InnerRadio.propTypes = propTypes;
InnerRadio.defaultProps = defaultProps;

export const Radio = forwardRef((props, ref) => (
    <InnerRadio { ...props } forwardedRef={ref} />
));
