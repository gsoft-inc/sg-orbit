import { Checkbox } from "../../checkbox";
import { SemanticRef } from "../../shared";
import { arrayOf, bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

// Sizes constants are duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise it will not render properly in the docs.
const SIZES = ["small", "medium", "large"];
const DEFAULT_SIZE = "medium";

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
export const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the toggle should autofocus on render.
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
     * Whether or not the radio appear as focused.
     */
    focus: bool,
    /**
     * A toggle can vary in sizes.
     */
    size: oneOf(SIZES)
};

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
const CHECKBOX_DEFAULT_PROPS = {
    autofocus: false,
    focus: false,
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
