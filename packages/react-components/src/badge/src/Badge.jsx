import "./Badge.css";

import { Children, forwardRef } from "react";
import { ClearSlots, SlotProvider, createSizeAdapterSlotFactory, cssModule, getSizeClass, mergeClasses } from "../../shared";
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

const textSlotAdapter = createSizeAdapterSlotFactory({
    "sm": "xs",
    "md": "sm",
    "lg": "md"
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
                cssModule(
                    "o-ui-badge",
                    variant,
                    overlap && `over-${overlap}`,
                    getSizeClass(size)
                ),
                className
            )}
            ref={forwardedRef}
        >
            <ClearSlots>
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
                    <div className="o-ui-badge-anchor">
                        {badgeContent}
                    </div>
                </SlotProvider>
            </ClearSlots>
            {overlappedElement}
        </ElementType>
    );
}

InnerBadge.propTypes = propTypes;

export const Badge = forwardRef((props, ref) => (
    <InnerBadge {...props} forwardedRef={ref} />
));
