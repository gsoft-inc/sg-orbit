import "./Form.css";

import { Box } from "../../box";
import { FormContext } from "./FormContext";
import { any, bool, elementType, oneOfType, string } from "prop-types";
import { cssModule, mergeClasses } from "../../shared";
import { forwardRef } from "react";

const propTypes = {
    /**
     * Whether or not the form take up the width of its container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerForm(props) {
    const {
        fluid,
        disabled,
        as = "form",
        className,
        children,
        forwardedRef,
        ...rest
    } = props;

    return (
        <Box
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-form",
                    fluid && "fluid"
                ),
                className
            )}
            as={as}
            ref={forwardedRef}
        >
            <FormContext.Provider
                value={{
                    fluid,
                    disabled
                }}
            >
                {children}
            </FormContext.Provider>
        </Box>
    );
}

InnerForm.propTypes = propTypes;

export const Form = forwardRef((props, ref) => (
    <InnerForm {...props} forwardedRef={ref} />
));
