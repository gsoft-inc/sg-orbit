import "./Switch.css";

import { EmbeddedIcon } from "../../icons";
import { VisuallyHidden } from "../../visually-hidden";
import { any, bool, element, elementType, func, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef } from "react";
import { isFunction, isNil } from "lodash";
import { mergeClasses } from "../../shared";
import { useCheckbox } from "../../checkbox";

const propTypes = {
    /**
     * A controlled checked state value.
     */
    checked: bool,
    /**
     * The initial value of `checked`.
     */
    defaultChecked: bool,
    /**
     * Whether or not the checkbox should autoFocus on render.
     */
    autoFocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autoFocusDelay: number,
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
     * Called when the switch checked state change.
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

export function InnerSwitch(props) {
    const {
        checked,
        defaultChecked,
        autoFocus,
        autoFocusDelay,
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
    } = props;

    const {
        isChecked,
        wrapperProps,
        inputProps
    } = useCheckbox({
        checked,
        defaultChecked,
        autoFocus,
        autoFocusDelay,
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
        className,
        forwardedRef,
        ...rest
    });

    const createMarkup = () => {
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

        return (
            <>
                {labelMarkup}
                {iconMarkup}
                {badgeMarkup}
            </>
        );
    };

    const content = isFunction(children)
        ? children({ isChecked }, props)
        : createMarkup();

    return (
        <ElementType
            data-testid="switch"
            {...wrapperProps}
            className={mergeClasses(
                "o-ui switch",
                wrapperProps.className
            )}
        >
            <VisuallyHidden
                {...inputProps}
            />
            <span className="switch" />
            {content}
        </ElementType>
    );
}

InnerSwitch.propTypes = propTypes;
InnerSwitch.defaultProps = defaultProps;

export const Switch = forwardRef((props, ref) => (
    <InnerSwitch { ...props } forwardedRef={ref} />
));

export const Toggle = Switch;
