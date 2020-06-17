import { INPUT_UNSUPPORTED_PROPS, Input } from "../../input";
import { bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { createShorthandFactory, throwWhenUnsupportedPropIsProvided } from "../../shared";
import { forwardRef } from "react";

const UNSUPPORTED_PROPS = INPUT_UNSUPPORTED_PROPS;

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged.
const INPUT_PROP_TYPES = {
    /**
     * Whether or not the input should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) for an [icon](/?path=/docs/components-icon--default-story).
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * [Shorthand](/?path=/docs/getting-started-shorthand-props--page) to display a [button](/?path=/docs/components-button--default-story) after the value.
     */
    button: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * Additional CSS classes to render on the wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the wrapper element.
     */
    wrapperStyle: object
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged.
const INPUT_DEFAULT_PROPS = {
    iconPosition: "right"
};

const propTypes = {
    ...INPUT_PROP_TYPES,
    /**
     * The value of the input.
     */
    value: string,
    /**
     * The default value of the input.
     */
    defaultValue: string,
    /**
     * The [type](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) of the input.
     */
    type: oneOf(["text", "password", "email"])
};

const defaultProps = {
    ...INPUT_DEFAULT_PROPS,
    type: "text"
};

export function InnerTextInput(props) {
    const { forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/TextInput");

    return (
        <Input
            {...rest}
            ref={forwardedRef}
            __componentName="@orbit-ui/react-components/TextInput"
        />
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));

export const createTextInput = createShorthandFactory(TextInput);
