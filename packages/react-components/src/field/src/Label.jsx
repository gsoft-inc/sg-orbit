import "./Label.css";

import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { cssModule, getSize, getSizeClass, mergeClasses, mergeProps } from "../../shared";
import { forwardRef } from "react";
import { isNil } from "lodash";
import { useFieldContext } from "./FieldContext";

export function useFieldLabel({ as: asProp }) {
    const [{ isGroupField, inputId, labelId, required, size }, isInField] = useFieldContext();

    const as = isNil(asProp)
        ? isGroupField ? "span" : "label"
        : asProp;

    const props = isInField && {
        id: labelId,
        required,
        size,
        htmlFor: as === "label" ? inputId : undefined,
        className: cssModule("o-ui-field-label", getSizeClass(size)),
        as
    };

    return [props || {}, isInField];
}

const propTypes = {
    /**
     * Whether or not the label show a required state.
     */
    required: bool,
    /**
     * A label can vary in size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const ADAPTED_SIZE = {
    "sm": "xs",
    "md": "sm",
    "lg": "md"
};

function RequiredIndicator() {
    return (
        <span className="o-ui-field-label-required" focusable="false" aria-hidden="true">*</span>
    );
}

export function InnerLabel(props) {
    const [fieldProps] = useFieldLabel(props);

    const {
        required,
        size,
        className,
        as = "label",
        children,
        forwardedRef,
        ...rest
    } = mergeProps(props, fieldProps);

    return (
        <Text
            data-testid="field-label"
            {...rest}
            size={ADAPTED_SIZE[getSize(size)]}
            className={mergeClasses(
                cssModule(
                    "o-ui-field-label",
                    getSizeClass(size)
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
