import "./Label.css";

import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { createSizeAdapter, cssModule, mergeProps, normalizeSize } from "../../shared";
import { forwardRef } from "react";
import { useFieldLabelProps } from "./FieldContext";

const propTypes = {
    /**
     * Whether or not the label show a required state.
     */
    required: bool,
    /**
     * A label can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

const adaptSize = createSizeAdapter({
    "sm": "xs",
    "md": "sm"
});

function RequiredIndicator() {
    return (
        <span className="o-ui-field-label-required" focusable="false" aria-hidden="true">*</span>
    );
}

export function InnerLabel(props) {
    const [fieldProps] = useFieldLabelProps(props);

    const {
        required,
        size,
        as = "label",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        fieldProps
    );

    return (
        <Text
            {...mergeProps(
                rest,
                {
                    size: adaptSize(size),
                    className: cssModule(
                        "o-ui-field-label",
                        normalizeSize(size)
                    ),
                    as,
                    ref: forwardedRef
                }
            )}
        >
            {children}
            {required && <RequiredIndicator />}
        </Text>
    );
}

InnerLabel.propTypes = propTypes;

export const Label = forwardRef((props, ref) => (
    <InnerLabel {...props} forwardedRef={ref} />
));

Label.displayName = "Label";
