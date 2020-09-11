import "./Form.css";

import { SlotProvider, mergeClasses } from "../../shared";
import { bool, oneOf } from "prop-types";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid: bool,
    /**
     * A form can vary in size.
     */
    size: oneOf(["small", "medium", "large"])
};

export function InnerForm({
    fluid,
    size,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    return (
        <form
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
        </form>
    );
}

InnerForm.propTypes = propTypes;

export const Form = forwardRef((props, ref) => (
    <InnerForm {...props} forwardedRef={ref} />
));
