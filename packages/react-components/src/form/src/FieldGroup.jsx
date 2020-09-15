import { Inline } from "../../layout";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useFormContext } from "./FormContext";

// TODO:
// - Move to /field

const propTypes = {
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerFieldGroup(props) {
    const { fluid } = useFormContext();

    const {
        children,
        forwardedRef,
        ...rest
    } = mergeProps(props, {
        fluid
    });

    return (
        <Inline
            {...rest}
            gap={5}
            align="start"
            ref={forwardedRef}
        >
            {children}
        </Inline>
    );
}

InnerFieldGroup.propTypes = propTypes;

export const FieldGroup = forwardRef((props, ref) => (
    <InnerFieldGroup {...props} forwardedRef={ref} />
));
