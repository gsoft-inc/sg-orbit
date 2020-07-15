import { Checkbox } from "../../checkbox";
import { SemanticRef } from "../../shared";
import { arrayOf, bool, element, number, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const UNSUPPORTED_PROPS = ["defaultIndeterminate", "indeterminate", "slider", "radio", "type"];

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
export const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the switch should autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * The label associated to the switch.
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
     * A switch can vary in size.
     */
    size: oneOf(["small", "medium", "large"])
};

export function InnerSwitch(props) {
    const { forwardedRef, ...rest } = props;

    return (
        <SemanticRef innerRef={forwardedRef}>
            <Checkbox
                {...rest}
                toggle
                __componentName="@orbit-ui/react-components/Switch"
                __unsupportedProps={UNSUPPORTED_PROPS}
            />
        </SemanticRef>
    );
}

InnerSwitch.propTypes = CHECKBOX_PROP_TYPES;

export const Switch = forwardRef((props, ref) => (
    <InnerSwitch { ...props } forwardedRef={ref} />
));

// For backward compatibility.
export const Toggle = Switch;
