import "./Tag.css";

import { SlotProvider, cssModule, getSizeClass3, mergeClasses, useHasChildren, useMergedRefs } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { buttonSlot } from "../../button";
import { counterSlot } from "../../counter";
import { dotSlot } from "../../dot/src";
import { forwardRef } from "react";
import { iconSlot } from "../../icons";
import { textSlot } from "../../text";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["solid", "outline"]),
    /**
     * Whether the tag take up the width of its container.
     */
    fluid: bool,
    /**
     * A tag can vary in size.
     */
    size: oneOf(["small", "medium", "large"]),
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

    const { hasIcon, hasButton } = useHasChildren({ hasIcon: ".o-ui-tag-icon", hasButton: ".o-ui-tag-button" }, ref);

    const content = typeof children === "string"
        ? <Text>{children}</Text>
        : children;

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tag",
                    variant,
                    hasIcon && "has-icon",
                    hasButton && "has-button",
                    fluid && "fluid",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass3(size)
                ),
                className
            )}
            disabled={disabled}
            ref={ref}
        >
            <SlotProvider
                slots={{
                    text: textSlot({
                        size,
                        className: "o-ui-tag-text"
                    }),
                    icon: iconSlot({
                        size,
                        className: "o-ui-tag-icon"
                    }),
                    dot: dotSlot({
                        size,
                        disabled,
                        className: "o-ui-tag-dot"
                    }),
                    counter: counterSlot({
                        size,
                        disabled,
                        highlight: true,
                        className: "o-ui-tag-counter"
                    }),
                    button: buttonSlot({
                        size,
                        variant: "ghost",
                        color: "secondary",
                        shape: "circular",
                        className: "o-ui-tag-button"
                    })
                }}
            >
                {content}
            </SlotProvider>
        </ElementType>
    );
}

InnerTag.propTypes = propTypes;

export const Tag = forwardRef((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

