import { EmbeddedIcon } from "../../icons";
import { Checkbox as SemanticCheckbox } from "semantic-ui-react";
import { SemanticRef, mergeClasses, throwWhenUnsupportedPropIsProvided, useAutofocus, useMergedRefs } from "../../shared";
import { arrayOf, bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { createCount } from "../../count";
import { createEmbeddedLabel } from "../../label";
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
     * The text associated to the checkbox.
     */
    text: string,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display [icons](/?path=/docs/components-icon--default-story) after the text.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [label](/?path=/docs/components-label--default-story) after the text.
     */
    label: oneOfType([element, object]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [count](/?path=/docs/components-count--default-story) after the text.
     */
    count: oneOfType([element, object]),
    /**
     * A checkbox can vary in sizes.
     */
    size: oneOf(["small", "medium", "large"])
};

const propTypes = CHECKBOX_PROP_TYPES;

function throwWhenMutuallyExclusivePropsAreProvided({ label, count }, componentName) {
    if (!isNil(label) && !isNil(count)) {
        throw new Error(`${componentName} doesn't support having a label and a count at the same time.`);
    }
}

export function InnerCheckbox(props) {
    const {
        autofocus,
        autofocusDelay,
        text,
        icons,
        label,
        count,
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
    throwWhenMutuallyExclusivePropsAreProvided(props, __componentName);

    const innerRef = useMergedRefs(forwardedRef);

    const setFocus = useCallback(() => {
        if (!isNil(innerRef.current)) {
            innerRef.current.querySelector("input").focus();
        }
    }, [innerRef]);

    const autofocusProps = useAutofocus(autofocus, autofocusDelay, disabled, setFocus);

    const textMarkup = !isNil(text) && (
        <span className="text">
            {text}
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

    const labelMarkup = !isNil(label) && createEmbeddedLabel(label, {
        as: "span",
        size,
        highlight: true
    });

    const countMarkup = !isNil(count) && createCount(count);

    const content = (textMarkup || iconsMarkup || labelMarkup || countMarkup) && (
        <label title={text || ""}>
            {textMarkup}
            {iconsMarkup}{labelMarkup}{countMarkup}
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
                    !isNil(label) && "with-label",
                    isNil(text) && "without-text",
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
