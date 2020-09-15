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

export function InnerButtonGroup(props) {
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
            ref={forwardedRef}
        >
            {children}
        </Inline>
    );
}

InnerButtonGroup.propTypes = propTypes;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
));
