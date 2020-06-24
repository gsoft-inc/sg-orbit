import { EmbeddedIcon } from "../../icons";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided, useAutofocus, useMergedRefs } from "../../shared";
import { arrayOf, bool, element, number, oneOf, oneOfType, string } from "prop-types";
import { embedBadge } from "../../badge";
import { forwardRef, useCallback } from "react";
import { isNil } from "lodash";

const UNSUPPORTED_PROPS = ["slider", "type", "radio", "toggle"];

export const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the checkbox should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * The label associated to the checkbox.
     */
    label: string,
    /**
     * [Icon](/?path=/docs/components-icon--default-story) components rendered after the text.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * [Badge](/?path=/docs/components-badge--default-story) component rendered after the text.
     */
    badge: element,
    /**
     * A checkbox can vary in sizes.
     */
    size: oneOf(["small", "medium", "large"])
};

const propTypes = CHECKBOX_PROP_TYPES;

export function InnerCheckbox(props) {
    const {
        autofocus,
        autofocusDelay,
        label,
        icons,
        badge,
        size,
        active,
        focus,
        hover,
        disabled,
        className,
        forwardedRef,
        __unsupportedProps = UNSUPPORTED_PROPS,
        __componentName = "@orbit-ui/react-components/Checkbox",
        ...rest
    } = props;

    throwWhenUnsupportedPropIsProvided(props, __unsupportedProps, __componentName);

    const innerRef = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(innerRef.current)) {
            innerRef.current.querySelector("input").focus();
        }
    }, [innerRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const hasLabel = !isNil(label);

    const labelMarkup = hasLabel && (
        <span className="label">
            {label}
        </span>
    );

    const iconsMarkup = !isNil(icons) && (
        <>
            {(Array.isArray(icons) ? icons : [icons]).map(
                (x, index) =>
                    // eslint-disable-next-line react/no-array-index-key
                    <EmbeddedIcon icon={x} size={size} key={index} />
            )}
        </>
    );

    const badgeMarkup = !isNil(badge) && embedBadge(badge, {
        size,
        highlight: true,
        disabled
    });

    const content = (labelMarkup || iconsMarkup || badgeMarkup) && (
        <label title={label || ""}>
            {labelMarkup}
            {iconsMarkup}{badgeMarkup}
        </label>
    );

    return (
        <SemanticRef innerRef={innerRef}>
            <SemanticCheckbox
                data-testid="checkbox"
                {...rest}
                {...autofocusProps}
                label={content || undefined}
                disabled={disabled}
                className={mergeClasses(
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    size && size,
                    !isNil(icons) && "with-icon",
                    !isNil(badge) && "with-badge",
                    !hasLabel && "fitted",
                    className
                )}
            />
        </SemanticRef>
    );
}

InnerCheckbox.propTypes = propTypes;

export const Checkbox = forwardRef((props, ref) => (
    <InnerCheckbox { ...props } forwardedRef={ref} />
));
