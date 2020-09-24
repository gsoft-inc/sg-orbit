import "./Lozenge.css";

import { ClearSlots, SlotProvider, createSizeAdapterSlotFactory, cssModule, getSizeClass, mergeClasses, useHasChild, useMergedRefs, useTextContent } from "../../shared";
import { Text, textSlot } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { iconSlot } from "../../icons";

const propTypes = {
    /**
     * A lozenge can vary in size.
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

export function InnerLozenge({
    size,
    className,
    as: ElementType = "span",
    children,
    forwardedRef,
    ...rest
}) {
    const ref = useMergedRefs(forwardedRef);

    const hasIcon = useHasChild(".o-ui-lozenge-icon", ref);

    const content = useTextContent(Text, children);

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-lozenge",
                    hasIcon && "has-icon",
                    getSizeClass(size)
                ),
                className
            )}
            ref={ref}
        >
            <ClearSlots>
                <SlotProvider
                    slots={{
                        text: textSlot(textSlotAdapter({
                            size,
                            className: "o-ui-lozenge-text"
                        })),
                        icon: iconSlot({
                            size,
                            className: "o-ui-lozenge-icon"
                        })
                    }}
                >
                    {content}
                </SlotProvider>
            </ClearSlots>
        </ElementType>
    );
}

InnerLozenge.propTypes = propTypes;

export const Lozenge = forwardRef((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
));
