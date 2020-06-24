import { Checkbox } from "../../checkbox";
import { SemanticRef } from "../../shared";
import { arrayOf, bool, element, number, object, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const UNSUPPORTED_PROPS = ["defaultIndeterminate", "indeterminate", "slider", "toggle", "type"];

// Duplicated here until https://github.com/reactjs/react-docgen/pull/352 is merged. Otherwise the props will not render properly in the docs.
export const CHECKBOX_PROP_TYPES = {
    /**
     * Whether or not the radio should be autofocus on render.
     */
    autofocus: bool,
    /**
     * Delay before trying to autofocus.
     */
    autofocusDelay: number,
    /**
     * The label associated to the radio.
     */
    label: string,
    /**
     * [Icons](/?path=/docs/components-icon--default-story) rendered after the text.
     */
    icons: oneOfType([element, arrayOf(element)]),
    /**
     * [Badge](/?path=/docs/components-badge--default-story) rendered after the text.
     */
    badge: oneOfType([element, object]),
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

