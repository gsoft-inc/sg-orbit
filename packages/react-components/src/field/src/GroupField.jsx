import { ClearSlots, SlotProvider } from "../../shared";
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
     * Whether or not the field is required.
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

export function InnerGroupField({
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

    const labelId = `${fieldId}-label`;

    return (
        <ElementType
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
                                id: labelId,
                                as: "span"
                            },
                            input: {
                                ...inputProps,
                                "aria-labelledby": labelId
                            },
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

InnerGroupField.propTypes = propTypes;

export const GroupField = forwardRef((props, ref) => (
    <InnerGroupField {...props} forwardedRef={ref} />
));
