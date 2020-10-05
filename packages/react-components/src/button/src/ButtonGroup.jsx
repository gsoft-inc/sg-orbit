import { Children, forwardRef } from "react";
import { Flex } from "../../layout";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, getSize } from "../../shared";

const DIRECTION = {
    "horizontal": "row",
    "vertical": "column"
};

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
     * Orientation of the children.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The alignment of the buttons within the group.
     */
    align: oneOf(["start", "end", "center"]),
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

function useFlexAlignment({ orientation, align }) {
    return {
        [orientation === "horizontal" ? "justifyContent" : "alignItems"]: align
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

    const alignProps = useFlexAlignment({
        orientation,
        align
    });

    return (
        <Flex
            {...rest}
            {...alignProps}
            direction={DIRECTION[orientation]}
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
        </Flex>
    );
}

InnerButtonGroup.propTypes = propTypes;

export const ButtonGroup = forwardRef((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
));
