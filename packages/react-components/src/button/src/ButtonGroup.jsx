import { Children, forwardRef } from "react";
import { Group } from "../../group";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps } from "../../shared";
import { useFormContext } from "../../form";

const propTypes = {
    /**
     * Orientation of the children.
     */
    orientation: oneOf(["horizontal", "vertical"]),
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
        disabled,
        children,
        forwardedRef,
        ...rest
    } = mergeProps(
        props,
        formProps
    );

    return (
        <Group
            {...rest}
            fluid={fluid}
            gap={isInForm ? 4 : 2}
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
        </Group>
    );
}

InnerButtonGroup.propTypes = propTypes;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
));
