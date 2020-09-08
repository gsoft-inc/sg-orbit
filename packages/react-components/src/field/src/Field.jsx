import "./Field.css";

import { SlotProvider, cssModule, mergeClasses, useHasChildren, useId, useMergedRefs } from "../../shared";
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
     * Whether the field take up the width of its container.
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
                <SlotProvider
                    slots={{
                        label: {
                            htmlFor: fieldId,
                            size,
                            className: "o-ui-field-label"
                        },
                        description: {
                            size,
                            className: "o-ui-field-description"
                        },
                        input: {
                            id: fieldId,
                            size,
                            className: "o-ui-field-input"
                        },
                        message: {
                            size,
                            className: "o-ui-field-message"
                        }
                    }}
                >
                    {children}
                </SlotProvider>
            </ValidationContext.Provider>
        </ElementType>
    );
}

InnerField.propTypes = propTypes;

export const Field = forwardRef((props, ref) => (
    <InnerField {...props} forwardedRef={ref} />
));
