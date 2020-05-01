import { Checkbox } from "../../checkbox";
import { Ref } from "semantic-ui-react";
import { arrayOf, bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { isNil } from "lodash";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the toggle should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * The text associated to the toggle.
     */
    text: string,
    /**
     * A toggle can display icons.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * A label displayed after the toggle text.
     */
    label: oneOfType([element, object]),
    /**
     * An input can vary in sizes.
     */
    size: oneOf(SIZES)
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const CHECKBOX_DEFAULT_PROPS = {
    autofocus: false,
    size: DEFAULT_SIZE,
    __componentName: "@orbit-ui/react-components/checkbox"
};

const UNSUPPORTED_PROPS = ["defaultIndeterminate", "indeterminate", "slider", "radio", "type"];

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
                {...rest}
                toggle
                __componentName="@orbit-ui/react-components/toggle"
                __unsupportedProps={UNSUPPORTED_PROPS}
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
