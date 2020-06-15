import { Checkbox } from "../../checkbox";
import { SemanticRef } from "../../shared";
import { arrayOf, bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const UNSUPPORTED_PROPS = ["defaultIndeterminate", "indeterminate", "slider", "toggle", "type"];

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
export const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the radio should autofocus on render.
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
     * A radio can vary in sizes.
     */
    size: oneOf(["small", "medium", "large"])
};

export function InnerRadio(props) {
    const { forwardedRef, ...rest } = props;

    return (
        <SemanticRef innerRef={forwardedRef}>
            <Checkbox
                {...rest}
                radio
                __componentName="@orbit-ui/react-components/Radio"
                __unsupportedProps={UNSUPPORTED_PROPS}
            />
        </SemanticRef>
    );
}

InnerRadio.propTypes = CHECKBOX_PROP_TYPES;

export const Radio = forwardRef((props, ref) => (
    <InnerRadio { ...props } forwardedRef={ref} />
));

