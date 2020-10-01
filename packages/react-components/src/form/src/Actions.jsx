import { Children, forwardRef } from "react";
import { Inline } from "@react-components/layout";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps } from "../../shared";
import { useFormContext } from "./FormContext";

// TODO:
// - Should be moved out of form to ensure re-usability.

const propTypes = {
    /**
     * Horizontal alignment of the actions.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * Whether or not the actions take up the width of its container.
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

export function InnerActions(props) {
    const [formsProps] = useFormContext();

    const {
        align,
        fluid,
        size,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        formsProps
    );

    return (
        <Inline
            {...rest}
            justifyContent={align}
            /* Always true to support actions horizontal alignment */
            fluid
            gap={4}
            alignItems="center"
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return augmentElement(x, {
                    size,
                    fluid,
                    disabled
                });
            })}
        </Inline>
    );
}

InnerActions.propTypes = propTypes;

export const Actions = forwardRef((props, ref) => (
    <InnerActions {...props} forwardedRef={ref} />
));
