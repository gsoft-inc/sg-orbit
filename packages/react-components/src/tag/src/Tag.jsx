import "./Tag.css";

import { SlotProvider, getSizeClass, getSizeClass3, mergeClasses } from "../../shared";
import { Text, embeddedTextSlot } from "../../text";
import { any, bool, elementType, oneOf, oneOfType, string } from "prop-types";
import { embeddedButtonSlot } from "../../button";
import { embeddedIconSlot } from "../../icons";
import { forwardRef } from "react";

// TODO:
//  - iconLeft & iconRight -> icon (always to the left)
//  - badge -> dot (left) & counter (right)

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

const defaultProps = {
    variant: "solid",
    as: "div"
};

export function InnerTag({
    variant,
    disabled,
    fluid,
    size,
    active,
    focus,
    hover,
    as: ElementType,
    className,
    children,
    forwardedRef,
    ...rest
}) {
    // const textMarkup = (
    //     <span className="text">{children}</span>
    // );

    // const iconMarkup = !isNil(icon) && (
    //     <EmbeddedIcon size={size}>{icon}</EmbeddedIcon>
    // );

    // const buttonMarkup = !isNil(button) && embedButton(button, {
    //     size,
    //     variant: "ghost",
    //     color: "secondary",
    //     shape: "circular"
    // });

    // const badgeLeftMarkup = !isNil(badgeLeft) && embedBadge(badgeLeft, {
    //     disabled,
    //     highlight: true,
    //     size
    // });

    // const badgeRightMarkup = !isNil(badgeRight) && embedBadge(badgeRight, {
    //     disabled,
    //     highlight: true,
    //     size
    // });

    // const content = (
    //     <>
    //         {iconMarkup}
    //         {textMarkup}
    //         {buttonMarkup}
    //     </>
    // );

    const content = typeof children === "string"
        ? <Text>{children}</Text>
        : children;

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui tag",
                variant,
                // buttonMarkup && "with-button",
                // iconMarkup && "with-left-icon",
                fluid && "fluid",
                active && "active",
                focus && "focus",
                hover && "hover",
                getSizeClass(size),
                className
            )}
            disabled={disabled}
            ref={forwardedRef}
        >
            <SlotProvider
                slots={{
                    text: embeddedTextSlot({
                        size,
                        className: "o-ui-tag-text"
                    }),
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
                        className: "o-ui-tag-counter"
                    },
                    button: embeddedButtonSlot({
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
InnerTag.defaultProps = defaultProps;

export const Tag = forwardRef((props, ref) => (
    <InnerTag {...props} forwardedRef={ref} />
));

