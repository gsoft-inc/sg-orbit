import "./Tag.css";

import { Box } from "../../box";
import { ComponentProps, ElementType, ForwardedRef, ReactNode, SyntheticEvent, useMemo } from "react";
import { CrossButton, embedIconButton } from "../../button";
import { InteractionStatesProps, cssModule, forwardRef, mergeProps, normalizeSize, useMergedRefs, useSlots } from "../../shared";
import { Text } from "../../text";
import { embeddedIconSize } from "../../icons";
import { isNil } from "lodash";

export interface InnerTagProps extends InteractionStatesProps {
    /**
     * The tag style to use.
     */
    variant?: "solid" | "outline";
    /**
     * Called when the remove button is clicked.
     * @param {SyntheticEvent} event - React's original SyntheticEvent.
     * @returns {void}
     */
    onRemove?(event: SyntheticEvent): void;
    /**
     * Whether or not the tag is disabled.
     */
    disabled?: boolean;
    /**
     * Whether the tag take up the width of its container.
     */
    fluid?: boolean;
    /**
     * A tag can vary in size.
     */
    size?: "sm" | "md";
    /**
     * An HTML element type or a custom React element type to render as.
     */
    as?: ElementType;
    /**
     * @ignore
     */
    children: ReactNode;
    /**
     * @ignore
     */
    forwardedRef: ForwardedRef<any>;
}


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
}: InnerTagProps) {
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
            size,
            className: "o-ui-tag-text"
        },
        counter: {
            size,
            disabled,
            highlight: true,
            pushed: true,
            className: "o-ui-tag-counter"
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
                        counter && "has-counter",
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

export const Tag = forwardRef<InnerTagProps>((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

export type TagProps = ComponentProps<typeof Tag>

Tag.displayName = "Tag";

