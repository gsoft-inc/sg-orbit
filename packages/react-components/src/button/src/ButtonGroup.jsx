import { Children, forwardRef } from "react";
import { Inline } from "@react-components/layout";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, omitProps } from "../../shared";
import { useFormContext } from "../../form";

const propTypes = {
    /**
     * Buttons size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Whether or not the field take up the width of its container.
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

export function InnerButtonGroup(props) {
    const { isInForm, ...formProps } = useFormContext();

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
            gap={isInForm ? 4 : 2}
            align="center"
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

InnerButtonGroup.propTypes = propTypes;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
));
