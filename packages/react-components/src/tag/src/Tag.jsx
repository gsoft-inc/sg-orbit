import "./Tag.css";

import { Box } from "../../box";
import { CrossButton, embedIconButton } from "../../button";
import { Text } from "../../text";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { cssModule, mergeProps, normalizeSize, useMergedRefs, useSlots } from "../../shared";
import { embeddedIconSize } from "../../icons";
import { forwardRef, useMemo } from "react";
import { isNil } from "lodash";

const propTypes = {
    /**
     * The tag style to use.
     */
    variant: oneOf(["solid", "outline"]),
    /**
     * Called when the remove button is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onRemove: func,
    /**
     * Whether the tag take up the width of its container.
     */
    fluid: bool,
    /**
     * A tag can vary in size.
     */
    size: oneOf(["sm", "md"]),
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as: oneOfType([string, elementType]),
    /**
     * @ignore
     */
    children: any.isRequired
};

export function InnerTag({
    variant = "solid",
    onRemove,
    disabled,
    fluid,
    size,
    active,
    focus,
    hover,
    as = "div",
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const { icon, dot, text, counter } = useSlots(children, useMemo(() => ({
        _: {
            defaultWrapper: Text
        },
        icon: {
            size: embeddedIconSize(size),
            className: "o-ui-tag-icon"
        },
        dot: {
            disabled,
            className: "o-ui-tag-dot"
        },
        text: {
            color: "inherit",
            size,
            className: "o-ui-tag-text"
        },
        counter: {
            color: "inherit",
            size,
            pushed: true,
            disabled
        }
    }), [size, disabled]));

    const removeMarkup = !isNil(onRemove) && embedIconButton(<CrossButton aria-label="Remove" />, {
        condensed: true,
        onClick: onRemove,
        size,
        className: "o-ui-tag-remove-button",
        "aria-label": "Remove"
    });

    return (
        <Box
            {...mergeProps(
                rest,
                {
                    className: cssModule(
                        "o-ui-tag",
                        variant,
                        icon && "has-icon",
                        removeMarkup && "has-remove-button",
                        fluid && "fluid",
                        active && "active",
                        focus && "focus",
                        hover && "hover",
                        normalizeSize(size)
                    ),
                    disabled,
                    as,
                    ref
                }
            )}
        >
            {icon}
            {dot}
            {text}
            {counter}
            {removeMarkup}
        </Box>
    );
}

InnerTag.propTypes = propTypes;

export const Tag = forwardRef((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

Tag.displayName = "Tag";

