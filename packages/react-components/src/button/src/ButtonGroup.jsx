import { Children, forwardRef } from "react";
import { Group } from "../../group";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, getSize } from "../../shared";

const GAP = {
    "horizontal": {
        "sm": 3,
        "md": 4,
        "lg": 5
    },
    "vertical": {
        "sm": 2,
        "md": 3,
        "lg": 4
    }
};

const propTypes = {
    /**
     * The orientation of the group buttons.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The alignment of the group buttons.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * The group buttons size.
     */
    size: oneOf(["sm", "md", "lg"]),
    /**
     * Whether or not the group take up the width of its container.
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

function useFlexAlignment(orientation, align) {
    return {
        [orientation === "horizontal" ? "justify" : "align"]: align
    };
}

export function InnerButtonGroup(props) {
    const {
        orientation = "horizontal",
        align,
        size,
        fluid,
        disabled,
        children,
        forwardedRef,
        ...rest
    } = props;

    const alignProps = useFlexAlignment(orientation, align);

    return (
        <Group
            {...rest}
            {...alignProps}
            orientation={orientation}
            fluid={fluid}
            gap={GAP[orientation][getSize(size)]}
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
