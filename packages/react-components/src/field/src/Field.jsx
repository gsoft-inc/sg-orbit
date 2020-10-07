import "./Field.css";

import { ClearToolbarContext, useToolbarContext } from "../../toolbar";
import { FieldContext } from "./FieldContext";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useField } from "./useField";
import { useFormField } from "../../form";

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

export function InnerField(props) {
    const [formProps] = useFormField();
    const [toolbarProps] = useToolbarContext();

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
        formProps,
        toolbarProps
    );

    const { fieldProps, fieldContext } = useField({
        id,
        validationState,
        required,
        fluid,
        size,
        disabled,
        className,
        forwardedRef
    });

    return (
        <ElementType
            data-testid="field"
            {...rest}
            {...fieldProps}
        >
            <ClearToolbarContext>
                <FieldContext.Provider value={fieldContext}>
                    {children}
                </FieldContext.Provider>
            </ClearToolbarContext>
        </ElementType>
    );
}

InnerField.propTypes = propTypes;

export const Field = forwardRef((props, ref) => (
    <InnerField {...props} forwardedRef={ref} />
));
