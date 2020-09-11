import "./Label.css";

import { SIZE, mergeClasses, useSlotProps } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the label show a required state.
     */
    required: bool,
    /**
     * A label can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * Default slot override.
     */
    slot: string,
    /**
     * @ignore
     */
    children: any.isRequired
};

const ADAPTED_SIZE = {
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
};

function RequiredIndicator() {
    return (
        <span className="o-ui-field-label-required" aria-hidden="true">*</span>
    );
}

export function InnerLabel(props) {
    const {
        htmlFor,
        required,
        size,
        as = "label",
        className,
        fieldId,
        children,
        forwardedRef,
        ...rest
    } = useSlotProps(props, "label");

    return (
        <Text
            data-testid="field-label"
            {...rest}
            htmlFor={htmlFor ?? fieldId}
            size={ADAPTED_SIZE[size ?? SIZE.medium]}
            className={mergeClasses(
                "o-ui-field-label",
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
