import { INPUT_UNSUPPORTED_PROPS, Input } from "../../input";
import { bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

const UNSUPPORTED_PROPS = [...INPUT_UNSUPPORTED_PROPS, "type"];

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
     * [Icon](/?path=/docs/components-icon--default-story) component rendered before or after the value.
     */
    icon: element,
    /**
     * An icon can appear on the left or right side of the value.
     */
    iconPosition: oneOf(["left", "right"]),
    /**
     * [Button](/?path=/docs/components-button--default-story) component rendered after the value.
     */
    button: element,
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
    value: number,
    /**
     * The default value of the input.
     */
    defaultValue: number,
    /**
     * The minimum value of the input.
     */
    min: number,
    /**
     * The maximum value of the input.
     */
    max: number,
    /**
     * The increment step of the input value.
     */
    step: number
};

const defaultProps = {
    ...INPUT_DEFAULT_PROPS
};

export function InnerNumberInput(props) {
    const { forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/NumberInput");

    return (
        <Input
            {...rest}
            type="number"
            ref={forwardedRef}
            __componentName="@orbit-ui/react-components/NumberInput"
        />
    );
}

InnerNumberInput.propTypes = propTypes;
InnerNumberInput.defaultProps = defaultProps;

export const NumberInput = forwardRef((props, ref) => (
    <InnerNumberInput { ...props } forwardedRef={ref} />
));
