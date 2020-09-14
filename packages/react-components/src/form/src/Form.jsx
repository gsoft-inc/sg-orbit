import "./Form.css";

import { SlotProvider, mergeClasses } from "../../shared";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid: bool,
    /**
     * A form can vary in size.
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

export function InnerForm({
    fluid,
    size,
    as: ElementType = "form",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui-form",
                className
            )}
            ref={forwardedRef}
        >
            <SlotProvider
                slots={{
                    field: {
                        size,
                        fluid,
                        className: "o-ui-form-field"
                    }
                }}
            >
                {children}
            </SlotProvider>
        </ElementType>
    );
}

InnerForm.propTypes = propTypes;

export const Form = forwardRef((props, ref) => (
    <InnerForm {...props} forwardedRef={ref} />
));
