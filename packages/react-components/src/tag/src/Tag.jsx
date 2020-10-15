import "./Tag.css";

import { CrossButton, embedIconButton } from "../../button";
import { SlotProvider, Wrap, cssModule, mergeClasses, normalizeSize, useHasChildren, useMergedRefs } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, func, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconSize } from "../../icons";
import { forwardRef } from "react";
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
    size: oneOf(["sm", "md", "lg"]),
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
    as: ElementType = "div",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const { hasIcon, hasCounter } = useHasChildren({
        hasIcon: ".o-ui-tag-icon",
        hasCounter: ".o-ui-tag-counter"
    }, ref);

    const removeMarkup = !isNil(onRemove) && embedIconButton(<CrossButton aria-label="Remove" />, {
        condensed: true,
        onClick: onRemove,
        size,
        className: "o-ui-tag-remove-button",
        "aria-label": "Remove"
    });

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tag",
                    variant,
                    hasIcon && "has-icon",
                    hasCounter && "has-counter",
                    removeMarkup && "has-remove-button",
                    fluid && "fluid",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    normalizeSize(size)
                ),
                className
            )}
            disabled={disabled}
            ref={ref}
        >
            <SlotProvider
                value={{
                    text: {
                        size,
                        className: "o-ui-tag-text"
                    },
                    icon: {
                        size: embeddedIconSize(size),
                        className: "o-ui-tag-icon"
                    },
                    dot: {
                        size,
                        disabled,
                        className: "o-ui-tag-dot"
                    },
                    counter: {
                        size,
                        disabled,
                        highlight: true,
                        className: "o-ui-tag-counter"
                    }
                }}
            >
                <Wrap as={Text}>
                    {children}
                </Wrap>
            </SlotProvider>
            {removeMarkup}
        </ElementType>
    );
}

InnerTag.propTypes = propTypes;

export const Tag = forwardRef((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

