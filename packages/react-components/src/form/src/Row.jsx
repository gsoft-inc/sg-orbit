import { Inline } from "../../layout";
import { any, elementType, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { mergeProps } from "../../shared";
import { useFormContext } from "./FormContext";

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

export function InnerRow(props) {
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
            gap={4}
            align="start"
            ref={forwardedRef}
        >
            {children}
        </Inline>
    );
}

InnerRow.propTypes = propTypes;

export const Row = forwardRef((props, ref) => (
    <InnerRow {...props} forwardedRef={ref} />
));
