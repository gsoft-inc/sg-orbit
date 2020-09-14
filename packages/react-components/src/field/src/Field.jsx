import "./Field.css";

import { ClearToolbar, useToolbar } from "../../toolbar";
import { FieldContext } from "./FieldContext";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps, omitProps } from "../../shared";
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

export function InnerField(props) {
    const toolbarProps = useToolbar();

    const {
        id,
        validationState,
        required,
        fluid,
        size,
        disabled,
        as: ElementType = "div",
        className,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        toolbarProps
    );

    const { fieldProps, inputId, labelId, messageId } = useField({
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
            <ClearToolbar>
                <FieldContext.Provider
                    value={{
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
            </ClearToolbar>
        </ElementType>
    );
}

InnerField.propTypes = propTypes;

export const Field = forwardRef((props, ref) => (
    <InnerField {...props} forwardedRef={ref} />
));
