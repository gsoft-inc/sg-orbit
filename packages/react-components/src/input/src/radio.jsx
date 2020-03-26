import { Checkbox } from "../../input";
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
     * Whether or not the radio should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * The text associated to the radio.
     */
    text: string,
    /**
     * A checkbox can display icons.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * A label displayed after the radio text.
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
    unsupportedPropsComponentName: "@orbit-ui/react-components/checkbox"
};

const UNSUPPORTED_PROPS = ["as", "defaultIndeterminate", "indeterminate", "slider", "toggle", "type"];

export function PureRadio(props) {
    const { forwardedRef, ...rest } = props;

    const renderWithRef = () => {
        return (
            <Ref innerRef={forwardedRef}>
                {renderRadio()}
            </Ref>
        );
    };

    const renderRadio = () => {
        return (
            <Checkbox
                radio
                unsupportedProps={UNSUPPORTED_PROPS}
                unsupportedPropsComponentName="@orbit-ui/react-components/radio"
                {...rest}
            />
        );
    };

    return isNil(forwardedRef) ? renderRadio() : renderWithRef();
}

PureRadio.propTypes = CHECKBOX_PROP_TYPES;
PureRadio.defaultProps = CHECKBOX_DEFAULT_PROPS;

export const Radio = forwardRef((props, ref) => (
    <PureRadio { ...props } forwardedRef={ref} />
));

