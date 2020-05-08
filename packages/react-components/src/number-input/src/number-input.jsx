import { INPUT_UNSUPPORTED_PROPS, Input } from "../../input";
import { bool, element, func, number, object, oneOf, oneOfType } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { throwWhenUnsupportedPropIsProvided } from "../../shared";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

const UNSUPPORTED_PROPS = [...INPUT_UNSUPPORTED_PROPS, "button", "iconsPosition", "type"];

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
    step: number,
    ...INPUT_PROP_TYPES
};

const defaultProps = {
    ...INPUT_DEFAULT_PROPS
};

export function PureNumberInput(props) {
    const { icon, loading, forwardedRef, ...rest } = props;

    throwWhenUnsupportedPropIsProvided(props, UNSUPPORTED_PROPS, "@orbit-ui/react-components/number-input");

    return (
        <Input
            {...rest}
            type="number"
            icon={icon}
            iconPosition={!isNil(icon) || !isNil(loading) ? "left" : undefined}
            loading={loading}
            ref={forwardedRef}
            __componentName="@orbit-ui/react-components/number-input"
        />
    );
}

PureNumberInput.propTypes = propTypes;
PureNumberInput.defaultProps = defaultProps;

export const NumberInput = forwardRef((props, ref) => (
    <PureNumberInput { ...props } forwardedRef={ref} />
));
