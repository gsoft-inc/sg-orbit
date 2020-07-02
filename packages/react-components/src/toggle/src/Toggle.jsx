import { Checkbox } from "../../checkbox";
import { SemanticRef } from "../../shared";
import { arrayOf, bool, element, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const UNSUPPORTED_PROPS = ["defaultIndeterminate", "indeterminate", "slider", "radio", "type"];

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
     * The label associated to the toggle.
     */
    label: string,
    /**
     * [Icons](/?path=/docs/components-icon--default-story) rendered after the text.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * [Badge](/?path=/docs/components-badge--default-story) rendered after the text.
     */
    badge: element,
    /**
     * A toggle can vary in sizes.
     */
    size: oneOf(["small", "medium", "large"])
};

export function InnerToggle(props) {
    const { forwardedRef, ...rest } = props;

    return (
        <SemanticRef innerRef={forwardedRef}>
            <Checkbox
                {...rest}
                toggle
                __componentName="@orbit-ui/react-components/Toggle"
                __unsupportedProps={UNSUPPORTED_PROPS}
            />
        </SemanticRef>
    );
}

InnerToggle.propTypes = CHECKBOX_PROP_TYPES;

export const Toggle = forwardRef((props, ref) => (
    <InnerToggle { ...props } forwardedRef={ref} />
));
