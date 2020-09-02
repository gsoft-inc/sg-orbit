import "./Badge.css";

import { Children, forwardRef } from "react";
import { SIZE, SlotProvider, createSizeAdapterSlotFactory, getSizeClass, mergeClasses } from "../../shared";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { textSlot } from "../../text";

const propTypes = {
    /**
     * Style to use.
     */
    variant: oneOf(["count", "dot", "icon"]),
    /**
     * The shape of the element being overlap by the badge.
     */
    overlap: oneOf(["circle", "icon"]),
    /**
     * A badge can vary in size.
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

const textSlotAdapter = createSizeAdapterSlotFactory({
    [SIZE.small]: SIZE.tiny,
    [SIZE.medium]: SIZE.small,
    [SIZE.large]: SIZE.medium
});

export function InnerBadge({
    variant = "count",
    overlap,
    size,
    as: ElementType = "span",
    className,
    children,
    forwardedRef,
    ...rest
}) {
    let [badgeContent, overlappedElement] = Children.toArray(children);

    if (variant === "dot") {
        overlappedElement = badgeContent;
        badgeContent = undefined;
    }

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                "o-ui-badge",
                className
            )}
            ref={forwardedRef}
        >
            <SlotProvider
                slots={{
                    text: textSlot(textSlotAdapter({
                        size
                    })),
                    icon: {
                        size
                    }
                }}
            >
                <div
                    className={mergeClasses(
                        "o-ui-badge__anchor",
                        `o-ui-badge__${variant}`,
                        overlap && `o-ui-badge__anchor--over-${overlap}`,
                        getSizeClass(size, "o-ui-badge--")
                    )}
                >
                    {badgeContent}
                </div>
            </SlotProvider>
            {overlappedElement}
        </ElementType>
    );
}

InnerBadge.propTypes = propTypes;

export const Badge = forwardRef((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));
