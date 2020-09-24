import { Children, forwardRef } from "react";
import { Inline } from "../../layout";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, getSize, mergeProps, omitProps } from "../../shared";
import { useFormContext } from "..";

const GAP_BY_SIZE = {
    "sm": 3,
    "md": 4,
    "lg": 5
};

const propTypes = {
    /**
     * Fields size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Whether or not the fields take up the width of its container.
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

export function InnerRow(props) {
    const [formProps] = useFormContext();

    const {
        size,
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
            gap={GAP_BY_SIZE[getSize(size)]}
            align="start"
            ref={forwardedRef}
        >
            {Children.map(children, x => {
                return augmentElement(x, {
                    size,
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
