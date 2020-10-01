import "./Tag.css";

import { ClearSlots, SlotProvider, cssModule, getSizeClass, mergeClasses, useHasChildren, useMergedRefs, useTextContent } from "../../shared";
import { Text } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedIconButtonSlot } from "../../button";
import { embeddedIconSlot } from "../../icons";
import { forwardRef } from "react";

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

    const { hasIcon, hasCounter, hasButton } = useHasChildren({
        hasIcon: ".o-ui-tag-icon",
        hasCounter: ".o-ui-tag-counter",
        hasButton: ".o-ui-tag-button"
    }, ref);

    const content = useTextContent(Text, children);

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-tag",
                    variant,
                    hasIcon && "has-icon",
                    hasCounter && "has-counter",
                    hasButton && "has-button",
                    fluid && "fluid",
                    active && "active",
                    focus && "focus",
                    hover && "hover",
                    getSizeClass(size)
                ),
                className
            )}
            disabled={disabled}
            ref={ref}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: {
                            size,
                            className: "o-ui-tag-text"
                        },
                        icon: embeddedIconSlot({
                            size,
                            className: "o-ui-tag-icon"
                        }),
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
                        },
                        button: embeddedIconButtonSlot({
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
            </ClearSlots>
        </ElementType>
    );
}

InnerTag.propTypes = propTypes;
export const Tag = forwardRef((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

