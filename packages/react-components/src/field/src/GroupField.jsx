import "./Field.css";

import { FieldContext } from "./FieldContext";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { useField } from "./useField";

const propTypes = {
    /**
     * A field id.
     */
    id: string,
    /**
     * Whether the field should display as "valid" or "invalid".
     */
    validationState: oneOf(["valid", "invalid"]),
    /**
     * Whether or not the field show a required state.
     */
    required: bool,
    /**
     * Whether or not the field take up the width of its container.
     */
    fluid: bool,
    /**
     * A field can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

const defaultProps = {
    as: "div"
};

export function InnerGroupField({
    id,
    validationState,
    required,
    fluid,
    size,
    disabled,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const {
        fieldProps,
        inputId,
        labelId,
        messageId
    } = useField({
        id,
        fluid,
        className,
        forwardedRef
    });

    return (
        <ElementType
            data-testid="field"
            {...rest}
            {...fieldProps}
        >
            <FieldContext.Provider
                value={{
                    isGroup: true,
                    inputId,
                    labelId,
                    messageId,
                    required,
                    disabled,
                    size,
                    fluid,
                    validationState
                }}
            >
                {children}
            </FieldContext.Provider>
        </ElementType>
    );
}

InnerGroupField.propTypes = propTypes;
InnerGroupField.defaultProps = defaultProps;

export const GroupField = forwardRef((props, ref) => (
    <InnerGroupField {...props} forwardedRef={ref} />
));
