import "./Field.css";

import { ClearSlots, SlotProvider, cssModule, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";
import { ValidationContext } from "./ValidationContext";
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
     * An field can vary in size.
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

export function InnerField({
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
}) {
    const {
        fieldId,
        fieldProps,
        labelProps,
        inputProps,
        messageProps
    } = useField({
        id,
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
            <ValidationContext.Provider
                value={{
                    validationState
                }}
            >
                <ClearSlots>
                    <SlotProvider
                        slots={{
                            label: {
                                ...labelProps,
                                htmlFor: fieldId
                            },
                            input: inputProps,
                            message: messageProps
                        }}
                    >
                        {children}
                    </SlotProvider>
                </ClearSlots>
            </ValidationContext.Provider>
        </ElementType>
    );
}

InnerField.propTypes = propTypes;

export const Field = forwardRef((props, ref) => (
    <InnerField {...props} forwardedRef={ref} />
));
