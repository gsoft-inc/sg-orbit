import "./Checkbox.css";

import { EmbeddedIcon } from "../../icons";
import { VisuallyHidden } from "../../visually-hidden";
import { bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { isNil } from "lodash";
import { mergeClasses, useAutoControlledState, useAutofocus, useEventCallback } from "../../shared";

/*
COMPONENTS:
    - Checkbox
    - Switch
    - Radio
    - RadioGroup
*/

const propTypes = {
    checked: bool,
    defaultChecked: bool,
    indeterminate: bool,
    defaultIndeterminate: bool,
    /**
     * Whether or not the checkbox should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    onChange: func,
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
    reverse: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType])
};

const defaultProps = {
    as: "label"
};

export function InnerCheckbox({
    checked,
    defaultChecked,
    indeterminate,
    defaultIndeterminate,
    autofocus,
    autofocusDelay,
    onChange,
    icon,
    badge,
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
}) {
    const [isChecked, setIsChecked] = useAutoControlledState(checked, defaultChecked, false);
    const [isIndeterminate, setIsIndeterminate] = useAutoControlledState(indeterminate, defaultIndeterminate, false);

    const labelRef = useRef();
    const inputRef = useRef();

    const setFocus = useCallback(() => {
        if (!isNil(inputRef.current)) {
            inputRef.current.focus();
        }
    }, [inputRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    // Forward native input API to the external ref element.
    useImperativeHandle(forwardedRef, () => {
        const apiMethods = ["blur", "focus", "click", "checkValidity", "reportValidity", "setCustomValidity"];
        const domElement = labelRef.current;

        apiMethods.forEach(x => {
            domElement[x] = (...args) => {
                inputRef.current[x](...args);
            };
        });

        return domElement;
    });

    const labelMarkup = children && (
        <span className="label">{children}</span>
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
        setIsIndeterminate(false);

        if (!isNil(onChange)) {
            onChange(event, { isChecked: !isChecked });
        }
    });

    return (
        <ElementType
            data-testid="checkbox"
            {...rest}
            className={mergeClasses(
                "o-ui checkbox",
                isChecked && "checked",
                isIndeterminate && "indeterminate",
                iconMarkup && "with-icon",
                badgeMarkup && "with-badge",
                reverse && "reverse",
                disabled && "disabled",
                readOnly && "readonly",
                active && "active",
                focus && "focus",
                hover && "hover",
                className
            )}
            ref={labelRef}
        >
            <VisuallyHidden
                {...autofocusProps}
                as="input"
                checked={readOnly ? undefined : isChecked}
                onChange={readOnly ? undefined : handleChange}
                disabled={disabled}
                name={name}
                tabIndex={tabIndex}
                type="checkbox"
                ref={inputRef}
            />
            <span className="box"></span>
            {content}
        </ElementType>
    );
}

InnerCheckbox.propTypes = propTypes;
InnerCheckbox.defaultProps = defaultProps;

export const Checkbox = forwardRef((props, ref) => (
    <InnerCheckbox { ...props } forwardedRef={ref} />
));
