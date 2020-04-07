import { Input } from "../../input";
import { bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

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
    type: oneOf(["text", "password", "email"])
};

const defaultProps = {
    ...INPUT_DEFAULT_PROPS,
    type: "text"
};

export function PureTextInput({ forwardedRef, ...props }) {
    return (
        <Input
            ref={forwardedRef}
            __componentName="@orbit-ui/react-components/text-input"
            {...props}
        />
    );
}

PureTextInput.propTypes = propTypes;
PureTextInput.defaultProps = defaultProps;

export const TextInput = forwardRef((props, ref) => (
    <PureTextInput { ...props } forwardedRef={ref} />
));
