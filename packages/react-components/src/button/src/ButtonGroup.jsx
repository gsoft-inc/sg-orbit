import { Children, forwardRef } from "react";
import { Group } from "../../group";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { augmentElement, mergeProps, normalizeSize, slot } from "../../shared";

const propTypes = {
    /**
     * The orientation of the buttons.
     */
    orientation: oneOf(["horizontal", "vertical"]),
    /**
     * The horizontal alignment of the buttons.
     */
    align: oneOf(["start", "end", "center"]),
    /**
     * The buttons size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * Whether or not the buttons are disabled.
     */
    disabled: bool,
    /**
     * Whether or not the group take up the width of its container.
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

const Gap = {
    "horizontal": {
        "sm": 3,
        "md": 4
    },
    "vertical": {
        "sm": 2,
        "md": 3
    }
};

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

    return (
        <Group
            {...mergeProps(
                rest,
                {
                    orientation,
                    align,
                    verticalAlign: orientation === "horizontal" ? "center" : undefined,
                    fluid,
                    gap: Gap[orientation][normalizeSize(size)],
                    className: "o-ui-button-group",
                    ref: forwardedRef
                }
            )}
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

export const ButtonGroup = slot("button-group", forwardRef((props, ref) => (
    <InnerButtonGroup {...props} forwardedRef={ref} />
)));

ButtonGroup.displayName = "ButtonGroup";
