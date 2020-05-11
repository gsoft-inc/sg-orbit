import { Checkbox } from "../../checkbox";
import { SemanticRef } from "../../shared";
import { arrayOf, bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

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
    size: DEFAULT_SIZE
};

const UNSUPPORTED_PROPS = ["defaultIndeterminate", "indeterminate", "slider", "radio", "type"];

export function InnerToggle(props) {
    const { forwardedRef, ...rest } = props;

    return (
        <SemanticRef innerRef={forwardedRef}>
            <Checkbox
                {...rest}
                toggle
                __componentName="@orbit-ui/react-components/toggle"
                __unsupportedProps={UNSUPPORTED_PROPS}
            />
        </SemanticRef>
    );
}

InnerToggle.propTypes = CHECKBOX_PROP_TYPES;
InnerToggle.defaultProps = CHECKBOX_DEFAULT_PROPS;

export const Toggle = forwardRef((props, ref) => (
    <InnerToggle { ...props } forwardedRef={ref} />
));
