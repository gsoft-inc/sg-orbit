import "./Field.css";

import { ClearSlots, SlotProvider, cssModule, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";
import { ValidationContext } from "./ValidationContext";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

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

export function InnerField({
    id,
    validationState,
    required,
    disabled,
    readOnly,
    fluid,
    size,
    as: ElementType = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const fieldId = useId(id, id ?? "o-ui-field");

    const { hasLabel, hasMessage } = useHasChildren({
        hasLabel: ".o-ui-field-label",
        hasMessage: ".o-ui-field-message"
    }, ref);

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-field",
                    hasLabel && "has-label",
                    hasMessage && "has-message",
                    fluid && "fluid"
                ),
                className
            )}
            role="group"
            ref={ref}
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
                                htmlFor: fieldId,
                                required,
                                size,
                                className: "o-ui-field-label"
                            },
                            input: {
                                id: fieldId,
                                required,
                                disabled,
                                readOnly,
                                fluid,
                                size,
                                className: "o-ui-field-input"
                            },
                            message: {
                                size,
                                fluid,
                                className: "o-ui-field-message"
                            }
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
