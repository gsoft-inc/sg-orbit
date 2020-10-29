import "./Label.css";

import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { createSizeAdapter, cssModule, mergeClasses, mergeProps, normalizeSize } from "../../shared";
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
    size: oneOf(["md", "lg"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const adaptSize = createSizeAdapter({
    "md": "sm",
    "lg": "md"
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
        className,
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
            {...rest}
            size={adaptSize(size)}
            className={mergeClasses(
                cssModule(
                    "o-ui-field-label",
                    normalizeSize(size)
                ),
                className
            )}
            as={as}
            ref={forwardedRef}
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
