import { Children, forwardRef } from "react";
import { Inline } from "../../layout";
import { any, bool, elementType, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, omitProps } from "../../shared";
import { useFormContext } from "..";

const propTypes = {
    /**
     * Whether or not the fields take up the width of its container.
     */
    fluid: bool,
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * React children.
     */
    children: any.isRequired
};

export function InnerRow(props) {
    const [formProps] = useFormContext();

    const {
        fluid,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        omitProps(formProps, ["disabled"])
    );

    return (
        <Inline
            {...rest}
            fluid={fluid}
            gap={4}
            align="start"
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return augmentElement(x, {
                    fluid
                });
            })}
        </Inline>
    );
}

InnerRow.propTypes = propTypes;

export const Row = forwardRef((props, ref) => (
    <InnerRow {...props} forwardedRef={ref} />
));
