import "./Lozenge.css";

import { SIZE, SlotProvider, createSizeAdapterSlotFactory, cssModule, getSizeClass3, mergeClasses, useHasChild, useMergedRefs } from "../../shared";
import { Text, textSlot } from "../../text";
import { any, elementType, oneOf, oneOfType, string } from "prop-types";
import { forwardRef } from "react";
import { iconSlot } from "../../icons";

const propTypes = {
    /**
     * A lozenge can vary in size.
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

    const content = typeof children === "string"
        ? <Text>{children}</Text>
        : children;

    return (
        <ElementType
            {...rest}
            className={mergeClasses(
                cssModule(
                    "o-ui-lozenge",
                    hasIcon && "has-icon",
                    getSizeClass3(size)
                ),
                className
            )}
            ref={ref}
        >
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
        </ElementType>
    );
}

InnerLozenge.propTypes = propTypes;

export const Lozenge = forwardRef((props, ref) => (
    <InnerLozenge {...props} forwardedRef={ref} />
));
