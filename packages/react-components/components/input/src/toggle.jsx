import { Checkbox } from "@orbit-ui/react-input";
import { Ref } from "semantic-ui-react";
import { arrayOf, bool, element, func, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const CHECKBOX_PROP_TYPES = {
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
     * A React component displayed after the checkbox text.
     */
    icon: element,
    /**
     * A label displayed after the checkbox text.
     */
    label: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES),
    /**
     * @ignore
     */
    disabled: bool,
    /**
     * @ignore
     */
    className: string,
    /**
     * @ignore
     */
    forwardedRef: oneOfType([object, func]),
    /**
     * @ignore
     */
    unsupportedProps: arrayOf(string),
    /**
     * @ignore
     */
    unsupportedPropsComponentName: string
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the preset will not render properly in the docs.
const CHECKBOX_DEFAULT_PROPS = {
    autofocus: false,
    size: DEFAULT_SIZE,
    disabled: false,
    unsupportedPropsComponentName: "@orbit-ui/react-input/checkbox"
};

const UNSUPPORTED_PROPS = ["as", "defaultIndeterminate", "indeterminate", "slider", "radio", "type"];

export function PureToggle(props) {
    const { forwardedRef, ...rest } = props;

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderToggle()}
            </Ref>
        );
    };

    const renderToggle = () => {
        return (
            <Checkbox
                toggle
                unsupportedProps={UNSUPPORTED_PROPS}
                unsupportedPropsComponentName="@orbit-ui/react-input/toggle"
                {...rest}
            />
        );
    };

    return isNil(forwardedRef) ? renderToggle() : renderWithRef();
}

PureToggle.propTypes = CHECKBOX_PROP_TYPES;
PureToggle.defaultProps = CHECKBOX_DEFAULT_PROPS;

export const Toggle = forwardRef((props, ref) => (
    <PureToggle { ...props } forwardedRef={ref} />
));
