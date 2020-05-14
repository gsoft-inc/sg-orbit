import { INPUT_UNSUPPORTED_PROPS, Input } from "../../input";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const COMPONENT_NAME = "@orbit-ui/react-components/text-input";
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
     * A React component displayed before or after the prompt based on "iconPosition".
     */
    icon: element,
    /**
     * An icon can appear on the left or right.
     */
    iconPosition: oneOf(["left"]),
    /**
     * An input can contain a button.
     */
    button: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * Additional CSS classes to render on the wrapper element.
     */
    wrapperClassName: string,
    /**
     * Additional style to render on the wrapper element.
     */
    wrapperStyle: object,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func])
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged.
const INPUT_DEFAULT_PROPS = {
    autofocus: false,
    size: DEFAULT_SIZE
};

const propTypes = {
    /**
     * The value of the input.
     */
    value: string,
    /**
     * The default value of the input.
     */
    defaultValue: string,
    ...INPUT_PROP_TYPES,
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

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, COMPONENT_NAME);

    return (
        <Input
            {...rest}
            ref={forwardedRef}
            __componentName={COMPONENT_NAME}
        />
    );
}

InnerTextInput.propTypes = propTypes;
InnerTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <InnerTextInput { ...props } forwardedRef={ref} />
));
